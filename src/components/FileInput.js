function FileInput({ name, value, onChange }) {  //file - 비제어 컴포넌트(value prop 사용X)
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  return (
    <input type="file" onChange={handleChange}></input>
  );
}

export default FileInput;

/*

  console.log(e.target.files)
  
  ▼FileList {0: File, length: 1}
    ▶0: File {name: " ", lastModified: 1628133839923, ... }
      lenth: 1

 */