import { ACTIONS } from './App'

function DigitButton({digit,dispatch,className}) {
    return (
        <button 
        className={className}
        onClick={() => dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}
        >
            {digit}
        </button>
    )
    }

export default DigitButton