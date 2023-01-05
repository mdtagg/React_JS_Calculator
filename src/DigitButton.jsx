import { ACTIONS } from './App'

const getEventKey = (e) => {
    console.log(e.key)
  }

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