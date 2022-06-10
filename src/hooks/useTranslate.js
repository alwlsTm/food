import { useLocale } from "../contexts/LocaleContext";

const dict = {  //사전으로 사용할 객체
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || ''; //해당 언어에 맞는 값을 리턴

  return translate;
}

export default useTranslate;