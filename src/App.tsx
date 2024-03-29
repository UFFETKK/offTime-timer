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

const INITIAL_VALUE = {
  hour: "",
  min: "",
  totalHour: "",
  totalMin: "",
  isNoon: "AM",
};
function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(KO);
  const [inputTime, setInputTime] = useState<ITime>(INITIAL_VALUE);
  const [isEditMode, setIsEditMode] = useState<Boolean>(true);

  const changeLang = (value: string) => {
    setLang(() => value);
    i18n.changeLanguage(value);
    localStorage.setItem(KEY_LANG, value);
  };

  const resetInput = () => {
    setInputTime(INITIAL_VALUE);
    localStorage.clear();
    setIsEditMode(true);
    setLang(KO);
  };

  const onSubmit = async () => {
    if (isEditMode) {
      if (
        !inputTime.totalHour.length ||
        Number(inputTime.totalHour) == 0 ||
        !inputTime.hour.length ||
        Number(inputTime.hour) == 0
      ) {
        window.alert(t("입력을 확인해주세요"));
        return;
      }
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
    let count: number = 0;

    for (let key in inputTime) {
      const savedValue = localStorage.getItem(key);
      copy[key as keyof typeof inputTime] = savedValue || "";
      if (savedValue) count++;
    }
    if (count > 3) setIsEditMode(false);
    setInputTime(copy);
  }, []);

  return (
    <div className="bg-bluegrey-900 w-screen h-screen ">
      <Header KO={KO} EN={EN} changeLang={changeLang} lang={lang} />
      <div className="w-full h-[90vh] flex px-10">
        <div className="flex flex-col justify-center items-center gap-10 flex-1">
          <div className="flex justify-start gap-20 pb-10">
            <p className="text-gray-100 text-2xl font-bold pb-5">{t("퇴근 언제해...?")}</p>
            <Btn text={isEditMode ? "확인" : "수정"} func={onSubmit} />
            {isEditMode && <Btn text={"리셋"} func={resetInput} />}
          </div>
          <div className="flex gap-10 justify-center items-start">
            <TimeBox
              setInputTime={setInputTime}
              title="근로 시간"
              names={["totalHour", "totalMin"]}
              inputTime={inputTime}
              isEditMode={isEditMode}
            />

            <TimeBox
              isTotal
              setInputTime={setInputTime}
              title="내 출근 시간"
              names={["hour", "min"]}
              inputTime={inputTime}
              isEditMode={isEditMode}
            />
          </div>
        </div>
        {!isEditMode && <OffTimeBox inputTime={inputTime} resetInput={resetInput} />}
      </div>
    </div>
  );
}

export interface ITime {
  [key: string]: string;
}

export default App;
