import { useCallback, useState } from "react";

//custom Hook
function useAsync(asyncFuntion) { //비동기 함수를 파라미터로 받음
  const [pending, setPending] = useState(false);  //로딩 state
  const [error, setError] = useState(null); //에러 state

  const wrappedFunction = useCallback(async (...args) => {  //파라미터를 asyncFunction()에게 전달
    try {
      setError(null);
      setPending(true);   //로딩중
      return await asyncFuntion(...args); //리퀘스트 함수
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);  //로딩 완료
    }
  }, [asyncFuntion]); //함수를 고정시켜 재사용

  return [pending, error, wrappedFunction];
  //로딩 상태, 에러, 콜백을 실행할 수 있는 함수를 배열 형태로 리턴 
}

export default useAsync;