const GameBoard = ({ onSelectSquare, bord }) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  for (const turn of bord) {
    const { row, col } = turn.squares;
    board[row][col] = turn.player;
  }

  return (
    <ol className="grid grid-cols-3 gap-2 w-max mx-auto mt-6 list-none p-0">
      {board.map((row, rowIdx) =>
        row.map((playerSymbol, colIdx) => (
          <li key={`${rowIdx}-${colIdx}`}>
          <button
  className={`w-16 h-16 md:w-24 md:h-24 text-4xl font-bold border-2 border-gray-800 bg-white hover:bg-gray-200 transition-all duration-150 ease-in-out ${
    playerSymbol === "X" ? "text-red-500" : "text-blue-500"
  }`}
  onClick={() => onSelectSquare(rowIdx, colIdx)}
  disabled={!!playerSymbol}
>
  {playerSymbol}
</button>

          </li>
        ))
      )}
    </ol>
  );
};

export default GameBoard;
