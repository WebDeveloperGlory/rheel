import './App.css'
import AppRoutes from './router/routes';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="md:ml-[260px] md:py-4 pt-14 py-2 flex flex-col w-full">
        <Navbar />
        <div className=''>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}



export default App
