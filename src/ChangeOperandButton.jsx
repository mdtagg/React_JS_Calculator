import { ACTIONS } from './App'

function ChangeOperand({action,dispatch,className,id}) {

    //when the button is clicked the dispatch function is called which sends the props information 
    //to the reducer function in the app component 

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