import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";

function Box({ text, color = "light", func, checked }: IProps) {
  const { t } = useTranslation();
  const colors: IColor = {
    dark: "bg-bluegrey-800",
    light: "bg-bluegrey-400",
  };
  const bgColor = colors[color];

  return (
    <div
      onClick={func}
      className={`relative cursor-pointer flex justify-center items-center w-[150px] h-[50px] rounded-lg text-w ${bgColor}`}
    >
      {t(text)}
      {checked && <AiFillCheckCircle className="absolute right-10" />}
    </div>
  );
}
interface IProps {
  text: string;
  color?: string;
  func?: any;
  checked?: boolean;
}

interface IColor {
  [key: string]: string;
}

export default Box;
