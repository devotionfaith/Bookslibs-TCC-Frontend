import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = async() => { 
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <nav className="navbar is-light p-3" role="navigation" aria-label="main navigation">
          <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/books">
              <h1 className='title is-5 has-text-success'>BooksLibs</h1>
            </a>
          </div>
    
          <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                <button onClick={Logout} className="button is-danger">
                Log Out
              </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
}

export default Navbar
