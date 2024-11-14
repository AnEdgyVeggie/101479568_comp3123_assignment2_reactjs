import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./UpdateEmployee.css"
import API_ADDRS from "../../../constants"
import { useEffect, useState } from "react"
import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"

const UpdateEmployee =  () => {
    
    const navigate = useNavigate()
    const empId = useParams()

    const [ employee, setEmployee ] = useState(null)
    
    useEffect(() => {
        fetchEmployeeInfo()
    })

    const fetchEmployeeInfo = async () => {
        try {
            await axios.get(`${API_ADDRS.DEPLOYED_EMP}/${empId.empId}`)
            .then(res => {
                setEmployee(res.data)
            })
        } catch (e) {
            console.warn(e)
        }
    }


    const submitEmployeeUpdate = async (e) => {
        e.preventDefault()
        const firstName = e.target[0].value
        const lastName = e.target[1].value
        const email = e.target[2].value
        const position = e.target[3].value
        const salary = e.target[4].value
        const department = e.target[5].value

        const postbody = createPostBody(firstName, lastName, email, position, salary, department)

        try {
            await axios.put(`${API_ADDRS.DEPLOYED_EMP}/${empId.empId}`,
                postbody
            )
            .then(res => {
                setEmployee(res.data)
                console.log(res.data)
            })
        } catch (e) {
            console.warn(e)
        }

        alert(`Employee ${firstName} ${lastName} updated successfully`)
        navigate(-1)
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


    if (employee === null) {
        return(
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }

    return (
        
        <div id="update-employees">
            <Header pageTitle={"Update Employee Details"} />
            <div id="employee-update-section">
            <h3>Employee: {employee.first_name} {employee.last_name}</h3>

                <form  onSubmit={e => submitEmployeeUpdate(e)}>
                        <div className="update-emp-field">
                            <label htmlFor="update-emp-first-name">First Name:</label>
                            <input type="text" id="update-emp-first-name" name="update-emp-first-name" 
                            defaultValue={employee.first_name}/>
                        </div>

                        <div className="update-emp-field">
                            <label htmlFor="update-emp-last-name">Last Name:</label>
                            <input type="text" id="update-emp-last-name" name="update-emp-last-name" 
                            defaultValue={employee.last_name}/>
                        </div>

                        <div className="update-emp-field">
                            <label htmlFor="update-emp-email">Email:</label>
                            <input type="text" id="adupdated-emp-email" name="update-emp-email" 
                            defaultValue={employee.email}/>
                        </div>

                        <div className="update-emp-field">
                            <label htmlFor="update-emp-position">Position:</label>
                            <input type="text" id="update-emp-position" name="update-emp-position" 
                            defaultValue={employee.position}/>
                        </div>

                        <div className="update-emp-field">
                            <label htmlFor="update-emp-salary">Salary:</label>
                            <input type="text" id="update-emp-salary" name="update-emp-salary" 
                            defaultValue={employee.salary}/>
                        </div>

                        <div className="update-emp-field">
                            <label htmlFor="update-emp-department">Department:</label>
                            <input type="text" id="update-emp-department" name="update-emp-department" 
                            defaultValue={employee.department}/>
                        </div>

                        <div id="update-emp-buttons">
                            <button>Update Employee</button>
                            <button onClick={() =>  navigate("/employees/list")}>Cancel</button>
                        </div>
                    </form>
                </div>
                <Footer />
        </div>
    )
}

export default UpdateEmployee