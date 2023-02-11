import React from "react";

function InputBtn({ type, name, value, func, color }: IProps) {
  return (
    <input
      className={`w-[150px] h-[50px] pl-5 rounded-lg bg-${color || "gray-100"}`}
      type={type || "text"}
      name={name}
      value={value}
      onChange={func}
    />
  );
}

interface IProps {
  type?: string | null;
  name: string;
  value: string;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}
export default InputBtn;
