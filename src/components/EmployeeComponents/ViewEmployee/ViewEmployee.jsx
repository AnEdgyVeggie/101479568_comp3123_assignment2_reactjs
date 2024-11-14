import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./ViewEmployee.css"
import API_ADDRS from "../../../constants"
import { useEffect, useState } from "react"
import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"

const ViewEmployee =  () => {

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

    const getLastUpdated = (lastUpdated) => {
        if (lastUpdated === null) return "N/A"
        return new Date(employee.updated_at).toLocaleDateString()
    }

    if (employee === null) {
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <div id="view-employee">
            <Header pageTitle={"View Employee Details"}  />
            <div id="employee-display-section" >
                <h3>Employee: {employee.first_name} {employee.last_name}</h3>
                <table id="employee-info">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{employee._id}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{employee.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{employee.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{employee.email}</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            <td>{employee.position}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{employee.department}</td>
                        </tr>
                        <tr>
                            <td>Salary</td>
                            <td>{employee.salary}</td>
                        </tr>
                        <tr>
                            <td>Date of Joining</td>
                            <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Created At</td>
                            <td>{new Date(employee.created_at).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Last Updated At</td>
                            <td>{getLastUpdated(employee.updated_at)}</td>
                        </tr>

                    </tbody>
                </table>
                <button onClick={() => navigate(-1)} >Return to List</button>
            </div>
            <Footer />
        </div>
    )
}

export default ViewEmployee