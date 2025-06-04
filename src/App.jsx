import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { COMBINATIONS } from "./components/Combinaison_winnning";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = initialGameBoard.map((row) => [...row]);
  for (const turn of gameTurns) {
    const { row, col } = turn.squares;
    gameBoard[row][col] = turn.player;
  }

  let winner = null;
  for (const combination of COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    if (
      firstSymbol &&
      combination.every((cell) => gameBoard[cell.row][cell.col] === firstSymbol)
    ) {
      winner = player[firstSymbol];
      break;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIdx, colIdx) => {
    if (gameBoard[rowIdx][colIdx] !== null || winner) return;

    setGameTurns((prevTurns) => {
      const currentPlayer =
        prevTurns.length > 0 && prevTurns[0].player === "X" ? "O" : "X";
      return [
        { squares: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];
    });

    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  };
  const handleChangePlayerName = (symbol, newName) => {
    setPlayer((prevplayer) => {
      return {
        ...prevplayer,
        [symbol]: newName,
      };
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
    setActivePlayer("X");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 relative">
      <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-gray-700 rounded-lg shadow-md px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">
          Tic-Tac-Toe
        </h1>

        <ol className="flex flex-col sm:flex-row justify-between items-center mb-4 p-2 sm:p-3 bg-gray-100 rounded gap-2 sm:gap-4">
          <Player
            initialName={player.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleChangePlayerName}
          />

          <Player
            initialName={player.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleChangePlayerName}
          />
        </ol>

        <GameBoard
          onSelectSquare={handleSelectSquare}
          bord={gameTurns}
          className="w-full"
        />
      </div>

      <Log
        turns={gameTurns}
        className="w-full max-w-[90%] sm:max-w-md mt-4 sm:mt-6"
      />

      {(winner || isDraw) && (
        <GameOver winner={winner} onRestart={handleRestart} />
      )}
    </main>
  );
};

export default App;
