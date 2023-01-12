import { ACTIONS } from './App'
import { useRef,useEffect } from 'react'

function OperationButton({operation,dispatch,className}) {
//the keyPress button is set to the element button that was pressed
const keyPress = useRef()
const clickIt = () => keyPress.current.click()

useEffect(() => {
    window.addEventListener('keypress', e => {
        if(e.key === '*' && operation === 'x' ||
           e.key === '/' && operation === '÷' ||
           e.key === operation) {
            keyPress.current.focus()
            clickIt()
        }
    })
},[])

    //when the button is clicked the dispatch function is called which sends the props information 
    //to the reducer function in the app component 
    
    return (
        <button 
        ref={keyPress}
        className={className}
        onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}
        >
            {operation}
        </button>
    )
    }

export default OperationButton