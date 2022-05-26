import { useRef } from "react";

function FileInput({ name, value, onChange }) {  //file - 비제어 컴포넌트(value prop 사용X)
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

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef}></input>
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