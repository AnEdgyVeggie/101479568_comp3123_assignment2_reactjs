import { useEffect } from "react";
import "./assets/styles/global-styling.css"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useNavigate } from "react-router-dom"
import "./App.css"
import API_ADDRS from "./constants"
import axios from "axios"

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    checkToken()
  })


  const checkToken = async () => {

    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    if (token === null || email === null)  {
      redirectToLogin()
      return
    }
    try {
      await axios.get(`${API_ADDRS.DEPLOYED_USER}/token/${email}`)
      .then(res => {
        // if the token in the response doesnt match the token in local storage, login is not persisted
        if (res.data.message !== token) {
          redirectToLogin()
        }
      })
    } catch (e) {
      console.warn(e)
    }

  }

  const redirectToLogin = () => {
    navigate("/login")
  }
 
  return (
    <div className="App">
      <Header pageTitle={"Home"} />
      <div>
        <h3>Welcome back,</h3>
        <p>Please click 'Employees List' to view all Employee options.</p>
      </div>
      <Footer  />
  </div>
  );


}

export default App;


