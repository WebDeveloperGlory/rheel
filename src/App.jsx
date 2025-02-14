import './App.css'
import { useEffect, useState } from 'react';
import AppRoutes from './router/routes';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom';


function App() {
  const location = useLocation();
  const hiddenClass = location.pathname === '/login' ? 'md:ml-0 py-0' : 'md:ml-[260px] pt-14 py-2 md:py-4';
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

      if (!token) {
          navigate("/login", { replace: true });
      }

      setIsCheckingAuth(false);
  }, [navigate]);

  if (isCheckingAuth) return null; // Prevents redirect loop on first render

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
