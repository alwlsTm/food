import { useEffect, useState } from 'react';
import mockItems from '../mock.json';
import FoodList from './FoodList';
import { getFoods } from '../api';

function App() {
  const [order, setOrder] = useState('createdAt');  //아이템 정렬 state
  const [items, setItems] = useState(mockItems);  //아이템 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleCalorieClick = () => setOrder('calorie');   //칼로리순

  const handleDelete = (id) => {  //아이템 삭제
    const nextItem = items.filter((item) => item.id !== id);  //아이템의 id를 이용해 필터링
    setItems(nextItem);
  }

  const handleLoad = async (orderQuery) => {  //음식 아이템 로드
    const { foods } = await getFoods(orderQuery);
    setItems(foods);
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
