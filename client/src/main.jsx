import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './store/store.js'
import PatientLogin from "./authentication/patient/PatientLogin.jsx";
import HomePage from './home/HomePage.jsx';
import PatientRegistration from './authentication/patient/PatientRegistration.jsx';
import HospitalRegistration from './authentication/hospital/HospitalRegistration.jsx';
import HospitalLogin from './authentication/hospital/HospitalLogin.jsx';
import HospitalDashBoard from './dashboards/HospitalDashBoard.jsx';
import PatientDashBoard from './dashboards/PatientDashBoard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <HomePage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/patient-login",
    element: <PatientLogin />,
  },
 {
      path: "/patient-register",
     element: <PatientRegistration/>,
  },
  {
    path:"/hospital-login",
    element:<HospitalLogin/>
  },
  {
     path:"/hospital-register",
     element:<HospitalRegistration/>
  },
  {
    path:"/patient-dashboard",
    element:<PatientDashBoard/>
  },
  {
    path:"/hospital-dashboard",
    element:<HospitalDashBoard/>
  }
//   {
//     path: "/user-profile",
//     element: <UserProfile />,
//   },
]);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
)
