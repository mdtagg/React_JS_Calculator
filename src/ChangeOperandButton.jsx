import { ACTIONS } from './App'

function ChangeOperand({action,dispatch,className}) {
    return (
        <button 
        className={className}
        onClick={() => dispatch({type:ACTIONS.CHANGE_OPERAND,payload:{action}})}
        >
            {action}
        </button>
    )
    }

export default ChangeOperand