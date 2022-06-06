import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();  //context 만들기

//ContextProvider & locale state를 한 곳에 모아놓고 관리

export function LocaleProvider({ defaultValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaultValue); //locale state

  return (
    //state 변경도 context를 통해서 변경
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

//locale 값 전달
export function useLocale() {
  const context = useContext(LocaleContext);  //context 값 가져오기

  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.'); //에러 처리
  }

  return context.locale;
}

//setLocale 값을 가져올 때 사용
export function useSetLocale() {
  const context = useContext(LocaleContext);  //context 값 가져오기

  if (!context) {
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.'); //에러 처리
  }

  return context.setLocale;
}