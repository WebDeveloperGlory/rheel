import './App.css'
import AppRoutes from './router/routes';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AgentsDetail from './pages/AgentsDetail'

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="md:ml-[260px] flex flex-col w-full">
        <Navbar />
        <div className='py-[80px] md:py-[30px]'>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}



export default App
