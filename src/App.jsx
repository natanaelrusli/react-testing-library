import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Index'
import Signup from './pages/Signup/Index'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Signup />
      )
    },
    {
      path: '/login',
      element: (
        <Login />
      )
    }
  ])
  return (
    <div className="container my-5">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
