import React, { useState } from "react";

const AppExample = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`w-20 h-20 text-3xl font-bold border border-gray-400 flex items-center justify-center
          ${!board[index] && !winner ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}
          ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'}`}
        onClick={() => handleClick(index)}
        disabled={winner || board[index]}
      >
        {board[index]}
      </button>
    );
  };

  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square) 
      ? 'Game ended in a draw!' 
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Tic-Tac-Toe</h1>
        
        <div className="flex justify-between mb-6">
          <div className={`flex-1 text-center py-3 px-4 rounded-lg mr-2 
            ${isXNext && !winner ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}>
            <span className={`font-medium ${isXNext && !winner ? 'text-blue-700' : 'text-gray-700'}`}>
              Player 1 (X)
            </span>
          </div>
          <div className={`flex-1 text-center py-3 px-4 rounded-lg ml-2 
            ${!isXNext && !winner ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'}`}>
            <span className={`font-medium ${!isXNext && !winner ? 'text-red-700' : 'text-gray-700'}`}>
              Player 2 (O)
            </span>
          </div>
        </div>
        
        <div className="text-center text-lg font-semibold mb-4 h-8">
          {status}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>
        
        <button
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </main>
  );
};

export default AppExample;