import './BJ.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import {cardsAll} from '../../utils/cards';
import React from 'react'
import Popup from '../Popup/Popup';
import PopupInstruction from '../PopupInstruction/PopupInstruction'

function shuffle(a) {
  var k,
    t,
    j,
    i = a.length,
    rand = Math.random;
  while (i--) {
    k = (rand() * (i + 1)) | 0;
    t = a[k];
    a[k] = a[i];
    a[i] = t;
  }
  return a;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      dealerTotal: 0,
      dealerTotalAlt: 0,
      dealerCards: [],
      playerTotal: 0,
      playerTotalAlt: 0,
      playerCards: [],
      bet: 0,
      chips: 10000,
      isPlaying: false,
      gameMsg: null,
      win: 0,
      lose: 0,
      draw: 0,
      buttonHit: false,
      buttonStay: false,
      isRed: false,
      popupOpen: false,
      popupOpenInstr: false,
      cardItem: null,
      popupReg: false,
      ratevisib: false,
    };
    this.hendleClickOpen = this.hendleClickOpen.bind(this);
    this.closePopupInstruction = this.closePopupInstruction.bind(this);
  }

  //Перемешиваем карты
  checkDeck = (deck) => {
    return this.state.deck.length < 10 ? deck.concat(shuffle(cardsAll)) : deck;
  };

  calcCards = () => {
    this.setState({
      dealerTotal: this.calcCardTotal(this.state.dealerCards, false),
      dealerTotalAlt: this.calcCardTotal(this.state.dealerCards, true),
      playerTotal: this.calcCardTotal(this.state.playerCards, false),
      playerTotalAlt: this.calcCardTotal(this.state.playerCards, true),
    });
  };

  calcCardTotal = (cards, eleven) => {
    let sum = Object.keys(cards).reduce(function (total, card) {
      let cardVal = Number(cards[card].points);
      cardVal = cardVal == 1 && eleven ? 11 : cardVal;
      return Number(total) + cardVal;
    }, 0);
    return sum;
  };

  //раздаем карты
  drawCards = (deck, playerCards, numberOfCards) => {
    var i;
    for (i = 1; i <= numberOfCards; i++) {
      let card = deck.pop();
      playerCards.push(card);
    }
    return playerCards;
  };

  //Игрок проиграл
  checkForBust = () => {
    let t1,
      t2,
      min,
      status = "";
    t1 = this.calcCardTotal(this.state.playerCards, false);
    t2 = this.calcCardTotal(this.state.playerCards, true);
    min = Math.min(t1, t2);

    if (min > 21) {
      status = this.props.t("popup.youLose");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          lose: prevState.lose + 1,
          popupOpen: true,
        }));
      }, 1000);
    }
    this.setState({
      gameMsg: status,
    });
  };

  makeBet = (e, betVal) => {
    const name = e.target.name;
    this.setState((prevState) => ({
      bet: prevState.bet + +betVal.points,
      chips: prevState.chips - betVal.points,
      isPlaying: true,
      cardItem: name,
    }));
  };
  clearBet = () => {
    this.setState((prevState) => ({
      bet: 0,
      chips: prevState.chips + prevState.bet,
    }));
  };
  // Раздаем по 2 карты в начале игры
  dealClicked = () => {
    let deck = this.checkDeck(this.state.deck);
    let dealerCards = this.state.dealerCards;
    let playerCards = this.state.playerCards;
    if (this.state.bet === 0) return;
    this.drawCards(deck, dealerCards, 2);
    this.drawCards(deck, playerCards, 2);
    let score = 0;
    playerCards.forEach((card) => {
      score += card.points;
    });

    let status = this.checkFirst(dealerCards, score);

    this.setState(
      (prevState) => ({
        deck: deck,
        dealerCards: dealerCards,
        playerCards: playerCards,
        isPlaying: true,
        buttonHit: true,
        buttonStay: true,
        ratevisib: true,
        gameMsg: status,
      }),
      this.calcCards()
    );
  };
  //Вщять еще карту
  hitClicked = () => {
    let deck = this.checkDeck(this.state.deck);
    let playerCards = this.state.playerCards;
    this.drawCards(deck, playerCards, 1);
    if (playerCards.length == 5) {
      this.setState((prevState) => ({
        buttonHit: false,
      }));
    }
    this.setState(
      (prevState) => ({
        playerCards: playerCards,
        deck: deck,
      }),
      this.calcCards(),
      this.checkForBust()
    );
  };

  //Определяем победителя по первым двум картам
  checkFirst = (dealerCards, playerTotal) => {
    let t1,
      t2,
      status = "";
    t1 = this.calcCardTotal(dealerCards, false);
    t2 = this.calcCardTotal(dealerCards, true);

    if (t1 == 21 || t2 == 21) {
      status = this.props.t("popup.dealerblackjack");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          lose: prevState.lose + 1,
          popupOpen: true,
        }));
      }, 1000);
    }

    if ((playerTotal == 21 && t1 != 22) || (playerTotal == 21 && t2 != 22)) {
      status = this.props.t("popup.youblackjack");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          win: prevState.win + 1,
          popupOpen: true,
        }));
      }, 1000);
    }

    if (t1 == 22 || t2 == 22) {
      status = this.props.t("popup.dealerGoldenPoint");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          lose: prevState.lose + 1,
          popupOpen: true,
        }));
      }, 1000);
    }
    if (playerTotal == 22) {
      status = this.props.t("popup.playerGoldenPoint");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          win: prevState.win + 1,
          popupOpen: true,
        }));
      }, 1000);
    }
    return status;
  };

  //Проверка на победителя
  checkDealerStatus = (dealerCards, playerTotal) => {
    let t1,
      t2,
      status = "";

    t1 = this.calcCardTotal(dealerCards, false);
    t2 = this.calcCardTotal(dealerCards, true);
    let playerCards = this.state.playerCards;
    console.log(playerCards);

    if (Math.min(t1, t2) >= 17 && Math.min(t1, t2) != 22) {
      status = "Хватит";
      if ((t1 <= 21 && t1 < playerTotal) || (t2 <= 21 && t2 < playerTotal)) {
        status = this.props.t("popup.youWon");
        this.setState((prevState) => ({
          buttonHit: false,
          buttonStay: false,
        }));
        setTimeout(() => {
          this.setState((prevState) => ({
            win: prevState.win + 1,
            popupOpen: true,
          }));
        }, 1000);
      } else if (
        (t1 <= 21 && t1 > playerTotal && t1 >= 17) ||
        (t2 <= 21 && t2 > playerTotal && t1 >= 17)
      ) {
        status = this.props.t("popup.youLose");
        this.setState((prevState) => ({
          buttonHit: false,
          buttonStay: false,
        }));
        setTimeout(() => {
          this.setState((prevState) => ({
            lose: prevState.lose + 1,
            popupOpen: true,
          }));
        }, 1000);
        console.log(t1, t2, playerTotal);
      }
    }
    if (Math.min(t1, t2) < 17) {
      status = "Еще";
    } else if (Math.min(t1, t2) > 21 && dealerCards.length > 2) {
      status = this.props.t("popup.youWon");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          win: prevState.win + 1,
          popupOpen: true,
        }));
      }, 1000);
    } else if (
      (t1 <= 21 && t1 == playerTotal) ||
      (t2 <= 21 && t2 == playerTotal)
    ) {
      status = this.props.t("popup.draw");
      this.setState((prevState) => ({
        buttonHit: false,
        buttonStay: false,
      }));
      setTimeout(() => {
        this.setState((prevState) => ({
          draw: prevState.draw + 1,
          popupOpen: true,
        }));
      }, 1000);
    }
    console.log(status);
    return status;
  };

  //  displayTotal = (total, totalAlt) => {
  //   return (total !== totalAlt && totalAlt <= 21)
  //     ? total + "/" + totalAlt
  //     : total.toString();
  // }

  stayClicked = () => {
    //Draw dealer cards until value equals or is higher then user.
    let playerTotal = Math.max(
      this.state.playerTotal,
      this.state.playerTotalAlt
    );
    if (playerTotal > 21)
      playerTotal = Math.min(this.state.playerTotal, this.state.playerTotalAlt);
    let deck = this.checkDeck(this.state.deck);
    let dealerCards = this.state.dealerCards;
    let status = this.checkDealerStatus(dealerCards, playerTotal);

    if (status == "" || status == "Еще" || status == "Хватит") {
      do {
        status = this.checkDealerStatus(dealerCards, playerTotal);
        while (status == "Еще") {
          this.drawCards(deck, dealerCards, 1);
          status = this.checkDealerStatus(dealerCards, playerTotal);
          console.log(status);
        }
        console.log(status);
      } while (status == "Хватит");
    }

    this.setState(
      (prevState) => ({
        deck: deck,
        dealerCards: dealerCards,
        gameMsg: status,
      }),
      this.calcCards()
    );
  };

  closePopup = (e) => {
    if (e.target.classList.contains("popup__active")) {
      this.setState((prevState) => ({
        popupOpen: false,
        popupOpenInstr: false,
      }));
      this.resetGame();
    }
  };

  closePopupEsc = (e) => {
    if (e.keyCode === 27) {
      this.setState((prevState) => ({
        popupOpen: false,
        popupOpenInstr: false,
      }));
      this.resetGame();
    }
  };

  hendleClickOpen() {
    this.setState((prevState) => ({
      popupOpenInstr: true,
    }));
  }

  closePopupInstruction() {
    this.setState((prevState) => ({
      popupOpenInstr: false,
    }));
  }

  componentDidMount() {
    document.addEventListener("click", this.closePopup);
    document.addEventListener("keydown", this.closePopupEsc);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closePopup);
    document.removeEventListener("keydown", this.closePopupEsc);
  }

  resetGame = () => {
    let chips = this.state.chips;
    let bet = this.state.bet;
    // debugger;
    //Calculate chips
    if (this.state.gameMsg === this.props.t("popup.draw")) {
      chips = chips + bet;
    } else if (this.state.gameMsg === this.props.t("popup.youWon")) {
      chips = chips + bet * 2;
    } else if (this.state.gameMsg === this.props.t("popup.playerGoldenPoint")) {
      chips = chips + bet * 2;
    } else if (this.state.gameMsg === this.props.t("popup.youblackjack")) {
      chips = chips + bet * 2;
    }

    this.setState({
      deck: [],
      dealerTotal: 0,
      dealerTotalAlt: 0,
      dealerCards: [],
      playerTotal: 0,
      playerTotalAlt: 0,
      playerCards: [],
      isPlaying: false,
      bet: 0,
      chips: chips,
      gameMsg: null,
      buttonHit: false,
      buttonStay: false,
      cardItem: null,
      ratevisib: false,
    });
    if (
      this.state.win + this.state.lose + this.state.draw ===
      JSON.parse(localStorage.getItem("numgame"))
    ) {
      this.setState((prevState) => ({
        gameMsg: this.props.t("popup.registerFrispin"),
        popupOpen: true,
        popupReg: true,
      }));
    }
    if (this.state.chips === 0) {
      this.setState((prevState) => ({
        gameMsg: this.props.t("popup.bonusAcc"),
        popupOpen: true,
      }));
    }
  };

  render() {
    return (
      <div className="BJ">
        <div className="App__background">
          <Header
            chips={this.state.chips}
            hendleClickOpen={this.hendleClickOpen}
            secretAdmin={this.props.secretAdmin}
            secAdm={this.props.secAdm}
          />
          <Main
            makeBet={this.makeBet}
            dealClicked={this.dealClicked}
            hitClicked={this.hitClicked}
            stayClicked={this.stayClicked}
            bet={this.state.bet}
            cardTotalDealer={this.state.dealerTotal}
            cardTotalAltDealer={this.state.dealerTotalAlt}
            cardsDealer={this.state.dealerCards}
            win={this.state.win}
            lose={this.state.lose}
            draw={this.state.draw}
            buttonHit={this.state.buttonHit}
            buttonStay={this.state.buttonStay}
            isPlaying={this.state.isPlaying}
            cardTotalPlayer={this.state.playerTotal}
            cardTotalAltPlayer={this.state.playerTotalAlt}
            cardsPlayer={this.state.playerCards}
            chips={this.state.chips}
            cardItem={this.state.cardItem}
            ratevisib={this.state.ratevisib}
            secAdm={this.props.secAdm}
            loadAdmin={this.props.loadAdmin}
          />

          <Popup
            popupOpen={this.state.popupOpen}
            gameMsg={this.state.gameMsg}
            popupReg={this.state.popupReg}
          />
          <PopupInstruction
            popupOpen={this.state.popupOpenInstr}
            closePopupInstruction={this.closePopupInstruction}
          />
        </div>
      </div>
    );
  }
}

export default Game;