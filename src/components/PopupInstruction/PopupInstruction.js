import { useTranslation } from "react-i18next";

function PopupInstruction({popupOpen, closePopupInstruction}) {
    const { t, i18n } = useTranslation();


    return(
        <div className={`popup ${popupOpen && "popup__active"}`}>
                <div className="popup__container ">
                    <h1 className="title-one">{t('popupInstruction.title')}</h1>
                    <h2 className="title-two">{t('popupInstruction.subtitle')}</h2>
                    <h2 className="title-three">{t('popupInstruction.howtoplay')}</h2>
                    <ul className="popup__list">
                        <li>1. {t('popupInstruction.1')}</li>
                        <li>2. {t('popupInstruction.2')}</li>
                        <li>3. {t('popupInstruction.3')}</li>
                        <li>4. {t('popupInstruction.4')}</li>
                        <li>5. {t('popupInstruction.5')}</li>
                        <li>6. {t('popupInstruction.6')}</li>
                    </ul>
                    <p className="subtitle__one">{t('popupInstruction.7')}</p>
                    <p className="subtitle__one">{t('popupInstruction.8')}</p>
                    <p className="subtitle__two">{t('popupInstruction.9')}</p>
                    <p className="subtitle__two subtitle__three">{t('popupInstruction.10')}</p>
                    <h2 className="title-four">{t('popupInstruction.11')}</h2>
                    <div onClick={() => closePopupInstruction()} className="close-button"></div>
                </div>
            </div>
    )
}

export default PopupInstruction