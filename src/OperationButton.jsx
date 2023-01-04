import { ACTIONS } from './App'

function ChooseOperation({operation,dispatch,className}) {
    return (
        <button 
        className={className}
        onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}
        >
            {operation}
        </button>
    )
    }

export default ChooseOperation