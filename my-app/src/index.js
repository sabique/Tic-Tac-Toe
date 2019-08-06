import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props){
    return (
      <button 
      className="square" 
      onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array.from(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();

        if(calculateWinner(squares) || squares[i]){
          return;
        }

        squares[i] = this.nextValue(this.state.xIsNext);
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext
        });
    }

    nextValue(isX){
      return isX? 'X' : 'O';
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
      const winner = calculateWinner(this.state.squares);
      let status; //= 'Next player: ' + this.nextValue(this.state.xIsNext);

      if(winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + this.nextValue(this.state.xIsNext);
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
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
          </div>
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

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

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        return squares[a];
      }
    }

    return null;
  }