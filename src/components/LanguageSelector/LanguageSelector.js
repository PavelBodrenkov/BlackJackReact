import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './LanguageSelector.css';


function LanguageSelector () {
    const { t, i18n } = useTranslation();
    const [lang, setlang] = useState('')

    const handleValue = (e) => {
        setlang(e.target.value)
    }

    useEffect(() => {
        changeLanguage()
    },[lang])

     const changeLanguage = () => {
     i18n.changeLanguage(lang.toLocaleLowerCase());
    };

    // console.log(JSON.parse(localStorage.getItem('language')))

    return(
        <div className="languageSelector__container">
           <p className="selectLanguage">{t('description.selectLanguage')}</p>
            <select onChange={(e) => handleValue(e)}  value={lang} className="languageSelector">
                <option className="languageSelector__option">RU</option>
                <option className="languageSelector__option">EN</option>
            </select>
        </div>
    )
}

export default LanguageSelector