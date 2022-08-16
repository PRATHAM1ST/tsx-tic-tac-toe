import { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Result from './Components/Result';
import CheckWinner from './Logic/CheckWinner';
import { BoxModel } from './model';

function App() {

  const [board, setBoard] = useState<BoxModel[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const players = ['O', 'X'];

  const [availableBoxes, setAvailableBoxes] = useState<boolean[]>([]);

  const [whatHappened, setWhatHappened] = useState<string>(`Turn: ${players[turn]}`);

  useEffect(() => {
    let tempBoard = [];
    let tempAvailableBoxes = [];

    for (let i = 0; i < 9; i++) {
      tempBoard.push({ id: i, value: '' });
      tempAvailableBoxes.push(true);
    }

    setBoard(tempBoard);
    setAvailableBoxes(tempAvailableBoxes);

  }, [])

  return (
    <div className="App">
      <Board 
        board={board}
        setBoard={setBoard}
        turn={turn}
        setTurn={setTurn}
        players={players}
        availableBoxes={availableBoxes}
        setAvailableBoxes={setAvailableBoxes}
        setWhatHappened={setWhatHappened}/>
      <Result whatHappened={whatHappened} />
    </div>
  );
}

export default App;
