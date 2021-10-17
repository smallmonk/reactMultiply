import React from 'react';
import './App.css';

function TapButton(props) {
  return (
    <button className="tapbutton" onClick={props.onClick}>
      {props.value}
    </button>
  )
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
      onBlur={evt => props.onChange(evt)}
      >
    </input>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: 5,
      secondNums: Array(12).fill(null),
      resultCheck: Array(12).fill(null),
    };
    var i;
    for (i = 0; i < 12; i++) {
      this.state.secondNums[i] = (i+1);
    }
  }

  handlePrevNum() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    var firstNum = this.state.firstNum - 1
    if (firstNum < 1) {
      firstNum = 1
    }
    this.setState({
      firstNum: firstNum,
      resultCheck: Array(12).fill(null),
    })
  }

  renderPrevNum() {
    return (
      <TapButton
        value="Prev Number"
        onClick={() => this.handlePrevNum()}
      />
    )
  }

  handleNextNum() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    
    var firstNum = this.state.firstNum + 1
    if (firstNum > 12) {
      firstNum = 12
    }
    this.setState({
      firstNum: firstNum,
      resultCheck: Array(12).fill(null),
    })
  }

  renderNextNum() {
    return (
      <TapButton
        value="Next Number"
        onClick={() => this.handleNextNum()}
      />
    )
  }

  handleTextChange(i, evt) {
    const resultCheck = this.state.resultCheck.slice()
    resultCheck[i] = verifyResult(this.state.firstNum, this.state.secondNums[i], evt.target.value)
    this.setState({
      resultCheck: resultCheck
    })
  }

  renderFirstNum(i) {
    return (
      <StaticText
      value={this.state.firstNum}
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

  render() {
    var grid = []
    
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
    }

    return (
      <div>
        <div className="status">Multiplication Exercise of {this.state.firstNum} </div>
        <div className="status">
          {this.renderPrevNum()}
          {this.renderNextNum()}
        </div>
        <form>
          {grid}
        </form>
      </div>
    );
  }
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

function App() {
  return (
    <div className="App">
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

export default App;
