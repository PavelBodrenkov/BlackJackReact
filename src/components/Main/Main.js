import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import {datamoney} from '../../utils/money';
import Card from './../Card/Card';


function Main ({
    makeBet, 
    dealClicked, 
    hitClicked, 
    stayClicked, 
    bet,
    cardTotalDealer,
    cardTotalAltDealer,
    cardsDealer,
    cardTotalPlayer,
    cardTotalAltPlayer,
    cardsPlayer,
    win,
    lose,
    draw,
    buttonHit,
    isPlaying,
    chips,
    cardItem,
    ratevisib,
    buttonStay,
    secAdm,
    
}) {
    const { t, i18n } = useTranslation();
    const [visib, setVisib] = useState(false)

    


    useEffect(() => {
        if(bet === 0) {
            setVisib(true)
        } else {
            setVisib(false) 
        }
        if(ratevisib) {
            setVisib(true)
        }
        
    }, [visib, bet, ratevisib])

    const displayTotal = (total, totalAlt) => {
        return (total !== totalAlt && totalAlt <= 21) 
          ? total + "/" + totalAlt 
          : total.toString();
      }
    return(
        <main className="main" >           
                <div className="main__wrapper container-main">
                    <div className="data-play">
                        <div className="data-play__general">
                            <p className="win">{t('description.wins')}</p>
                            <div className="score score-red victoties">{win}</div>
                        </div>
                        <div className="data-play__general">
                            <p className="win">{t('description.lose')}</p>
                            <div className="score score-black losing">{lose}</div>
                        </div>
                        <div className="data-play__general">
                            <p className="win">{t('description.draws')}</p>
                            <div className="score score-blue draw">{draw}</div>
                        </div>
                    </div>
                    <div className="main__container">
                        <section className="main__container_one">
                            <div className="field-one">
                                <h2 className="field-one__dialer">{t('description.player')}</h2>
                                {cardsPlayer.map((card, index) => {
                                    return(
                                        <img src={card.img} className={`card-player player__card-${index+1}`} key={index}/>
                                    )
                                })}
                            </div>
                            <div className="main__container_number user">{displayTotal(cardTotalPlayer, cardTotalAltPlayer)}</div>
                        </section>
                        <section className="main__container_two">
                            <div className="field-two">
                                <h2 className="field-one__dialer">{t('description.dealer')}</h2>
                                 {cardsDealer.map((card, index) => {
                                     return(
                                        <img src={card.img} className={`card-dealer dealer__card-${index+1}`} key={index}/>
                                     )
                                 })}
                            </div>
                            <div className="main__container_number computer">{displayTotal(cardTotalDealer, cardTotalAltDealer)}</div>
                        </section>
                    </div>
                    <section className="wrapper-card">
                        <div className="main__kol"></div>
                        <div onClick={() => hitClicked()} className={`main__sewitch switch-one green hit ${!buttonHit && 'disabled'}`}>{t('description.hit')}</div>
                        <div onClick={() => stayClicked()}className={`main__sewitch red stand ${!buttonStay && 'disabled'}`}>{t('description.stand')}</div>
                    </section>
                </div> 
                <section className="rate-container container-rate">
                    <div className="input-rate">{bet}</div>
                        {datamoney.map((item, index) => {
                            const className = cardItem == item.points ? 'color-red':'';
                            return(
                                 <Card bet={bet} secAdm={secAdm} card={item} isPlaying={isPlaying} makeBet={makeBet} chips={chips} cardItem={cardItem} className={className} key={index}/>
                                // <button onClick={(e) => makeBet(e,item.points)} name={item.points} className={`attempt" + " " + ${isDisabled()} ${className}`}>{item.points + "$"}</button>
                            )
                        })}
                    <button  onClick={() => {return dealClicked()}} className={`button-rate ${visib && 'disabled'}`}>{t('description.deal')}</button>
                </section>
            </main>
    )
}

export default Main