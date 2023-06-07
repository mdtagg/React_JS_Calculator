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

    //when the button is clicked the dispatch function is called which sends the props information 
    //to the reducer function in the app component 
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