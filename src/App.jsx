import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import ImgBox from './components/ImgBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImgBox />
    </>
  )
}

export default App
