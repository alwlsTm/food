import { useLocale, useSetLocale } from "../contexts/LocaleContext";
import './LocaleSelect.css';

function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handelChange = (e) => setLocale(e.target.value);

  return (
    <select className="LocaleSelect" value={locale} onChange={handelChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;