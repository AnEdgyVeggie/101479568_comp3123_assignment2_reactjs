import Header from "../../Header/Header"
import axios from "axios"
import "./AddEmployee.css"
import { useNavigate } from "react-router-dom"
import API_ADDRS from "../../../constants"
import Footer from "../../Footer/Footer"

const AddEmployee = () => {

    const navigate = useNavigate()

    const submitEmployee = async (e) => {
        e.preventDefault()
        const firstName = e.target[0].value
        const lastName = e.target[1].value
        const email = e.target[2].value
        const position = e.target[3].value
        const salary = e.target[4].value
        const department = e.target[5].value

        const postbody = createPostBody(firstName, lastName, email, position, salary, department)

        console.log(postbody)

        try{
            await axios.post(`${API_ADDRS.DEPLOYED_EMP}`, postbody)
            .then(res => {
                // console.log(res.data.message)
            })
        } catch (e) {
            console.warn(e)
        }

        alert(`${firstName} ${lastName} has been added as an employee.`)
        returnToList()

    }

    const createPostBody = (firstName, lastName, email, position, salary, department) => {
        return {
            first_name: firstName,
            last_name: lastName,
            email: email,
            position: position, 
            salary: parseInt(salary), 
            department: department
        }

    }

    const returnToList = () => {
        navigate("/employees/list")
    }



    return (
        <div id="add-employee">
            <Header pageTitle={"Add an Employee"}/>
            <div id="employee-details">
                <h3>Enter Employee Details</h3>

                <form  onSubmit={e => submitEmployee(e)}>
                    <div className="add-emp-field">
                        <label htmlFor="add-emp-first-name">First Name:</label>
                        <input type="text" id="add-emp-first-name" name="add-emp-first-name" required/>
                    </div>

                    <div className="add-emp-field">
                        <label htmlFor="add-emp-last-name">Last Name:</label>
                        <input type="text" id="add-emp-last-name" name="add-emp-last-name" required/>
                    </div>

                    <div className="add-emp-field">
                        <label htmlFor="add-emp-email">Email:</label>
                        <input type="text" id="add-emp-email" name="add-emp-email" required/>
                    </div>

                    <div className="add-emp-field">
                        <label htmlFor="add-emp-position">Position:</label>
                        <input type="text" id="add-emp-position" name="add-emp-position" required/>
                    </div>

                    <div className="add-emp-field">
                        <label htmlFor="add-emp-salary">Salary:</label>
                        <input type="text" id="add-emp-salary" name="add-emp-salary" required/>
                    </div>

                    <div className="add-emp-field">
                        <label htmlFor="add-emp-department">Department:</label>
                        <input type="text" id="add-emp-department" name="add-emp-department" required/>
                    </div>

                    <div id="add-emp-buttons">
                        <button>Add Employee</button>
                        <button onClick={returnToList}>Cancel</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default AddEmployee