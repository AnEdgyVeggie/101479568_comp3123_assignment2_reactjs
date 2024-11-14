import "./Header.css"

const Header = ({ pageTitle }) => {

    return (
        <div id='header'>
            <div id='header-banner'><h2>{pageTitle}</h2></div>
            <div id="app-top-section">
                <div id="home-nav">
                    <a href="/employees/list" >Employees List</a>
                    <span></span>
                    <a href="/login" onClick={() => localStorage.removeItem("token")}>Log Out</a>
                </div>
            </div>
        </div>
    )
}

export default Header