
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const InputBook = () => {
  const [name, setName] = useState("");
  const [judul, setJudul] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [stok, setStok] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  },[]);

  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(response)
      setName(decoded.name);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/")
      }
    }
  }

  const AddBook = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/books', {
            name:name,
            judul: judul,
            pengarang: pengarang,
            img_url: img_url,
            stok: stok
        });
        navigate("/books");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
}

const handleStokChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && parseInt(value) === parseFloat(value)) {
      setStok(value);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if (expired * 1000 < currentDate.getTime()) {
      const response = await axios.get("http://localhost:5000/token");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpired(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async() => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={AddBook} class=" gray-bg-low-opacity box">
                <h2 className='title is-3 text-black has-text-centered'>Add your <a className='has-text-success'>book</a></h2>
                <p class="has-text-centered">{msg}</p>
                <div class="field mt-5">
                  <label class="label text-black">Judul</label>
                  <div class="control">
                    <input type="text" class="input tf is-success" placeholder="Judul" value={judul} onChange={(e) => {setJudul(e.target.value)}} />
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label text-black">Pengarang</label>
                  <div class="control">
                    <input class="input is-success tf" placeholder='Pengarang' value={pengarang} onChange={(e) => {setPengarang(e.target.value)}}/>
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label text-black">URL Image</label>
                  <div class="control">
                    <input class="input is-success tf" placeholder='URL Image' value={img_url} onChange={(e) => {setImgUrl(e.target.value)}}/>
                  </div>
                </div>
                <div class="field mt-5">
                  <label class="label text-black">Stok</label>
                  <div class="control">
                    <input class="input is-success tf" placeholder='Stok' value={stok} onChange={handleStokChange}/>
                  </div>
                </div>
                <div class="field mt-5 mb-3">
                  <button class="button is-success is-fullwidth">Simpan</button>
                </div>
              </form>
    </div>
  )
}

export default InputBook
