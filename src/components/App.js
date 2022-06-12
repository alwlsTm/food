import { useCallback, useEffect, useState } from 'react';
import { createFood, deleteFood, getFoods, updateFood } from '../api';
import FoodList from './FoodList';
import FoodForm from './FoodForm';
import useAsync from '../hooks/useAsync';
import LocaleSelect from './LocaleSelect';
import useTranslate from '../hooks/useTranslate';
import './App.css';
import backgroundImg from '../IMGS/background.png'
import logoImg from '../IMGS/logo.png';
import searchImg from '../IMGS/ic-search.png';
import logoTextImg from '../IMGS/logo-text.png';

function AppSortButton({ selected, children, onClick }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

//글 불러오기 & 작성 & 수정
function App() {
  const [items, setItems] = useState([]);           //아이템 state
  const [order, setOrder] = useState('createdAt');  //아이템 정렬 state
  const [cursor, setCursor] = useState(null);       //cursor(페이지네이션)값을 저장할 state
  const [search, setSearch] = useState('');       //검색 state
  const [isLoading, loadingError, getFoodsAsync] = useAsync(getFoods);
  const t = useTranslate();

  const sortedItems = items.sort((a, b) => b[order] - a[order]);  //아이템 정렬(내림차순)

  const handleNewestClick = () => setOrder('createdAt');  //최신순

  const handleCalorieClick = () => setOrder('calorie');   //칼로리순

  const handleDelete = async (id) => {  //아이템 삭제
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));  //아이템의 id를 이용해 필터링
  }

  const handleLoad = useCallback(async (options) => {  //음식 아이템 로드
    const result = await getFoodsAsync(options);
    if (!result) return;

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
  }, [getFoodsAsync]); //함수를 고정시켜 재사용

  const handleLoadMore = () => {  //더보기(다음 페이지 불러오기)
    handleLoad({
      order,
      cursor,
      search,
    });
  };

  const handleSearchSubmit = (e) => {  //검색
    e.preventDefault();
    setSearch(e.target['search'].value);  //input의 입력값
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
      search,
    });
  }, [order, search, handleLoad]);


  return (
    <div className="App" style={{ backgroundImage: `url("${backgroundImg}")` }}>
      <nav className="App-nav">
        <img src={logoImg} alt="Foodit"></img>
      </nav>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm
            onSubmit={createFood}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSearchSubmit}>
            <input className="App-search-input" name="search"></input>
            <button className="App-search-button" type="submit">
              <img src={searchImg} alt="검색"></img>
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === 'createdAt'}
              onClick={handleNewestClick}
            >
              {t('newest')}
            </AppSortButton>
            <AppSortButton
              selected={order === 'calorie'}
              onClick={handleCalorieClick}
            >
              {t('sort by calorie')}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          className="App-FoodList"
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button
            className="App-load-more-button"
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            {t('load more')}
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} alt="Foodit"></img>
          <LocaleSelect />
          <div className="App-footer-menu">
            {t('terms of service')} | {t('privacy policy')}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
