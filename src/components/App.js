import items from '../mock.json';
import FoodList from './FoodList';

function App() {
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
}

export default App;
