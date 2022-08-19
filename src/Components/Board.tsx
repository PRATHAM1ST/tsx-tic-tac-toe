import { BoxModel } from '../model';
import './Components.css';
import { FC } from 'react';
import CheckWinner from '../Logic/CheckWinner';
import Ai from '../Logic/Ai';

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


    const printWinner = ()=>{
        let result = CheckWinner(board);
    
        if(result){
            switch (result){
                case 'Tie':
                    setWhatHappened('Tie');
                    break;
                default:
                    setWhatHappened(result + " Winner");
                    break;
            }
            setRun(false)
        }
        else{
            return
        }
    }

    
    const handleClick = async (targetElem: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        
        const targetElemId = parseInt(targetElem.currentTarget.id)
        
        
        if(availableBoxes[targetElemId] && run){
            let tempBoard : BoxModel[] = board;
            let tempAvailableBoxes : boolean[] = availableBoxes;

            tempBoard[targetElemId].value = 'O';
            tempAvailableBoxes[targetElemId] = false;
            
            printWinner();

            const AiMove : number = Ai(board);

            tempBoard[AiMove].value = 'X';
            tempAvailableBoxes[AiMove] = false; 

            printWinner();
            
            setBoard(tempBoard);
            setAvailableBoxes(tempAvailableBoxes);
            console.table(tempBoard, ['value'])
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