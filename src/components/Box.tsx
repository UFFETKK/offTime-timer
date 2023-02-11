import React from "react";
import { useTranslation } from "react-i18next";

function Box({ text, color }: IProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex justify-center items-center w-[150px] h-[50px] rounded-lg text-w bg-gray-400`}
    >
      {t(text)}
    </div>
  );
}
interface IProps {
  text: string;
  color?: string;
}

export default Box;
