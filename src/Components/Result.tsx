import { FC } from 'react';
import './Components.css';

interface props{
    whatHappened: string
}

const Result :FC <props> = ({whatHappened}) => {
    return(
        <div className="Result">
            {whatHappened}
        </div>
    )
}

export default Result;