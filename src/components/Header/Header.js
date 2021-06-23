import { useTranslation } from "react-i18next";
import './Header.css'
import usd from '../../images/USD.png';
import logo from '../../images/logo.png';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useState } from "react";


function Header ({chips, hendleClickOpen, secretAdmin, secAdm}) {

    const { t, i18n } = useTranslation();



    return(
        <header className="header">
                <div className="header__content">
                    <div className="header__content-logo" >
                        <img className="logo" src={logo} />
                    </div>
                    <div className="header__text-content">
                        <h1 className="header__title">{t('title')}</h1>
                        <h2 className="rules"><a onClick={() => {return hendleClickOpen()}} className="rules__link" href="#">{t('description.howtoplay')}</a></h2>
                    </div>
                    <div className="money">
                        <div className='header__language'>{<LanguageSelector />}</div>
                        <div className="header__money-container">
                            <img onClick={() => secretAdmin()} src={usd} className={`usd ${secAdm && "usd__active"}`} />
                            <div className="money-rate">{chips}</div>
                        </div>
                       
                    </div>
                </div>
        </header>
       
    )
}

export default Header