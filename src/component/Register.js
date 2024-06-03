import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const navigate = useNavigate()
    const [msg, setMsg] = useState("");

    const Register = async(e) =>{
        e.preventDefault(); 
        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if(error.response){
               setMsg(error.response.data.msg)
            }
        }
    }
    
  return (
    <div className="columns is-vcentered is-centered padding-low">
    <div className="column is-half">
      <figure className="image is-4by3">
        <img src={require("../assets/signup.jpg")} alt="" />
      </figure>
    </div>
    <div className="column is-half white-background">
      <div className="box white-background">
        <div>
          <h2 className="title text-black has-text-centered">
            Signup your account
          </h2>
        </div>
        <form onSubmit={ Register } className="box">
                <div className="field mt-5">
                <label className="label text-black">Name</label>
                <div className="controls">
                    <input typr="text" className="input tf" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                </div>
                <div className="field mt-5">
                    <label className="label text-black">Email</label>
                    <div className="controls">
                        <input typr="text" className="input tf" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label text-black">Password</label>
                    <div className="controls">
                        <input typr="password" className="input tf" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label text-black">Confirm Password</label>
                    <div className="controls">
                        <input typr="password" className="input tf" placeholder='********' value={confPassword} onChange={(e) => setconfPassword(e.target.value)}></input>
                    </div>
                </div>
                <p className="has-text-centered mt-5">{msg}</p>
                <div className="field mt-1">
                    <button className="button is-success is-fullwidth">Register</button>
                </div>
                <p class="has-text-centered">Already have an account? <a href="/" className='has-text-success'>Sign in</a></p>
            </form>
      </div>
    </div>
  </div>
  )
}

export default Register
