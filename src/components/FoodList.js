import { useState } from 'react';
import useTranslate from '../hooks/useTranslate';
import FoodForm from './FoodForm';
import './FoodList.css';

//음식 리스트 아이템
function FoodListItem({ item, onDelete, onEdit }) {
  const t = useTranslate(); //다국어 번역 함수(커스텀 훅) 가져오기

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => onEdit(item.id);

  return (
    <div className='FoodListItem'>
      <img src={item.imgUrl} alt={item.title}></img>
      <p>{item.title}</p>
      <p>{item.calorie}</p>
      <p>{item.content}</p>
      <button onClick={handleEditClick}>{t('edit button')}</button>
      <button onClick={handleDeleteClick}>{t('delete button')}</button>
    </div>
  );
}

//음식 리스트
function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null); //수정 중인 글의 id state

  const handleCancel = () => setEditingId(null);  //글 수정의 취소

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {  //item.id 가 editingId일 경우 ReviewForm을 렌더링
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);  //글 수정 

          const handleSubmitSuccess = (newItem) => { //글 수정 완료
            onUpdateSuccess(newItem);
            setEditingId(null); //입력폼 닫기
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues} //수정중인 글의 기본값
                initialPreview={imgUrl} //수정중인 글의 이미지 미리보기
                onSubmit={handleSubmit} //글 수정
                onSubmitSuccess={handleSubmitSuccess} //글 수정 완료
                onCancel={handleCancel} //글 수정 취소
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;