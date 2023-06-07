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
      
      if(state.operand == null && payload.digit === '.') {
        return {
          ...state,
          operand: `0.`
        }
      }

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
      
      if(state.overwrite || state.operand === 'Error') {
        return {
          ...state,
          previousOperand: state.operand,
          operand: `${payload.digit}`,
          overwrite:false
        }
      }

      if(payload.digit === '.' && state.operand.includes('.') ||
         state.operand !== undefined && state.operand.length === 9 ||
         state.operand === '0' && payload.digit === '0') {
        return state
      }

      return {
        ...state,
        operand: `${state.operand || ''}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:

      if(state.previousOperand != null && state.operand != null) {
        return {
          ...state,
          overwrite:true,
          operand: evaluate(state),
          operation: payload.operation,
          previousOperand: null
        }
      }

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

      return {
        ...state,
        overwrite:true,
        operation: payload.operation
      }
    case ACTIONS.CHANGE_OPERAND:

      if(payload.action === 'AC') {
        return {}
      }

      return {
        ...state,
        operand: changeOperand(state,payload.action)
      }

    case ACTIONS.EVALUATE:

      if(state.operand == null ||
        state.previousOperand == null ||
        state.operation == null) {
          return state
        }

      return {
        ...state,
        operand: evaluate(state),
        previousOperand: null,
        operation:null
      }
  }
}

function changeOperand({operand},payload) {
  let newOperand = parseFloat(operand)
  switch(payload) {
    case '+/-':
      return (newOperand * -1).toString()
    case '%':
      return (newOperand * .01).toString()
  }
}

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
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{operand='0'},dispatch] = useReducer(reducer,{})

  const keyPress = useRef()
  const clickIt = () => keyPress.current.click()

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if(e.key === 'Enter') {
        keyPress.current.focus()
        clickIt()
      }
    })
  },[])

  const formattedOperand = formatOperand(operand)

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
