import './FoodList.css';

//음식 리스트 아이템
function FoodListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className='FoodListItem'>
      <img src={item.imgUrl} alt={item.title}></img>
      <p>{item.title}</p>
      <p>{item.calorie}</p>
      <p>{item.content}</p>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

//음식 리스트
function FoodList({ items, onDelete }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;