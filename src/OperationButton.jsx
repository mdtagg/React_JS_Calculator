import { ACTIONS } from './App'
import { useRef,useEffect } from 'react'

function OperationButton({operation,dispatch,className,id}) {
    
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

    return (
        <button 
            ref={keyPress}
            className={className}
            onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}
            id={id}
        >
            {operation}
        </button>
    )
}

export default OperationButton