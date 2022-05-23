import { useState } from "react";
import './FoodForm.css';

function FoodForm() {

  const [values, setValues] = useState({  //하나의 state로 관리
    //각 input의 필드 값
    title: '',
    calorie: 0,
    content: '',
  });

  const handleChange = (e) => { //onChange
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { //onSubmit
    e.preventDefault(); //HTML 폼의 기본 동작을 막음
    console.log(values);
  }

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input type="number" name="calorie" value={values.calorie} onChange={handleChange}></input>
      <input name="content" value={values.content} onChange={handleChange}></input>
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;