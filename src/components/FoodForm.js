import { useState } from "react";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import './FoodForm.css';

const INITIAL_VALUES = {  //하나의 state로 관리
  //각 input의 필드 값
  title: '',
  calorie: 0,
  content: '',
  imgFile: null,
};

function FoodForm({
  initialValues = INITIAL_VALUES, //각 input 초기값
  initialPreview,   //이미지 미리보기 초기값
  onSubmit,  //글 작성 & 수정
  onSubmitSuccess,  //submit 성공 & 글 수정 성공
  onCancel,  //수정중인 글 취소
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const t = useTranslate(); //다국어 번역 함수(커스텀 훅) 가져오기

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,  //name으로 프로퍼티 명을 지정, value로 해당하는 값을 지정
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => { //onSubmit
    e.preventDefault();   //HTML 폼의 기본 동작을 막음
    const formData = new FormData();  //새 formData 인스턴스 생성
    //각 필드 값 지정
    formData.append('title', values.title);
    formData.append('calorie', values.calorie);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);  //리퀘스트가 끝나면 폼 초기화
  }

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            name="title"
            value={values.title}
            placeholder={t('title placeholder')}
            onChange={handleInputChange}
          ></input>
          <input
            className="FoodForm-calorie"
            type="number"
            name="calorie"
            value={values.calorie}
            placeholder={t('calorie placeholder')}
            onChange={handleInputChange}
          ></input>
          {onCancel && (
            <button
              className="FoodForm-cancel-button"
              type="button"
              onClick={onCancel}
            >
              {t('cancel button')}
            </button>
          )}
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {t('confirm button')}
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          name="content"
          value={values.content}
          placeholder={t('content placeholder')}
          onChange={handleInputChange}
        ></textarea>
        {submittingError?.message && <div>{submittingError.message}</div>}
      </div>
    </form>
  );
}

export default FoodForm;