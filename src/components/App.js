import { useEffect, useState } from 'react';
import { createFood, deleteFood, getFoods, updateFood } from '../api';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

//글 불러오기 & 작성 & 수정
function App() {
  const [items, setItems] = useState([]);             //아이템 state
  const [order, setOrder] = useState('createdAt');    //아이템 정렬 state
  const [cursor, setCursor] = useState(null);         //cursor(페이지네이션)값을 저장할 state
  const [isLoading, setIsLoading] = useState(false);  //로딩 state
  const [loadingError, setLoadingError] = useState(null); //로딩 에러 state

  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleCalorieClick = () => setOrder('calorie');   //칼로리순

  const handleDelete = async (id) => {  //아이템 삭제
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));  //아이템의 id를 이용해 필터링
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

  const handleLoadMore = () => {  //더보기(다음 페이지 불러오기)
    handleLoad({
      order,
      cursor,
    });
  };

  //새로 작성한 글을 받아서 items에 바로 적용
  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  }

  //글 수정 후 리스폰스로 받은 데이터 반영
  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);  //수정할 item index 찾기
      return [
        ...prevItems.splice(0, splitIdx),  //앞 요소
        newItem, //수정한 리뷰
        ...prevItems.splice(splitIdx + 1), //뒷 요소
      ];
    });
  };

  useEffect(() => {
    handleLoad({
      order,
    });
  }, [order]);


  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
      <FoodList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateFood}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {cursor && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
