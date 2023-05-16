import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'

function App() {

  return (
   <div className='max-w-screen-2xl md:px-10 px-0 lg:px-50 mx-auto'>
      <RouterProvider router={router}></RouterProvider>
   </div>
  )
}

export default App
