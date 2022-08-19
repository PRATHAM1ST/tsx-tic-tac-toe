import { BoxModel } from "../model"
import CheckWinner from "./CheckWinner";

const Ai = (board : BoxModel[])=>{
    let bestMove = -Infinity;
    let move = 0;
    for(let i = 0; i < 9; i++){
        if (board[i].value === ""){
            board[i].value = "X";
            const score = minmax(board, 0, true, Infinity, -Infinity);
            board[i].value = "";
            if (score > bestMove){
                bestMove = score;
                move = i;
            }
        }
    }
    return move
}

const values : any = {
    X : 1,
    O : -1,
    Tie: 0
}

const minmax = (board : BoxModel[], depth : number, maxValue : boolean, alpha : number, beta : number) =>{
    const result : string = CheckWinner(board)
    if (result){
        return values[result]
    }

    if (maxValue){
        let bestScore = -Infinity;
        for(let i = 0; i < 9; i++){
            if (board[i].value === ""){
                board[i].value = "O";
                const score = minmax(board, depth + 1, false, alpha, beta);
                board[i].value = "";
                bestScore = score > bestScore ? score : bestScore;
                alpha = alpha < score ? score : alpha;
                if(beta < alpha){
                    break;
                }
            }
        }
        return bestScore
    }

    else{
        let bestScore = Infinity;
        for(let i = 0; i < 9; i++){
            if (board[i].value === ""){
                board[i].value = "X";
                const score = minmax(board, depth + 1, true, alpha, beta);
                board[i].value = "";
                bestScore = score < bestScore ? score : bestScore;
                beta = beta > score ? score : beta; 
                if(beta < alpha){
                    break;
                }
            }
        }
        return bestScore
    }
}

export default Ai