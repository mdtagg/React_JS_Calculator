import { ACTIONS } from './App'
import { useEffect,useRef } from 'react'

function DigitButton({digit,dispatch,className,id}) {
    
    //the keyPress button is set to the element button that was pressed
    const keyPress = useRef()
    const clickIt = () => keyPress.current.click()

    useEffect(() => {
        window.addEventListener('keypress', e => {
            if(e.key == digit) {
                keyPress.current.focus()
                clickIt()
            }
        })
    },[])

    return (
        <button 
            ref={keyPress}
            className={className}
            onClick={() => dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}
            id={id}
        >
            {digit}
        </button>
    )
    }

export default DigitButton