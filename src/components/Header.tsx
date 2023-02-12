import React from "react";
import { useTranslation } from "react-i18next";

function Header({ lang, changeLang, KO, EN }: IProps) {
  const { t } = useTranslation();
  return (
    <header className="w-full h-[10vh] flex items-center px-10 gap-10 justify-between">
      <p className="text-bluegrey-100 text-2xl font-bold">{t("난 시계만 바라봐")}</p>
      <div className="flex gap-10">
        <button
          className={lang == KO ? "text-gray-100" : "text-bluegrey-700"}
          onClick={() => changeLang(KO)}
        >
          {t("한국어")}
        </button>
        <button
          className={lang == EN ? "text-gray-100" : "text-bluegrey-700"}
          onClick={() => changeLang(EN)}
        >
          {t("영어")}
        </button>
      </div>
    </header>
  );
}

interface IProps {
  lang: string;
  changeLang: (value: string) => void;
  KO: string;
  EN: string;
}
export default Header;
