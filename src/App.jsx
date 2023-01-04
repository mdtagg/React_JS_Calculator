import { useReducer } from 'react'
import './App.css'

function App() {

  return (
    <>
    <div className='calculator-container'>
      <div className='output'>
        <div className='operand'>1</div>
      </div>
      <button className='light-gray'>AC</button>
      <button className='light-gray'>+/-</button>
      <button className='light-gray'>%</button>
      <button className='orange'>÷</button>
      <button className='dark-gray'>7</button>
      <button className='dark-gray'>8</button>
      <button className='dark-gray'>9</button>
      <button className='orange'>x</button>
      <button className='dark-gray'>4</button>
      <button className='dark-gray'>5</button>
      <button className='dark-gray'>6</button>
      <button className='orange'>-</button>
      <button className='dark-gray'>1</button>
      <button className='dark-gray'>2</button>
      <button className='dark-gray'>3</button>
      <button className='orange'>+</button>
      <button className='span-two dark-gray'>0</button>
      <button className='dark-gray'>.</button>
      <button className='orange'>=</button>
    </div>
    </>
    
  )
}

export default App
