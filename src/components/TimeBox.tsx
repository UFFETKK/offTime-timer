import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITime } from "../App";
import Box from "./Box";
import InputBtn from "./InputBtn";

function TimeBox({ selectIsNoon, title, inputTime, func, isEditMode, names }: IProps) {
  const { t } = useTranslation();
  const timeArr = ["AM", "PM"];

  return (
    <div className="flex flex-col items-center gap-3 pr-10">
      <p className="text-gray-500 text-xl font-bold pb-5">{t(title)}</p>

      <div className="flex gap-10">
        {!!selectIsNoon && (
          <div className="flex flex-col gap-5">
            {timeArr.map((item, i) => (
              <Box
                key={i}
                text={item}
                func={() => selectIsNoon(item)}
                color={inputTime.isNoon == item ? "gray-800" : "gray-400"}
              />
            ))}
          </div>
        )}
        {names?.map((item, i) => (
          <div className="flex flex-col items-start gap-3" key={i}>
            <p className="text-gray-300 pl-3">{t(i == 0 ? "시간" : "분")}</p>
            {isEditMode ? (
              <InputBtn name={item} value={inputTime[item]} func={func} />
            ) : (
              <Box text={inputTime[item]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
interface IProps {
  title: string;
  inputTime: ITime;
  isEditMode: Boolean;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  names: string[];
  requireAmPm?: Boolean;
  selectIsNoon?: (value: string) => void;
}

export default TimeBox;
