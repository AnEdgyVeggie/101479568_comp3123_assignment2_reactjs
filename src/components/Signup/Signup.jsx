import { useState } from "react"
import "./Signup.css"
import API_ADDRS from "../../constants"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate()

    const [ passwordsMatch, setPasswordsMatch ] = useState(false)


    const submitSignup = async (e) => {
        e.preventDefault()

        if (!passwordsMatch) {
            alert("Passwords do not match. Please check that they do before resubmitting.")
        }
        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value

        const postBody = createPostBody(username, email, password)
        
        try {
            await axios.post(`${API_ADDRS.DEPLOYED_USER}/signup`, 
                postBody
            ).then(response => {
                return navigate("/login")
            })
        } catch (error) {
            console.warn(error)
        }
    }

    const createPostBody = (username, email, password) => {
        return {
            username: username,
            email: email,
            password: password
        }
    }


    const confirmMatchingPassword = (e) => {
        const password = document.getElementById('signup-password').value
        const passwordConfirmation = document.getElementById('signup-password-confirm').value
        console.log(password)
        console.log(passwordConfirmation)
        if (password === "") return;  
        const nonMatchingError = document.getElementById("non-matching-error")
        nonMatchingError.style.color = "transparent";


        if (passwordConfirmation !== password) {
            setPasswordsMatch(false)
            nonMatchingError.style.color = "red";
        } else {
            setPasswordsMatch(true)
        }
    }


    return (
        <div id="signup">
            <nav>
                <Link to="/login">Login</Link>
                <span >Signup</span>
            </nav>
            <h2>Signup</h2>
            <form onSubmit={(e) => submitSignup(e)}>
                <div className="signup-field">
                    <label htmlFor="username" >Username:</label>
                    <input name="username" id="signup-username" type="text" required />
                </div>

                <div className="signup-field">
                    <label htmlFor="email" >Email:</label>
                    <input name="email" id="signup-email" type="email" />
                </div>

                <div className="signup-field">
                    <label htmlFor="password" >Password: </label>
                    <input name="password" id="signup-password" type="password" required
                    onChange={(e) => confirmMatchingPassword(e)}/> 
                </div>

                <div className="signup-field">
                    <label htmlFor="password-confirm" >Confirm Password: </label>
                    <input name="password-confirm" id="signup-password-confirm" type="password" required
                    onChange={(e) => confirmMatchingPassword(e)}/>
                    <p id="non-matching-error">Passwords do not match</p>
                </div>
                <div className="signup-field">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup