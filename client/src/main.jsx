import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './store/store.js'
import PatientLogin from "./authentication/PatientLogin.jsx";
import HomePage from './home/HomePage.jsx';

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
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
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
