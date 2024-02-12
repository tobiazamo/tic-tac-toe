import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function deriveWinner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol
            && firstSquareSymbol === secondSquareSymbol
            && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((innerArrays) => [...innerArrays])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, column} = square;
        gameBoard[row][column] = player;
    }
    return gameBoard;
}

function App() {
    const [players, setPlayerNames] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    let gameBoard = deriveGameBoard(gameTurns);
    const activePlayer = deriveActivePlayer(gameTurns);

    let winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            return [{
                square: {
                    row: rowIndex,
                    column: colIndex
                },
                player: currentPlayer
            }, ...prevTurns];
        })
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayerNames((prevNames) => {
            return {
                ...prevNames,
                [symbol]: newName
            }
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player initialName={PLAYERS.X}
                            symbol={"X"}
                            isActive={activePlayer === 'X'}
                            onChangeName={handlePlayerNameChange}/>
                    <Player initialName={PLAYERS.O}
                            symbol={"O"}
                            isActive={activePlayer === 'O'}
                            onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard
                    onSquareSelected={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App
