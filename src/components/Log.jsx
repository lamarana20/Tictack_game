import React from "react";

const Log = ({ turns }) => {
  return (
    <ol className="mt-6 space-y-2 list-decimal list-inside text-sm text-gray-700">
      {turns.map((turn, index) => (
        <li
          key={`${turn.squares.row}-${turn.squares.col}-${index}`}
          className="bg-gray-100 rounded px-4 py-2 shadow-sm"
        >
          <span className="font-semibold text-blue-600">{turn.player}</span>{" "}
          selected row <span className="font-medium">{turn.squares.row}</span>, col{" "}
          <span className="font-medium">{turn.squares.col}</span>
        </li>
      ))}
    </ol>
  );
};

export default Log;
