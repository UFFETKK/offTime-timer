import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITime } from "../App";
import moment from "moment";

function OffTimeBox({ inputTime }: IProps) {
  const { t } = useTranslation();
  const { totalHour, totalMin, hour, min } = inputTime;
  const [endTime, setEndTime] = useState<string>("");

  const getOffTime = () => {
    const startTime = moment().format(`YYYY-MM-DD ${hour}:${min}`);
    let endTime = moment(startTime).add(+totalHour, "hour").format(`YYYY-MM-DD HH:mm`);
    if (!!Number(totalMin)) {
      endTime = moment(startTime).add(+totalMin, "minute").format(`YYYY-MM-DD HH:mm`);
    }

    setEndTime(endTime);
  };
  useEffect(() => {
    getOffTime();
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <p className="text-gray-100 text-2xl font-bold pb-5">{t("퇴근 시간은...")}</p>
      <p className="text-gray-100 text-[32px] font-bold pb-5">{endTime}</p>
    </div>
  );
}

interface IProps {
  inputTime: ITime;
}

export default OffTimeBox;
