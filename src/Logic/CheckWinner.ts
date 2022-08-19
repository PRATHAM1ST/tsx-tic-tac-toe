import { BoxModel } from "../model"

function diagonals(arr : string[], h : number, w : number, n : number) {
    var nRow = Math.floor(n / w);
    var nCol = n % w;
  
    let LTR = [];
    for (let r = nRow - Math.min(nRow, nCol), c = nCol - Math.min(nRow, nCol); r < h && c < w; r++, c++) LTR.push(arr[r * w + c]);
  
    let RTL = [];
    for (let r = nRow - Math.min(nRow, w - nCol - 1), c = nCol + Math.min(nRow, w - nCol - 1); r < h && 0 <= c; r++, c--) RTL.push(arr[r * w + c]);
  
    return [LTR, RTL];
}

const allEqual = (arr : any) => arr.every((val : any) => val === arr[0]);


const CheckWinner = (board : BoxModel[]) =>{
    let tempBoard : string[]  = [];
    let boardLength : number = Math.sqrt(board.length);

    board.forEach(box=>{
        tempBoard.push(box.value);
    })
    

    for(let i = 0; i < boardLength; i++){
        
        let notSame : boolean = true;
        
        // horizontal
        for (let j = 1; j < boardLength; j++) {
            if(tempBoard[i * boardLength] !== tempBoard[(i * boardLength) + j] || tempBoard[i * boardLength] === ''){
                notSame = false;
                break;
            }
        }

        if(notSame){
            return tempBoard[i * boardLength];
        }


        // vertical
        notSame = true;

        for (let j = 1; j < boardLength; j++) {
            if(tempBoard[i] !== tempBoard[i + (j * boardLength)] || tempBoard[i] === ''){
                notSame = false;
                break;
            }
        }

        if(notSame){
            return tempBoard[i];
        }

        // diagonals
        for (let j = 0; j < boardLength; j++) {
            let diagonal : string = '';
    
            diagonals(tempBoard, boardLength, boardLength, j).forEach(e=>{
                if(e.length === boardLength && allEqual(e) && e[0] !== ''){diagonal = e[0]}
            })
    
            if(diagonal){
                return diagonal;
            }
        }

        //tie
        if(!tempBoard.includes('')){
            return 'Tie'
        }
        
    }
    
    return ''
}

export default CheckWinner