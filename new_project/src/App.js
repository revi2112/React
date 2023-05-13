import './App.css';
import React, { useState } from 'react';
import { Shopping } from './Components/Shopping';
import { Square } from './Components/Square';

function App() {
  // use state is a built in hook
  // '''

  // if both the comepents has their own usestate both will have ividualivty 
  // but now they use the state of parent element
  // const[count, setCount] = useState(0);
  // function handleClick(){
  //     setCount(count+1)
  // }
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true)
  function handleClick(i) {
    if (squares[i] || caluclateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O"
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function caluclateWinner(squares) {

    let posible_combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for(let i =0;i<posible_combinations.length;i++){

      const [a,b,c] = posible_combinations[i]

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }    
    }
    return null;

  }

  const winner = caluclateWinner(squares);
  let status;

  if (winner){
    status = "Winner is " + winner;
  }else{
    status = "Next Player: " +(xIsNext ? "X" :"O");
  }


  return (
    // <>
    // <Shopping count = {count} handleClick = {handleClick}/>
    // <Shopping count = {count} handleClick = {handleClick}/>
    // </>

    // handleClick = {handleClick} will work (no re-render , fun call will happen in child )
    // if i give handleClick = {handleClick(i)}
    // this will fail because a lot of re render will Happen because of () runs too early
    // call should run when user clicks
    // handle click deals with state variable and setsatte will re-render


    <>
      <div>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />

      </div>

      <div className='board-row'>
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div>

    </>

  );
}

export default App;
