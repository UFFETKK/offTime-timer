import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Btn from "./components/Btn";
import Header from "./components/Header";
import OffTimeBox from "./components/OffTimeBox";
import TimeBox from "./components/TimeBox";
import "./index.css";
import "./lang/i18n";

const KO = "ko";
const EN = "en";
const KEY_LANG = "lang";

function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(KO);
  const [inputTime, setInputTime] = useState<ITime>({
    hour: "",
    min: "",
    totalHour: "",
    totalMin: "",
    isNoon: "AM",
  });
  const [isEditMode, setIsEditMode] = useState<Boolean>(true);

  const changeLang = (value: string) => {
    setLang(() => value);
    i18n.changeLanguage(value);
    localStorage.setItem(KEY_LANG, value);
  };

  const selectIsNoon = (value: string) => {
    setInputTime({ ...inputTime, isNoon: value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputTime({ ...inputTime, [name]: value });
  };

  const onSubmit = async () => {
    if (isEditMode) {
      const copy = { ...inputTime };
      for (const key in copy) {
        let value;
        if (key != "isNoon") {
          if (!!inputTime[key].length) {
            value = inputTime[key];
            if (key == "hour" && inputTime.isNoon == "PM") {
              value = +value > 12 ? value : String(+value + 12);
            } else if (key == "hour" && inputTime?.isNoon == "AM" && +value > 12) {
              copy.isNoon = "PM";
            }
          } else {
            value = "00";
          }
          copy[key] = value;
          localStorage.setItem(key, value);
        }
      }
      setInputTime(copy);
      setIsEditMode(false);
      window.alert(t("저장 되었습니다."));
    } else {
      setIsEditMode(true);
      window.alert(t("수정하세요!"));
    }
  };

  useEffect(() => {
    const localLang = localStorage.getItem(KEY_LANG);
    i18n.changeLanguage(localLang || lang);
    setLang(localLang || lang);
    const copy = { ...inputTime };

    for (let key in inputTime) {
      copy[key as keyof typeof inputTime] = localStorage.getItem(key) || "";
    }
    setInputTime(copy);
  }, []);

  return (
    <div className="bg-bluegrey-900 w-screen h-screen ">
      <Header KO={KO} EN={EN} changeLang={changeLang} lang={lang} />
      <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10 px-[28rem] ">
        <div className="w-full flex justify-around gap-20 pb-10">
          <p className="text-gray-100 text-2xl font-bold pb-5">{t("퇴근 언제해...?")}</p>
          <Btn text={isEditMode ? "확인" : "수정"} func={onSubmit} />
        </div>
        <div className="flex gap-10 justify-center items-start">
          <TimeBox
            func={onChangeInput}
            title="근로 시간"
            names={["totalHour", "totalMin"]}
            inputTime={inputTime}
            isEditMode={isEditMode}
          />

          <TimeBox
            func={onChangeInput}
            title="내 출근 시간"
            names={["hour", "min"]}
            inputTime={inputTime}
            isEditMode={isEditMode}
            selectIsNoon={selectIsNoon}
          />
        </div>
        {!isEditMode && <OffTimeBox inputTime={inputTime} />}
      </div>
    </div>
  );
}

export interface ITime {
  [key: string]: string;
}

export default App;
