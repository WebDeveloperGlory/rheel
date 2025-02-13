import './App.css'
import AppRoutes from './router/routes';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SignInPage from './pages/SignIn';
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const hiddenClass = location.pathname === '/login' ? 'md:ml-0 py-0' : 'md:ml-[260px] pt-14 py-2 md:py-4';
  return (
    <div className="flex ">
      <Sidebar />
      <div className={`flex flex-col w-full ${ hiddenClass }`}>
        <Navbar />
        <div className=''>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}



export default App
