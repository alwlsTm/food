import { useState } from "react";
import { createFood } from "../api";
import FileInput from "./FileInput";
import './FoodForm.css';

const INITIAL_VALUES = {  //하나의 state로 관리
  //각 input의 필드 값
  title: '',
  calorie: 0,
  content: '',
  imgFile: null,
};

function FoodForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);      //submit 로딩 state
  const [submittingError, setSubmittingError] = useState(null); //submit 에러 state

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

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);  //submit중..
      result = await createFood(formData); //데이터 생성 리퀘스트
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false); //submit 완료!
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);  //리퀘스트가 끝나면 폼 초기화
  }

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange}></input>
      <input type="number" name="calorie" value={values.calorie} onChange={handleInputChange}></input>
      <input name="content" value={values.content} onChange={handleInputChange}></input>
      <button type="submit" disabled={isSubmitting}>확인</button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;