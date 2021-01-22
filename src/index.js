import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function StaticText(props) {
  return (
    <span className="statictext">
      {props.value}
    </span>
  )
}

function InputText(props) {
  return (
    <input className="inputtext"
      type="number"
      onChange={evt => props.onChange(evt)}
      >
    </input>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      firstNums: Array(12).fill(5),
      secondNums: Array(12).fill(null),
      resultCheck: Array(12).fill(null),
    };
    var i;
    for (i = 0; i < 12; i++) {
      this.state.secondNums[i] = (i+1);
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  handleTextChange(i, evt) {
    const resultCheck = this.state.resultCheck.slice()
    resultCheck[i] = verifyResult(this.state.firstNums[i], this.state.secondNums[i], evt.target.value)
    this.setState({
      resultCheck: resultCheck
    })
  }

  renderFirstNum(i) {
    return (
      <StaticText
      value={this.state.firstNums[i]}
      />
    )
  }

  renderSecondNum(i) {
    return (
      <StaticText
      value={this.state.secondNums[i]}
      />
    )
  }

  renderText(i) {
    return (
      <StaticText
      value={i}
      />
    )
  }


  renderInputText(i) {
    return (
      <InputText
      value={i}
      onChange={evt => this.handleTextChange(i, evt)}
      />
    )
  }

  renderResultStatus(i) {
    if (1 === this.state.resultCheck[i]) {
      return (
        <StaticText
        value=" Good!"
        />
      )
    } else if (-1 === this.state.resultCheck[i]) {
      return (
        <StaticText
          value=" Try again..."
        />
      )
    } else{
      return (
        <StaticText
          value=""
        />
      )
    }
  }

  renderSquare(i) {
    return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    var grid = []
    grid.push(
      <div className="board-row">
        {this.renderText("--------------------------------------------------------------------------")}
      </div>
    );
    
    var rowno;
    for (rowno = 0; rowno < 12; rowno++) {
      grid.push(
        <div className="board-row">
          {this.renderFirstNum(rowno)}
          {this.renderText(" X ")}
          {this.renderSecondNum(rowno)}
          {this.renderText(" = ")}
          {this.renderInputText(rowno)}
          {this.renderResultStatus(rowno)}
        </div>
      );
      grid.push(
        <div className="board-row">
          {this.renderText("--------------------------------------------------------------------------")}
        </div>
      );
    }


    return (
      <div>
        <div className="status">Multiplication</div>
        <form>
          {grid}
        </form>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function verifyResult(first, second, result) {
  if (null === result || result.length === 0) {
    return 0
  }
  
  if (parseInt(result, 10) === first * second) {
    return 1
  } else {
    return -1
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

