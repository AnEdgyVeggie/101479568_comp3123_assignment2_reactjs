import axios from "axios"
import "./Login.css"
import API_ADDRS from "../../constants"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const submitLogin = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        const postBody = createPostBody(email, password)

        try {
            await axios.post(`${API_ADDRS.DEPLOYED_USER}/login`,
                postBody
            ).then(res => {
                if (handleResponse(res.data, email)) {
                    navigate("/")
                }
            })
        } catch (e) {
            console.log(e)
        }

    }

    const handleResponse = (data, email) => {
        const errorDisplay = document.getElementById("login-error")
        if (data.status === 404) {
            errorDisplay.innerHTML = data.message
            errorDisplay.style.color = "red"
        } else if (data.status === 200) {
            errorDisplay.innerHTML = data.message
            errorDisplay.style.color = "green"

            localStorage.setItem("token", data.message.token)
            localStorage.setItem("email", email)
            return true
        } else {
            errorDisplay.innerHTML = "An error has occurred. Please try your request again later"
            errorDisplay.style.color = "red"
        }
        return false

    }


    const createPostBody = (email, password) => {
        return {
            email: email,
            password: password
        }
    }


    return (
        <div id="login">
            <nav>
                <span >Login</span>
                <Link to="/signup">Signup</Link>
            </nav>
            <h2>Login</h2>
            <form onSubmit={e => submitLogin(e)}>
                <div className="login-field">
                    <label htmlFor="email" >Email:</label>
                    <input name="email" id="login-email" type="text" />
                </div>

                <div className="login-field">
                    <label htmlFor="password" >Password: </label>
                    <input name="password" id="login-password" type="password" /> 
                </div>

                <div className="login-field">
                    <button>Submit</button>
                </div>
            </form>
            <p id="login-error"></p>
            
        </div>
    )
}

export default Login