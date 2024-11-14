import axios from "axios"
import "./ListEmployee.css"
import API_ADDRS from "../../../constants"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"

const ListEmployee = () => {

    const navigate = useNavigate()

    const [ employees, setEmployees ] = useState(null)
    const [ searchedEmployees, setSearchedEmployees ] = useState(null)

    useEffect(() => {
        if (employees === null) fetchEmployees()
    }, [employees])

    const fetchEmployees = async () => {
        try {
            await axios.get(`${API_ADDRS.DEPLOYED_EMP}`)
            .then(res => {
                setEmployees(res.data)
            })
        } catch (e) {
            console.log(e)
        }

    }

    const generateEmployeesTable = () => {
        if (employees === null) return
        const employeeRows = []
        employees.forEach(employee => {
            employeeRows.push(
                <tr key={employee._id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    {generateEmployeeButtons(employee._id)}
                </tr>
            )
        })

        return (
            <table id="employees-list-table">
                <thead>
                    <tr key={"headings"}>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeRows}
                </tbody>
            </table>
        )
    }

    const generateEmployeeButtons = (empId) => {

        return (
            <td className="button-row">
                <button onClick={() => updateEmployee(empId)}>Update</button>
                <button onClick={() => deleteEmployee(empId)} >Delete</button>
                <button onClick={() => viewEmployee(empId)}>View</button>
            </td>
        )
    }

    const deleteEmployee = async (empId) => {
        try{
            await axios.delete(`${API_ADDRS.DEPLOYED_EMP}/${empId}`)
            .then(res => {
                alert(res.data.message)
                setEmployees(null)
            })
        } catch (e) {
            console.warn(e)
        }
    }

    const updateEmployee = (empId) => {
        navigate("/employees/update/" + empId)

    }

    const viewEmployee = (empId) => {
        navigate("/employees/view/" + empId)

    }

    const searchForEmployees = () => {
        const searchType = swapSpaces(document.getElementById("emp-search-type").value.toLowerCase())
        const searchCriteria = document.getElementById("search-criteria").value.toLowerCase()

    try {

        axios.get(`${API_ADDRS.DEPLOYED_EMP}/search/${searchType}/${searchCriteria}`)
        .then(res => {
            if (res.data.length > 0) {
                setEmployees(null)
                setSearchedEmployees(res.data)
            } else {
                alert("No employees match the search criteria")
            }
        })
    } catch (e) {
        console.log(e)
    }
    }

    const displaySearchedEmployees = () => {
        // console.log(searchedEmployees)
        const employeeRows = []
        searchedEmployees.forEach(employee => {
            employeeRows.push(
                <tr key={employee._id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    {generateEmployeeButtons(employee._id)}
                </tr>
            )
        })

        return (
            <table id="employees-list-table">
                <thead>
                    <tr key={"headings"}>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeRows}
                </tbody>
            </table>
        )
    }

    const swapSpaces = (input) => {
        let output = ""
        for (let i = 0; i < input.length; i ++) {
            if (input[i] !== " ") output+= input[i]
            else if( input[i] === ' ') output+= "_"
        }
    
        return output
    }

    const returnToList = () => {
        setSearchedEmployees(null)
    }
    
if (employees === null) {

    if(searchedEmployees === null) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } 
}

    if (searchedEmployees !== null) {
        return(
            <div id="list-employees">
                <Header pageTitle={"Employee Management"} />
                <div id="list-section">
                    <h3>List Employees</h3>
                    <div id="list-features">
                        <button id="add-emp-button" 
                        onClick={() => navigate("/employees/add")}>Add Employee</button>

                        <div id="employee-search-bar">
                            <input type="text" id="search-criteria" placeholder="Search employees"/>
                            <select id="emp-search-type">
                                <option>Department</option>
                                <option>Position</option>
                            </select>
                            <button onClick={searchForEmployees}>Search</button>
                        </div>
                    </div>
                    {displaySearchedEmployees()}
                    <button id="return-to-list" onClick={returnToList}>Return to List</button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div id="list-employees">
            <Header pageTitle={"Employee Management"} />
            <div id="list-section">

                <h3>List Employees</h3>
                <div id="list-features">
                    <button id="add-emp-button" 
                    onClick={() => navigate("/employees/add")}>Add Employee</button>

                    <div id="employee-search-bar">
                        <input type="text" id="search-criteria" placeholder="Search employees"/>
                        <select id="emp-search-type">
                            <option>Department</option>
                            <option>Position</option>
                        </select>
                        <button onClick={searchForEmployees}>Search</button>
                    </div>
                </div>
                {generateEmployeesTable()}
            </div>
            <Footer />
        </div>
    )
}

export default ListEmployee