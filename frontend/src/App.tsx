
import { Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Dashboard";
import { DashboardLayout } from "./layouts";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <div>Error Page</div>,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard/",
          element: <Home />,
        },
      ]
    }
  ]);
  

  return (
    <div className="container w-[100vw] h-[100vh]">
      <Suspense fallback={<div>Loading</div>}>
        <RouterProvider router={router} fallbackElement={<div>Fall back Element</div>} />
      </Suspense>
        
        
      
    </div>
  )
}

export default App;
