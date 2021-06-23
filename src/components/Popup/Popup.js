import './Popup.css';
import { useTranslation } from "react-i18next";

function Popup ({popupOpen, gameMsg, popupReg}) {
    const { t, i18n } = useTranslation();

    return(
        <div className={`popup__winner ${popupOpen && 'popup__active'}`}>
                <div className="img-winner">
                    <h2 className="title__status">{!popupReg && gameMsg}</h2>
                    <h2 className="title-winner"><span className="winner-span">{popupReg && gameMsg}</span></h2>
                    {popupReg && <a className="button-register">{t('popup.goweb')}</a>}
                </div>
            </div>
    )
}

export default Popup