import { useReducer,useEffect,useRef } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import ChangeOperandButton from './ChangeOperandButton'
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CHANGE_OPERAND: 'change-operand',
  EVALUATE: 'evaluate',
}

function reducer(state,{type,payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      
      //operand is changed to 0. if user inputs a decimal number without a leading integer
      if(state.operand == null && payload.digit === '.') {
        return {
          ...state,
          operand: `0.`
        }
      }

      //if negative is true on the state then the operand is 
      //turned to a negative
      if(state.negative) {
        console.log(state)
        let newOperand = parseInt(state.operand) * -1
        newOperand = newOperand.toString()
        return {
          ...state,
          previousOperand:state.operand,
          operand:newOperand,
          negative:false,
        }
      }
      
      //overwrites purpose is to update the operand state to the first digit pressed after a calculation has been executed
      //if a number is divided by 0 the operand will be 'error' after the calculation
      if(state.overwrite || state.operand === 'Error') {
        return {
          ...state,
          previousOperand: state.operand,
          operand: `${payload.digit}`,
          overwrite:false
        }
      }
      //if user attempts to place a second decimal after a decimal has been placed no change to state
      //if user attempts to input a digit that would make the number larger than 9 places no change to state
      //if user attempts to input multiple zeros if no other digit has been input no change to state 
      if(payload.digit === '.' && state.operand.includes('.') ||
         state.operand !== undefined && state.operand.length === 9 ||
         state.operand === '0' && payload.digit === '0') {
        return state
      }
      //if none of the edge cases above are triggered then the operand state is updated to the operand state so far concatenated with 
      //the digit payload of the digit button that was pressed 
      return {
        ...state,
        operand: `${state.operand || ''}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      //if chaining operations, operand state is updated to the calculation of the previous and current operand, overwrite is updated to
      //to true so that the next digit updates the operand to next digit pressed, operation is updated to the next operation in the 
      //chain and previous operand is reset to null
      if(state.previousOperand != null && state.operand != null) {
        return {
          ...state,
          overwrite:true,
          operand: evaluate(state),
          operation: payload.operation,
          previousOperand: null
        }
      }
      // if - is pressed after an operation has already been pressed
      //negative true is added to state
      if(payload.operation !== '-' && state.operation !== '-') {
        return {
          ...state,
          overwrite:true,
          operation:payload.operation,
          negative:false
        }
      }

      if(payload.operation === '-' && (state.operation !== "-" && state.operation !== undefined)) {
        return {
          ...state,
          overwrite:false,
          operation:state.operation,
          negative:true
        }
      }
      //if operations are not chained, the equals button is pressed and then an operation button is pressed before a digit is input then \
      //overwrite is updated to true and the operation state is updated to the next operation button that was pressed 
      return {
        ...state,
        overwrite:true,
        operation: payload.operation
      }
    case ACTIONS.CHANGE_OPERAND:
      //if all clear is pressed return an empty state 
      if(payload.action === 'AC') {
        return {}
      }
      //if the pos/neg button or the percentage button is pressed the operand state is evaluated with the changeOperand function 
      return {
        ...state,
        operand: changeOperand(state,payload.action)
      }
    case ACTIONS.EVALUATE:
      //if any of the information needed for a calculation is not present in state then no change to state
      if(state.operand == null ||
        state.previousOperand == null ||
        state.operation == null) {
          return state
        }
      //if all information need for calculation is present update the operand to the result of the calculation 
      return {
        ...state,
        operand: evaluate(state),
        previousOperand: null,
        operation:null
      }
  }
}
//changes operand to either switch to positive or negative value or change to a percentage
function changeOperand({operand},payload) {
  let newOperand = parseFloat(operand)
  switch(payload) {
    case '+/-':
      return (newOperand * -1).toString()
    case '%':
      return (newOperand * .01).toString()
  }
}

//calculates the full operation and fixes the result to 9 places or 2 depending on size 
function evaluate({operand,previousOperand,operation}) {
  let prev = parseFloat(previousOperand)
  let currentOperand = parseFloat(operand)
  if(isNaN(prev) || isNaN(currentOperand)) return ''
  if(currentOperand === 0 && operation === '÷') {
    return 'Error'
  }
  let result = 0
  switch(operation) {
    case '÷':
      result = prev / currentOperand
      break
    case '+':
      result = prev + currentOperand
      break
    case '-':
      result = prev - currentOperand
      break
    case 'x':
      result = prev * currentOperand
      if(previousOperand == .1 || currentOperand == .1) {
        result = result.toFixed(2)
      }
      break
  }
  //if result is greater than 9 places return exponent notation of result 
  if(result.toString().length > 9 && !result.toString().includes('.')) {
    return result.toExponential(6).toString()
  } 
  return result.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits:0
})

function formatOperand(operand) {
  if(operand === 'Error') return 'Error'
  if(operand == null) return 
  let [integer,decimal] = operand.split('.')
  //if there is no decimal format the integer 
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{operand='0'},dispatch] = useReducer(reducer,{})

  //the useRef and useEffect are used to add num pad support to the calculator app
  //key press is set to the equals button element
  const keyPress = useRef()
  const clickIt = () => keyPress.current.click()

  //useEffect is used to add an event listener after the page has been rendered 
  useEffect(() => {
    window.addEventListener('keydown', e => {
      //if the enter key is pressed the event listener will focus on the equals button and run the clickIt function which will 
      //programmatically call the dispatch function which will update the operand state and display the calculation
      if(e.key === 'Enter') {
        keyPress.current.focus()
        clickIt()
      }
    })
  },[])

  const formattedOperand = formatOperand(operand)

  //className, action and dispatch are passed down to their respective components 

  return (
    <>
    <div className='calculator-container'>
      <div id="display" className='output'>
        <div className='operand'>{formattedOperand}</div>
      </div>
      <ChangeOperandButton className='light-gray' id="clear" action='AC' dispatch={dispatch} />
      <ChangeOperandButton className='light-gray' action='+/-' dispatch={dispatch} />
      <ChangeOperandButton className='light-gray' action='%' dispatch={dispatch} />
      <OperationButton className='orange' id="divide" operation='÷' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="seven" digit='7' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="eight" digit='8' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="nine" digit='9' dispatch={dispatch} />
      <OperationButton className='orange' id="multiply" operation='x' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="four" digit='4' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="five" digit='5' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="six" digit='6' dispatch={dispatch} />
      <OperationButton className='orange' id="subtract" operation='-' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="one" digit='1' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="two" digit='2' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="three" digit="3" dispatch={dispatch} />
      <OperationButton className='orange' id="add" operation='+' dispatch={dispatch} />
      <DigitButton className='span-two dark-gray' id="zero" digit='0' dispatch={dispatch} />
      <DigitButton className='dark-gray' id="decimal" digit='.' dispatch={dispatch} />
      <button id="equals" ref={keyPress} className='orange' onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
    </>
    
  )
}

export default App
