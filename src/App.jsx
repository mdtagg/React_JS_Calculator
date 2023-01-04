import { useReducer } from 'react'
import DigitButton from './DigitButton'
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit'
}

function reducer(state,{type,payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        operand: `${state.operand || ''}${payload.digit}`
      }
  }
}

function App() {

  const [{operand,operation},dispatch] = useReducer(reducer,{})

  return (
    <>
    <div className='calculator-container'>
      <div className='output'>
        <div className='operand'>{operand}</div>
      </div>
      <button className='light-gray'>AC</button>
      <button className='light-gray'>+/-</button>
      <button className='light-gray'>%</button>
      <button className='orange'>÷</button>
      <DigitButton className='dark-gray' digit='7' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='8' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='9' dispatch={dispatch} />
      <button className='orange'>x</button>
      <DigitButton className='dark-gray' digit='4' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='5' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='6' dispatch={dispatch} />
      <button className='orange'>-</button>
      <DigitButton className='dark-gray' digit='1' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='2' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='3' dispatch={dispatch} />
      <button className='orange'>+</button>
      <DigitButton className='span-two dark-gray' digit='0' dispatch={dispatch} />
      <DigitButton className='dark-gray' digit='.' dispatch={dispatch} />
      <button className='orange'>=</button>
    </div>
    </>
    
  )
}

export default App
