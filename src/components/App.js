import { useState } from 'react';
import items from '../mock.json';
import FoodList from './FoodList';

function App() {
  const [order, setOrder] = useState('createdAt');  //아이템 정렬 state
  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleCalorieClick = () => setOrder('calorie');   //칼로리순

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} />
    </div>
  );
}

export default App;
