import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "./components/Box";
import Btn from "./components/Btn";
import InputBtn from "./components/InputBtn";
import "./index.css";
import "./lang/i18n";

const KO = "ko";
const EN = "en";
const LOCAL_STORAGE_KEY: string[] = ["hour", "min", "lang"];
function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>("ko");
  const [inputTime, setInputTime] = useState<ITime>({
    hour: "",
    min: "",
  });
  const [isEditMode, setIsEditMode] = useState<Boolean>(true);

  const changeLang = (value: string) => {
    setLang(() => value);
    i18n.changeLanguage(value);
    localStorage.setItem("lang", value);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputTime({ ...inputTime, [name]: value });
  };

  const onSubmit = async () => {
    if (isEditMode) {
      for (const key in inputTime) {
        const value: string = inputTime[key];
        localStorage.setItem(key, value);
      }
      setIsEditMode(false);
      window.alert(t("저장 되었습니다."));
    } else {
      setIsEditMode(true);
      window.alert(t("수정하세요!"));
    }
  };

  useEffect(() => {
    LOCAL_STORAGE_KEY.forEach((key: string) => {
      const value = localStorage.getItem(key);
      if (key == lang) {
        i18n.changeLanguage(value || lang);
        setLang(value || lang);
      } else {
        setInputTime({ ...inputTime, [key]: value || "" });
      }
    });
  }, []);

  return (
    <div className="bg-bluegrey-900 w-screen h-screen ">
      <header className="w-full h-[10vh] flex items-center px-10 gap-10 justify-between">
        <p className="text-bluegrey-100 text-2xl font-bold">{t("난 시계만 바라봐")}</p>
        <div className="flex gap-10">
          <button
            className={lang == KO ? "text-gray-100" : "text-bluegrey-700"}
            onClick={() => changeLang(KO)}
          >
            {t("한국어")}
          </button>
          <button
            className={lang == EN ? "text-gray-100" : "text-bluegrey-700"}
            onClick={() => changeLang(EN)}
          >
            {t("영어")}
          </button>
        </div>
      </header>
      <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
        <p className="text-gray-100 text-2xl font-bold">{t("퇴근 언제해...?")}</p>
        <p className="text-gray-100 text-xl font-bold ">{t("내 출근 시간")}</p>
        <div className="flex gap-10 items-end">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-gray-100">{t("시간")}</p>
            {isEditMode ? (
              <InputBtn name="hour" value={inputTime.hour} func={onChangeInput} />
            ) : (
              <Box text={inputTime.hour} />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-gray-100">{t("분")}</p>
            {isEditMode ? (
              <InputBtn name="min" value={inputTime.min} func={onChangeInput} />
            ) : (
              <Box text={inputTime.min} />
            )}
          </div>
          <Btn text={isEditMode ? "확인" : "수정"} func={onSubmit} />
        </div>
      </div>
    </div>
  );
}

interface ITime {
  [key: string]: string;
}

export default App;
