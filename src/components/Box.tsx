import React from "react";
import { useTranslation } from "react-i18next";

function Box({ text, color = "gray-400", func }: IProps) {
  const { t } = useTranslation();
  console.log(color);

  return (
    <div
      onClick={func}
      className={`flex justify-center items-center w-[150px] h-[50px] rounded-lg text-w bg-${color}`}
    >
      {t(text)}
    </div>
  );
}
interface IProps {
  text: string;
  color?: string;
  func?: any;
}

export default Box;
