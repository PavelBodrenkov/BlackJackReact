import './Admin.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import * as mainApi from '../../../utils/mainApi';
import Preloader from '../../Preloader/Preloader';


function Admin ({setloggedIn, hendleChange, selectValue, secretAdminRemove, hostName, loadAdmin}) {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const [visibMesseg, setVisibMessage] = useState(false)
    
   

 function hendleLoginOut () {
    setloggedIn(false)
    localStorage.removeItem('name')
    history.push('/signin')
    secretAdminRemove()
 }

 function hendleSubmit (e) {
    e.preventDefault()
     localStorage.setItem('numgame', selectValue )
    setVisibMessage(true)
    setTimeout(() => setVisibMessage(false), 1500)
 }

console.log(loadAdmin)
 
 
    return(
        <div className="admin ">
            {loadAdmin && <Preloader />}
            <div className="admin__header ">
                <div className="container_admin">
                    <form onSubmit={(e) => hendleSubmit(e)} className="admin__form">
                        <label className="admin__title-label">{t('admin.numberofgame')}</label>
                        <input className="admin__input-rate" onChange={(e) => hendleChange(e)} value={selectValue} type="number" />
                        <button className="admin__button-change">{t('admin.change')}</button>
                    </form>
                    <div className="admin__domen">
                        <label className="admin__title-label">{t('admin.currentdomain')}</label>
                        <input className="admin__input-rate" value={loadAdmin ? "Обновление..." : hostName}/>
                    </div>
                    <button type="submit" className="admin__exit-button" onClick={() => hendleLoginOut()}>{t('admin.exit')}</button>
                </div>
            </div>
            <div className={`admin__message ${visibMesseg && 'visib-block'}`}>{t('admin.savechange')}</div>
        </div>
    )
}

export default Admin