import React, { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITime } from "../App";
import moment from "moment";
const barRef = createRef();

const FORMAT = "YYYY-MM-DD HH:mm";
function OffTimeBox({ inputTime }: IProps) {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const { t } = useTranslation();
  const { totalHour, totalMin, hour, min } = inputTime;
  const [endTime, setEndTime] = useState<string>("");
  const [totalSec, setTotalSec] = useState<number>(0);
  const leftHour = parseInt(String(+totalSec / 3600));
  const leftMin = parseInt(String((+totalSec % 3600) / 60));
  const leftSec = +totalSec % 60;

  const getOffTime = async () => {
    const startTime = moment().format(`YYYY-MM-DD ${hour}:${min}`);
    let endTime = moment(startTime).add(+totalHour, "hour").format(FORMAT);
    if (!!Number(totalMin)) {
      endTime = moment(startTime).add(+totalMin, "minute").format(FORMAT);
    }

    setEndTime(endTime);
    await getLeftTime();
  };

  const getLeftTime = () => {
    const totalSecForLocal = +moment.duration(moment(endTime).diff(now)).asSeconds();
    if (totalSecForLocal > 0) {
      setTotalSec(totalSecForLocal);
    }
  };

  useEffect(() => {
    const sec = setInterval(() => {
      setTotalSec((previous) => previous - 1);
    }, 1000);
    if (totalSec == 0 || totalSec < 0) {
      clearInterval(sec);
    }
    return () => clearInterval(sec);
  }, []);

  useEffect(() => {
    getOffTime();
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center items-center flex-1">
      <p className="text-gray-100 text-2xl font-bold pb-5">{t("퇴근 시간은...")}</p>
      <p className="text-gray-100 text-[32px] font-bold pb-5">{endTime}</p>
      <p className="text-gray-100 text-2xl font-bold pb-5">{t("남은 시간은...")}</p>
      <p className="text-gray-100 text-[32px] font-bold pb-5">{`${leftHour}시 ${leftMin}분 ${leftSec}초`}</p>
      {/* {!!totalSec && totalSec > 0 && (
        <div className="relative w-full h-3 rounded-lg bg-w">
          <p className="absolute left-0 text-w top-3">start</p>
          <p className="absolute right-0 text-w top-3">end!!!!!</p>
          <div className={`w-[${100}%] h-full rounded-lg bg-b`} />
        </div>
      )} */}
    </div>
  );
}

interface IProps {
  inputTime: ITime;
}

export default OffTimeBox;
