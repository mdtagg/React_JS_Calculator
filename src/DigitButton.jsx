import { ACTIONS } from './App'
import { useEffect,useRef } from 'react'

function DigitButton({digit,dispatch,className}) {

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
        >
            {digit}
        </button>
    )
    }

export default DigitButton