import React, { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITime } from "../App";
import moment from "moment";
import Btn from "./Btn";

const FORMAT = "YYYY-MM-DD HH:mm";
function OffTimeBox({ inputTime }: IProps) {
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

  const getOffTime = async () => {
    const startTime = moment().format(`YYYY-MM-DD ${hour}:${min}`);
    let endTime = moment(startTime).add(+totalHour, "hour").format(FORMAT);
    if (!!Number(totalMin)) {
      endTime = moment(startTime).add(+totalMin, "minute").format(FORMAT);
    }
    setEndTime(endTime);

    const totalSecForLocal = +moment.duration(moment(endTime).diff(now)).asSeconds();
    if (!totalSecNoCounting) {
      setTotalSecNoCounting(totalSecForLocal);
    }
    setTotalSec(totalSecForLocal);
  };

  const stopToInterval = () => {
    clearInterval(intervalSec);
    window.alert(t("수고하셨어요!"));
  };

  useEffect(() => {
    intervalSec = setInterval(() => {
      setTotalSec((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(intervalSec);
  }, [totalSec]);

  // console.log(Math.ceil((totalSecNoCounting - totalSec) / totalSecNoCounting));

  useEffect(() => {
    getOffTime();
  }, []);
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
          {/* <div className="relative w-full h-3 rounded-lg bg-w">
            <p className="absolute left-0 text-w top-3">start</p>
            <p className="absolute right-0 text-w top-3">end!!!!!</p>
            <div
              className={`w-[${(totalSec / totalSecNoCounting) * 100}%] h-full rounded-lg bg-b`}
            />
          </div> */}
        </>
      )}
      {totalSec < 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-100 text-2xl font-bold pb-5">{t("야근하세요...?")}</p>
          <p className="text-gray-100 text-[32px] font-bold pb-5">
            {t("야근시간", { hour: leftHour, min: leftMin, sec: leftSec })}
          </p>
          <p className="text-gray-100 text-[32px] font-bold pb-5">
            {t("총몇분", { min: Math.abs(parseInt(String(+totalSec / 60))) })}
          </p>
          <Btn func={stopToInterval} text={t("퇴근!!")} />
        </div>
      )}
    </div>
  );
}

interface IProps {
  inputTime: ITime;
}

export default OffTimeBox;
