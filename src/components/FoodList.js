import './FoodList.css';

//음식 리스트 아이템
function FoodListItem({ item }) {
  return (
    <div>
      <img src={item.imgUrl} alt={item.title}></img>
      <p>{item.title}</p>
      <p>{item.calorie}</p>
      <p>{item.content}</p>
    </div>
  );
}

//음식 리스트
function FoodList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li>
            <FoodListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;