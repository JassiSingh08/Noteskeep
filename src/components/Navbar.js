import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Noteskeep</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : " "}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : " "}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1 login2" role="button" to="/login" aria-disabled="true">Login</Link>
            <Link className="btn btn-primary mx-1 login2" role="button" to="/signup" aria-disabled="true">Signup</Link>
          </form> : <button className='btn btn-primary login2' onClick={handleLogout}> LogOut</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar