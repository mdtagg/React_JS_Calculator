import { ACTIONS } from './App'

function ChangeOperand({action,dispatch,className,id}) {

    return (
        <button 
            className={className}
            onClick={() => dispatch({type:ACTIONS.CHANGE_OPERAND,payload:{action}})}
            id={id}
        >
            {action}
        </button>
    )
    }

export default ChangeOperand