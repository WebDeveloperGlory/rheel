import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routes from './router/routes'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gray-50 text-black">
        <Navbar />

        <div className="mt-16 w-full">
          <Routes />
        </div>
      </div>
    </>
  )
}

export default App
