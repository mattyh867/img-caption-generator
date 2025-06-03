import { useState } from 'react'
import ImgBox from './components/ImgBox'
import CaptionBox from './components/CaptionBox'
import './css/App.css'

function App() {
  const [imageFile, setImageFile] = useState(null);

  return (
    <>
      <ImgBox setImageFile={setImageFile} />
      <CaptionBox imageFile={imageFile} />
    </>
  )
}

export default App
