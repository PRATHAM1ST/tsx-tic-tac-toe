import { BoxModel } from '../model';
import './Components.css';
import { FC, useEffect } from 'react';
import CheckWinner from '../Logic/CheckWinner';

interface props {
    board: BoxModel[],
    setBoard: React.Dispatch<React.SetStateAction<BoxModel[]>>,
    turn: number,
    setTurn: React.Dispatch<React.SetStateAction<number>>,
    players: string[],
    availableBoxes: boolean [],
    setAvailableBoxes: React.Dispatch<React.SetStateAction<boolean[]>>,
    setWhatHappened: React.Dispatch<React.SetStateAction<string>>,
    run: boolean,
    setRun: React.Dispatch<React.SetStateAction<boolean>>

}

const Board: FC <props> = ({board, setBoard, turn, setTurn, players, availableBoxes, setAvailableBoxes, setWhatHappened, run, setRun}) => {

    
    const handleClick = (targetElem: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{

        const targetElemId = parseInt(targetElem.currentTarget.id)


        if(availableBoxes[targetElemId] && run){

            let tempBoard : BoxModel[] = board;
            let tempAvailableBoxes : boolean[] = availableBoxes;

            tempBoard[targetElemId].value = players[turn];
            tempAvailableBoxes[targetElemId] = false;

            setBoard(tempBoard);
            setAvailableBoxes(tempAvailableBoxes);
            setTurn(1 - turn);

            let result = CheckWinner(board);

            if(result){
                setWhatHappened(result);
                setRun(false);
                return;
            }
            else{
                setWhatHappened(`Turn: ${players[1 - turn]}`)
            }

        }
    }

    return(
        <div className="Board">
            {
                board.length !== 0 && board.map( box =>
                    <div key={ box.id } className="box" id={ `${box.id}` } onClick={cell=>handleClick(cell)}>
                        { box.value }
                    </div>
                ) 
            }
        </div>
    )
}

export default Board;