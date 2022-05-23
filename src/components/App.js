import { useEffect, useState } from 'react';
import { getFoods } from '../api';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

function App() {
  const [order, setOrder] = useState('createdAt');    //아이템 정렬 state
  const [items, setItems] = useState([]);             //아이템 state
  const [cursor, setCursor] = useState(null);         //cursor(페이지네이션)값을 저장할 state
  const [isLoading, setIsLoading] = useState(false);  //로딩 state
  const [loadingError, setLoadingError] = useState(null); //로딩 에러 state

  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleCalorieClick = () => setOrder('calorie');   //칼로리순

  const handleDelete = (id) => {  //아이템 삭제
    const nextItem = items.filter((item) => item.id !== id);  //아이템의 id를 이용해 필터링
    setItems(nextItem);
  }

  const handleLoad = async (options) => {  //음식 아이템 로드
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);   //로딩중
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);  //로딩 완료
    }

    const { foods,
      paging: { nextCursor },
    } = result;

    //cursor(커서) 페이지네이션
    if (!options.cursor) {  //cursor 값이 없다면 == 더보기로 불러온 데이터가 없으면
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);  //이전 state의 값을 받아서 변경할 state 값을 리턴
    }
    setCursor(nextCursor);  //paging.nextCursor
  };

  useEffect(() => {
    handleLoad({
      order,
    });
  }, [order]);

  const handleLoadMore = () => {  //더보기(다음 페이지 불러오기)
    handleLoad({
      order,
      cursor,
    });
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodForm />
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
