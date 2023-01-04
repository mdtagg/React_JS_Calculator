import { useReducer } from 'react'
import './App.css'

function App() {

  return (
    <>
    <div className='calculator-container'>
      <div className='output'>
        <div className='operand'>1</div>
      </div>
      <button>AC</button>
      <button>+/-</button>
      <button>%</button>
      <button>÷</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>x</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button className='span-two'>0</button>
      <button>.</button>
      <button>=</button>
    </div>
    </>
    
  )
}

export default App
