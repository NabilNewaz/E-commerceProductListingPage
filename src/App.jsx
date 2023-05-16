import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'

function App() {

  return (
   <div className='max-w-screen-2xl md:px-10 px-1 lg:px-0 mx-auto'>
      <RouterProvider router={router}></RouterProvider>
   </div>
  )
}

export default App
