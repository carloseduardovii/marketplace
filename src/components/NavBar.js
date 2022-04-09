import axios from 'axios'
import React, { useState } from 'react'
import '../styles/navbar.css'

const NavBar = () => {

    const [loginOpen, setLoginOpen] = useState(false)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    localStorage.setItem("number", "10")

    const login = (e) => {
        e.preventDefault()
        const credentials = {email, password}
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login/", credentials)
        .then((res) => localStorage.setItem("token", res.data.data.token))
    }

  return (
    <div className='navbar'>
        <nav>
            <button onClick={() => setLoginOpen(!loginOpen)}><i className="fa-solid fa-circle-user"></i></button>
            <button><i className="fa-solid fa-cart-shopping"></i></button>
        </nav>
        
        <form onSubmit={login} className={`login ${loginOpen ? 'open' : ''}`} >
            <input 
                type="email" 
                placeholder='email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <input 
                type="password" 
                placeholder='password' 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />
        <button>Submit</button>
        </form>
        

        
    </div>
  )
}

export default NavBar