const GameOver = ({ winner, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none backdrop-blur-sm">
      {/* Overlay moderne avec effet de flou */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenu GameOver */}
      <div className="relative bg-white/80 backdrop-blur rounded-2xl p-6 md:p-10 shadow-2xl text-center max-w-[90%] md:max-w-md w-full pointer-events-auto transform transition-all duration-300 hover:scale-[1.008]">
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-4 md:mb-6 animate-pulse">Game Over</h2>
        <p className="text-2xl md:text-3xl text-gray-800 mb-6 md:mb-8">
          {winner ? (
            <>
              <span className="font-semibold text-green-500">{winner}</span> wins the game!
            </>
          ) : (
            "It's a draw!"
          )}
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 md:py-4 px-8 md:px-12 rounded-xl transition-all duration-300 text-xl md:text-2xl hover:shadow-lg transform hover:-translate-y-1"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};
export default GameOver;