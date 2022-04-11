import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginThunk } from "../redux/actions";
import '../styles/navbar.css'
import Purchases from './Purchases';

const NavBar = () => {

    const [loginOpen, setLoginOpen] = useState(false)
    const [isPurchasesOpen, setIsPurchasesOpen] = useState(false)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginError, setLoginError] = useState("");

    //localStorage.setItem("number", "10")
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault()
        const credentials = {email, password}
        dispatch(loginThunk(credentials))
        .then(res => { 
            localStorage.setItem("token", res.data.data.token);
        setLoginError("");
        setLoginOpen(false);
    })
    .catch(error => {
        setLoginError(error.response.data.message)
    })
    }

    //console.log(localStorage.getItem("token"))

  return (
    <div className='navbar'>
        <h2>e-commerce</h2>
        <nav>
            <button onClick={() => setLoginOpen(!loginOpen)}><i className="fa-solid fa-circle-user"></i></button>
            <button onClick={() => setIsPurchasesOpen(!isPurchasesOpen)} ><i className="fa-solid fa-cart-shopping"></i></button>
        </nav>
        
        <form onSubmit={login} className={`login ${loginOpen ? 'open' : ''}`} >
            <input 
                type="email" 
                placeholder='email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />

            {
                localStorage.getItem("token") ? 
                    <button onClick={() => localStorage.setItem("token", "")} type="button">
                        Log Out
                    </button> : (
                    <>
                    <input 
                        type="password" 
                        placeholder='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                    />   
                    <p>{loginError}</p>
                    <button>Submit</button>
                    </>
                )
            }

        </form>
        

      <Purchases isPurchasesOpen={isPurchasesOpen}/>  
    </div>
  )
}

export default NavBar