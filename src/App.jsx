import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Body from './Components/Body/Body'
import Header from './Components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Body />
      <ToastContainer theme='dark' />
    </>
  )
}

export default App
