import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import Btn from "./Btn";
import ProgressBar from "@ramonak/react-progress-bar";

import running from "../assets/running.gif";
import overworked from "../assets/overworked.gif";

import { ITime } from "../App";

const FORMAT = "YYYY-MM-DD HH:mm";
function OffTimeBox({ inputTime, resetInput }: IProps) {
  let intervalSec: any;
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const { t } = useTranslation();
  const { totalHour, totalMin, hour, min } = inputTime;
  const [endTime, setEndTime] = useState<string>("");
  const [totalSec, setTotalSec] = useState<number>(0);
  const [totalSecNoCounting, setTotalSecNoCounting] = useState<number>(0);
  const leftHour = Math.abs(parseInt(String(+totalSec / 3600)));
  const leftMin = Math.abs(parseInt(String((+totalSec % 3600) / 60)));
  const leftSec = Math.abs(+totalSec % 60);

  const wholeSec = +totalHour * 3600 + +totalMin * 600;
  const totalOverWorkedTime = Math.abs(parseInt(String(+totalSec / 60)));

  /**
   * 현재시간에서 남은 초를 구한다.
   */
  const getOffTime = () => {
    const startTime = moment().format(`YYYY-MM-DD ${hour}:${min}`);
    let endTime = moment(startTime).add(+totalHour, "hour").add(+totalMin, "minute").format(FORMAT);

    setEndTime(endTime);

    const totalSecForLocal = +moment.duration(moment(endTime).diff(now)).asSeconds();
    if (!totalSecNoCounting) {
      setTotalSecNoCounting(totalSecForLocal);
    }
    setTotalSec(totalSecForLocal);
  };

  const stopToInterval = () => {
    clearInterval(intervalSec);
    resetInput();
    window.alert(t("수고하셨어요!", { min: totalOverWorkedTime }));
  };

  const widthP =
    ((wholeSec - totalSec) / wholeSec) * 100 > 99 && ((wholeSec - totalSec) / wholeSec) * 100 < 100
      ? 99
      : Math.round(((wholeSec - totalSec) / wholeSec) * 100);

  const HowLong = useCallback(() => {
    let text: string = "";
    if (widthP > 100) text += "야근하세요..?";
    else if (widthP > 90) text += "거의 끝!!";
    else if (widthP > 70) text += "조금만 더!!";
    else if (widthP > 50) text += "드디어 반!!";
    else if (widthP > 30) text += "내 일분은 한시간같다...";
    else if (widthP > 10) text += "천리길도 한걸음부터...";
    else text = "시작이 반이다...";
    return t(text, { percent: `${widthP}% ` });
  }, [widthP]);

  useEffect(() => {
    getOffTime();
  }, []);

  useEffect(() => {
    intervalSec = setInterval(() => {
      setTotalSec((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(intervalSec);
  }, [totalSec]);
  return (
    <div className="flex flex-col gap-5 justify-center items-center flex-1">
      <p className="text-gray-100 text-2xl font-bold pb-5">{t("퇴근 시간은...")}</p>
      <p className="text-gray-100 text-[32px] font-bold pb-5">{endTime}</p>
      {totalSec > 0 && (
        <>
          <p className="text-gray-100 text-2xl font-bold pb-5">{t("남은 시간은...")}</p>
          <p className="text-gray-100 text-[32px] font-bold pb-5">
            {t("남은시간", { hour: leftHour, min: leftMin, sec: leftSec })}
          </p>
          <div className="flex w-full">
            <div style={{ width: `${widthP - 13}%` }} />
            <img src={running} className="w-[120px] h-[100px] pb-5" />
          </div>
          <div className="w-full">
            <ProgressBar completed={widthP} customLabel={HowLong()} />
          </div>
        </>
      )}
      {totalSec < 0 && (
        <div className="flex flex-col justify-center items-center">
          <img src={overworked} className="w-[50%] h-[45%] pb-5" />
          <p className="text-gray-100 text-2xl font-bold pb-5">{t("야근하세요...?")}</p>
          <p className="text-gray-100 text-[32px] font-bold pb-5">
            {t("야근시간", { hour: leftHour, min: leftMin, sec: leftSec })}
          </p>
          <p className="text-gray-100 text-[32px] font-bold pb-5">
            {t("총몇분", { min: totalOverWorkedTime })}
          </p>
          <Btn func={stopToInterval} text={t("퇴근!!")} />
        </div>
      )}
    </div>
  );
}

interface IProps {
  inputTime: ITime;
  resetInput: () => void;
}

export default OffTimeBox;
