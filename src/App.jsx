import { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
  ALL_CLEAR: 'all-clear'
}

function reducer(state,{type,payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          previousOperand: state.operand,
          operand: `${payload.digit}`,
          overwrite:false
        }
      }
      return {
        ...state,
        operand: `${state.operand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        overwrite:true,
        operation: payload.operation
      }
    case ACTIONS.EVALUATE:
      return {
        ...state,
        operand: evaluate(state),
        previousOperand: null,
        operation:null
      }
    case ACTIONS.ALL_CLEAR:
      return {}
  }
}

function evaluate({operand,previousOperand,operation}) {
  console.log([previousOperand,operand,operation])
  let prev = parseFloat(previousOperand)
  let currentOperand = parseFloat(operand)
  let result = ''
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
      break
  }
  return result.toString()
}

function App() {

  const [{operand,previousOperand,operation},dispatch] = useReducer(reducer,{})

  return (
    <>
    <div className='calculator-container'>
      <div className='output'>
        <div className='operand'>{operand}</div>
      </div>
      <button className='light-gray' onClick={() => dispatch({type:ACTIONS.ALL_CLEAR})}>AC</button>
      <button className='light-gray'>+/-</button>
      <button className='light-gray'>%</button>
      <OperationButton className='orange' operation='÷' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='7' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='8' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='9' dispatch={dispatch} />
      <OperationButton className='orange' operation='x' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='4' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='5' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='6' dispatch={dispatch} />
      <OperationButton className='orange' operation='-' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='1' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='2' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='3' dispatch={dispatch} />
      <OperationButton className='orange' operation='+' dispatch={dispatch} />
      <DigitButton className='span-two dark-gray' digit='0' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='.' dispatch={dispatch} />
      <button className='orange' onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
    </>
    
  )
}

export default App
