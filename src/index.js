import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import ListEmployee from './components/EmployeeComponents/ListEmployees/ListEmployee';
import AddEmployee from './components/EmployeeComponents/AddEmployee/AddEmployee';
import ViewEmployee from './components/EmployeeComponents/ViewEmployee/ViewEmployee';
import UpdateEmployee from './components/EmployeeComponents/UpdateEmployee/UpdateEmployee';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "signup",
    element: <Signup />
  },
  {
    path: "employees/list",
    element: <ListEmployee />
  },
  {
    path: "employees/add",
    element: <AddEmployee />
  },
  {
    path: "employees/view/:empId",
    element: <ViewEmployee />
  },
  {
    path: "employees/update/:empId",
    element: <UpdateEmployee />
  },

])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);