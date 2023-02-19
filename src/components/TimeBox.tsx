import React from "react";
import { useTranslation } from "react-i18next";

import Box from "./Box";
import InputBtn from "./InputBtn";

import { ITime } from "../App";

function TimeBox({ isTotal, setInputTime, title, inputTime, isEditMode, names }: IProps) {
  const { t } = useTranslation();
  const timeArr = ["AM", "PM"];

  const selectIsNoon = (value: string) => {
    setInputTime({ ...inputTime, isNoon: value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputTime({ ...inputTime, [name]: value });
  };

  return (
    <div className="flex flex-col items-center gap-3 pr-10">
      <p className="text-gray-500 text-xl font-bold pb-5">{t(title)}</p>

      <div className="flex gap-10">
        {isTotal && (
          <div className="flex flex-col gap-5">
            {timeArr.map((item, i) => (
              <Box
                key={i}
                text={item}
                func={() => selectIsNoon(item)}
                color={inputTime.isNoon == item ? "dark" : "light"}
                checked={inputTime.isNoon == item}
              />
            ))}
          </div>
        )}
        {names?.map((item, i) => (
          <div className="flex flex-col items-start gap-3" key={i}>
            <p className="text-gray-300 pl-3">{t(i == 0 ? "시간" : "분")}</p>
            {isEditMode ? (
              <InputBtn name={item} value={inputTime[item]} func={onChangeInput} />
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
  isTotal?: boolean;
  title: string;
  inputTime: ITime;
  isEditMode: Boolean;
  names: string[];
  setInputTime: React.Dispatch<React.SetStateAction<ITime>>;
  requireAmPm?: Boolean;
}

export default TimeBox;
