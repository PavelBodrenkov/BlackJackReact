import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
function Card ({isPlaying, card, makeBet, chips, cardItem, className, secAdm, bet, loadGameAdmin}) {
   
    const history = useHistory();

      const cardBlock = () => {
          let block = ""
        if(card.points > chips) {
            block = "disabled"
        } else {
            block = ''
        }
        return block
      }

      

      const isDisabled = () => {
        return isPlaying ? "disabled" : cardBlock();    
      };

      useEffect(() => {
          if(secAdm && bet == 6000) {
                history.push('/signin')
          }
      },[bet, secAdm])
   
    return(
        <button onClick={(e) => makeBet(e, card)} name={card.points} className={`attempt + " " + ${!secAdm && isDisabled()} ${className}`}>{card.points + "$"}</button>
    )
}

export default Card