import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Layout />, root);
}

const gameStates = {FC:"First",SC:"Second"};

class Card extends React.Component{
  render(){
    return <div className="card"><span>{this.props.card.flipped?this.props.card.cardValue:"?"}</span>
  </div>
}
}

class Layout extends React.Component {

  constructor(props){
    super(props);
    this.state={cards: initialize(), game: gameStates.FC, firstCard: null, count: 0};
  }

  clickCard(card) {
    if(!card.flipped){
      switch (this.state.game) {
        case gameStates.FC:
        this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
        this.setState({cards: this.state.cards, firstCard: card, game: gameStates.SC, count: this.state.count + 1});
        break;
        case gameStates.SC:
        this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
        this.setState({game: gameStates.FC, cards: this.state.cards, count: this.state.count + 1});
        if (this.state.firstCard.cardValue != card.cardValue) {
          setTimeout(()=>{
            this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].flipped = false;
            this.state.cards[card.rowIndex][card.columnIndex].flipped = false;
            this.setState({game: gameStates.FC,firstCard: null, cards: this.state.cards});
          }, 300);
        } else {
          setTimeout(()=>{
            this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].cardValue = "DONE";
            this.state.cards[card.rowIndex][card.columnIndex].cardValue = "DONE";
            this.setState({game: gameStates.FC,firstCard: null, cards: this.state.cards});
          }, 300);
        }
        break;
      }
    }
}

  restore(){
    this.setState({cards: initialize(), game: gameStates.FC, firstCard: null, secondCard: null, count: 0});
  }

  render() {
    const cardsRendered = this.state.cards.map((rowOfCards, rowIndex)=><tr>{rowOfCards.map((card, indexOfCardRow)=><td onClick={()=>this.clickCard(card)}><Card card={card}/></td>)}
  </tr>);
  return <div><table><tbody>{cardsRendered}</tbody></table><div><br></br></div>
  <div><p>No. of clicks:<b>{this.state.count}</b></p></div><button onClick={()=>this.restore()}>RESET</button></div>
}
}

function initialize(){
  var cards = createArray(4,4);
  var data = ['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H'];
  data = shuffle(data);
  var k = 0;
  for(var i=0; i<4; i++){
    for(var j=0; j<4; j++){
      cards[i][j] = {cardValue: data[k], flipped:false, rowIndex:i, columnIndex:j};
      k++;
    }
  }
  return cards;
}

//Attribution: https://stackoverflow.com/questions/6495187/best-way-to-generate-empty-2d-array
function createArray(x, y) {
  return Array.apply(null, Array(x)).map(function(e) {
    return Array(y);
  });
}

//Attribution: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
