import { useEffect, useState } from 'react';
import './Login.css';
import * as mainApi from '../../../utils/mainApi';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
require('dotenv').config();

function Login ({setloggedIn, secretAdminRemove}) {
const { t, i18n } = useTranslation();
const [name, setName] = useState('')
const [password, setPassword] = useState('')
const history = useHistory();
const [error, setError] = useState('Неверный логин или пароль')
const [listenerError, setListenerError] = useState(false)

function handleName (e) {
    setName(e.target.value)
}

function handlePassword (e) {
    setPassword(e.target.value)
}

const nodeName = process.env.REACT_APP_NAME_LOG;
const nodePass = process.env.REACT_APP_PASS_LOG;

function hendleSubmit (e)  {
    e.preventDefault()
    // mainApi.login(name, password).then(data => {
    //     console.log(data)
    //     if(data.token) {
    //       setloggedIn(true)
    //       history.push('/admin')
    //     }
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    if(name === nodeName && password === nodePass) {
        setloggedIn(true)
        history.push('/admin')
        localStorage.setItem('name', JSON.stringify(nodeName))
        localStorage.setItem('password', JSON.stringify(nodePass))
    } else {
        setListenerError(true)
    }
  }

  useEffect(() => {
    if(nodeName === JSON.parse(localStorage.getItem('name')) && nodePass === JSON.parse(localStorage.getItem('password'))) {
        setloggedIn(true)
        history.push('/admin')
    }
  }, [nodeName, nodePass])

  function game () {
    secretAdminRemove()
    history.push('/')
  }

    return(
        <div className="login">
            <form onSubmit={(e) => hendleSubmit(e)} className="form">
                <h2 className="login__title">{t('login.title')}</h2>
                <label className="login__label">{t('login.titlelogin')}</label>
                <input className="login__input-name" onChange={(e) => handleName(e)} type="text" value={name}/>
                <label className="login__label">{t('login.titlepassword')}</label>
                <input className="login__input-name" onChange={(e) => handlePassword(e)} type="password" value={password}/>
                <button className="login__button" type="submit">{t('login.enter')}</button>
                {listenerError ? error : ""}
                <button onClick={() => game()} className="login__button login__return">{t('login.backgame')}</button>
            </form>
            
        </div>
    )
}

export default Login