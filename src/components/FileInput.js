import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {  //file - 비제어 컴포넌트(value prop 사용X)
  const [preview, setPreview] = useState(initialPreview); //음식 이미지 미리모기 state
  const inputRef = useRef();  //ref 객체(실제 DOM 노드를 참조)

  const handleChange = (e) => {
    const nextValue = e.target.files[0];  //file[0] - 선택한 이미지 파일의 객체
    onChange(name, nextValue);  //imgFile: 이미지 파일 객체
  };

  const handleClearClick = () => {  //초기화
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null); //imgFile: null
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value); //이미지 오브젝트 url 생성(리턴해 주는 문자열을 해당 파일의 주소처럼 사용)
    setPreview(nextPreview);

    return () => { //정리
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview); //오브젝트 url 해제(메모리 할당 해제)
    }
  }, [value, initialPreview]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기"></img>
      <input type="file" accept="image/png, image/jpeg" onChange={handleChange} ref={inputRef}></input>
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;

/*

  console.log(e.target.files)
  
  ▼FileList {0: File, length: 1}
    ▶0: File {name: " ", lastModified: 1628133839923, ... }
      lenth: 1

 */