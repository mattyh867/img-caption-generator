import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImgBox from './components/ImgBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <ImgBox />
    </div>
    </>
  )
}

export default App
