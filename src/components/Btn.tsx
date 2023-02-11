import { useTranslation } from "react-i18next";
import "../index.css";

function Btn({ func, text, color }: IProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={func}
      className={`flex justify-center items-center w-[150px] h-[50px] rounded-lg text-w ${
        color ? `bg-${color}` : "bg-bluegrey-400"
      }`}
    >
      {t(text)}
    </button>
  );
}
interface IProps {
  func: any;
  text: string;
  color?: string;
}

export default Btn;
