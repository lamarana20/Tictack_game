import React from "react";
import { useState } from "react";

const Player = ({ initialName, symbol, isActive,  onChangeName }) => {
    
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
   if (isEditing) {
     onChangeName(symbol,playerName);
}
  };
  const handleChangeName = (e) => {
    setPlayerName(e.target.value);
  };
  // Display the player's name and symbol, with an edit button
  let editablePlayer = (
    <span className="font-semibold mx-2 my-2">{playerName}</span>
  );
  if (isEditing) {
    editablePlayer = (
      <input
        type="text"
        className="border border-gray-300 rounded-md px-2 py-1 m-auto"
        value={playerName}
        onChange={handleChangeName}
      />
    );
  }
  return (
    <li
      className={`border p-2 rounded ${
        isActive ? "text-yellow-400 border-yellow-500" : "border-gray-300"
      }`}
    >
      <span className="flex items-center gap-2">
        {editablePlayer}
        <span className="text-blue-600 text-xl">{symbol}</span>
        <button
          className="ml-2 px-2 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200 transition"
          onClick={handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </span>
    </li>
  );
  
};

export default Player;
