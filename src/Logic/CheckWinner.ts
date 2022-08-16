import { BoxModel } from "../model"

const CheckWinner = (board : BoxModel[]) =>{
    let tempBoard : string[]  = [];
    let boardLength : number = Math.sqrt(board.length);

    board.forEach(box=>{
        tempBoard.push(box.value);
    })
    

    for(let i = 0; i < boardLength; i++){
        
        let same : any = false;

        for (let j = 1; j < boardLength; j++) {
            if(tempBoard[i * boardLength] !== tempBoard[(i * boardLength) + j]){
                same = tempBoard[i * boardLength];
                break;
            }
        }

        if(same){
            return `${same} winner`;
        }

        same = false;

        for (let j = 1; j < boardLength; j++) {
            if(tempBoard[i] !== tempBoard[i + (j * boardLength)]){
                same = tempBoard[i];
                break;
            }
        }

        if(same){
            return `${same} winner`;
        }
        
        
        
    }
    
    console.log(tempBoard);

    return false
}

export default CheckWinner