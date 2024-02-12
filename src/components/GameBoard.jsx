export default function GameBoard({onSquareSelected, board}) {
    // const [gameBoard, setGameBoard] = useState(initialBoard);
    //
    // function handleGameBoard(rowIndex, colIndex) {
    //     setGameBoard(previousGameBoard => {
    //         const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //
    //     onSquareSelected();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() => onSquareSelected(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}