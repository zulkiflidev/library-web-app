import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';



function App() {
  return (

    <RouterProvider router={router} />  

      

    // <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
    //   <h1 className="text-4xl font-black text-indigo-400 tracking-tight">
    //     Tailwind v4 Fresh Install Berhasil! 🚀
    //   </h1>
    // </div>
    
  )
}

export default App