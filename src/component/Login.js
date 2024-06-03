import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const Auth = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        });
        navigate("/books");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}


return (
    <div className="columns is-vcentered is-centered padding-out">
    <div className="column is-half">
      <figure className="image is-4by3">
        <img src={require("../assets/signup.jpg")} alt="" />
      </figure>
    </div>
    <div className="column is-half white-background">
      <div className="box white-background">
        <div>
          <h2 className="title text-black has-text-centered">
            Signin to your account
          </h2>
        </div>
          <form onSubmit={Auth} className="box">
              <div className="field mt-5">
                <label className="label text-black">Email</label>
                <div className="control">
                  <input type="text" className="input tf" placeholder="Username" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </div>
              </div>
              <div className="field mt-5">
                <label className="label text-black">Password</label>
                <div className="control">
                  <input type="password" className="input tf" placeholder="*******" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
              </div>
              <p className="has-text-centered mt-5">{msg}</p>
              <div className="field mt-1">
                <button className="button is-success is-fullwidth">Login</button>
              </div>
              <p class="has-text-centered">Don't have an account yet? <a href="/register" className='has-text-success'>Sign up</a></p>
            </form>
      </div>
    </div>
  </div>
);
};

export default Login