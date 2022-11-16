import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './component.css'
function Square(props) {
  const clickedSquare=props.clickedSquare
  
  const clicked= clickedSquare? " currentClicked" : ""

  return (
    <button className={`square${clicked}`} onClick={props.onClick} id={props.id}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const currentSquare=this.props.currentSquare
    
    
    const clickedSquare = currentSquare===i 
    
    return (
      <Square
        clickedSquare={clickedSquare}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        id={i}
      />
    );
  }
  toMapping () {
    const toMap = []
    for (let i=0; i<=8; i++){
      toMap.push(i)
      console.log(toMap);
      
    }return toMap
    

  }
  
  
  
  render() {
    const toMap=this.toMapping()
    
    const firstMap = toMap.slice(0,3)
    const secondMap = toMap.slice(3,6)
    const thirdMap = toMap.slice(6,9)

    
      
    const firstThree =  firstMap.map((stepIn,toRender) =>{
      return(<>
        {this.renderSquare(stepIn)}
          </>
          )
    })
    const first = <div className="board-row">
    {firstThree}
    </div>
    const secondThird =  secondMap.map((stepIn,toRender) =>{
      return(<>
        {this.renderSquare(stepIn)}
          </>
          )
    })
    const second = <div className="board-row">
    {secondThird}
    </div>

const thirdThird =  thirdMap.map((stepIn,toRender) =>{
  return(<>
    {this.renderSquare(stepIn)}
      </>
      )
})
const third = <div className="board-row">
{thirdThird}
</div>
    
      return (<>
        {first}
        {second}
        {third}
        </>
        )
    
  
   
    
    return (
      <div>{first}
     
       
      
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      currentSquare: [],
      
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    const currentSquare = this.state.currentSquare.slice(0, this.state.stepNumber).concat(i)
    
  
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      currentSquare: currentSquare
    })
    
  }
  
  jumpTo(step) {
    
  
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0})
      
     
  }
  

  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const currentSquare= this.state.currentSquare
    const stepNumber = this.state.stepNumber
    
    function col(a)  {
      return  a === 0|| a=== 3|| a===6 ? 1 : a ===1||a===4||a===7 ? 2 : 3
    }
    function row (a)  {
      return a <=2 ? 1 : a<=5 ? 2 : 3
    }
    
    const moves = history.map((step, move) => {
      const clickedInList = move === stepNumber
      
      const clickedList = clickedInList ? " clickedInList" : ""
      const desc = move ?
        'Go to move #' + move + " col: "+col(currentSquare[move -1])+" row: " + row(currentSquare[move-1]) + " made by player: "+ (move % 2 ? "X" : "O"):
        'Go to game start';
      return (
        <li key={move}>
          <button className={`listButtons ${clickedList}`} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            currentSquare={currentSquare[currentSquare.length -1]}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
