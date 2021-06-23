import './App.css';
import Game from './../BJ/BJ';
import Admin from './Admin/Admin';
import { Route, Switch } from "react-router-dom";
import  Login from './Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useState, Suspense, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Error from './../Error/Error';
import * as mainApi from './../../utils/mainApi';
import Preloader from '../Preloader/Preloader';
require('dotenv').config();

function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const { t, i18n } = useTranslation();
  const [selectValue, setSelectValue] = useState(JSON.parse(localStorage.getItem('numgame')))
  const [secAdm, setSecAdm] = useState(false)
  const [loadAdmin, setLoadAdmin] = useState(false)
  const [hostName, setHostname] = useState('')
    
  function hendleChange (e) {
    setSelectValue(e.target.value)
  }

  // const [openpopup, setOpenPopup] = useState(false)

  

  

  function secretAdmin () {
    setSecAdm(!secAdm)
 
  }

  function secretAdminRemove() {
    setSecAdm(false)
  }

  useEffect(() => {
    setLoadAdmin(true)
    mainApi.domen().then(data => {
        setHostname(data.GetResourceAvailableStatusForRegionResult.Hosts[0].HostName)
    })
    .finally(() => setLoadAdmin(false))
  },[])

  return (
    <div className="App">
      
      <Suspense fallback={<Preloader />}>  
      <Switch>
        <Route exact path="/">
          <Game 
          t={t} 
          selectValue={selectValue} 
          secretAdmin={secretAdmin}
          secAdm={secAdm}
         />
        </Route>
        <ProtectedRoute 
        path="/admin"
        component={Admin}
        loggedIn={loggedIn}
        setloggedIn={setloggedIn}
        hendleChange={hendleChange}
        selectValue={selectValue}
        secretAdminRemove={secretAdminRemove}
        hostName={hostName}
        loadAdmin={loadAdmin}
        />
        <Route path="/signin" >
        <Login setloggedIn={setloggedIn} secretAdminRemove={secretAdminRemove} />
        </Route>
        <Route path="*">
            <Error />
          </Route>
      </Switch>
      {/* <PopupInstruction openpopup={openpopup} closePopupInstruction={closePopupInstruction}/> */}
      </Suspense>
    </div>
  );
}

export default App;
