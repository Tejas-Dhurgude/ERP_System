
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import {
  createBrowserRouter,
  RouterProvider,Route,Link,Outlet
} from "react-router-dom"
import Purchasing from './pages/Purchasing/Purchasing';


function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Purchasing/>,
        },
        
        
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
