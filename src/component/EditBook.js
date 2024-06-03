import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [name, setName] = useState("");
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [stok, setStok] = useState("");
  const [bookId, setBookId] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [users, setUsers] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
    fetchbook();
  },[params.bookId]);

  const fetchbook = async() => {
    try {
      const response = await axiosJWT.get(`http://localhost:5000/books/${params.bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const bookData = response.data;
      console.log(bookData);
      setJudul(bookData.judul);
      setPengarang(bookData.pengarang);
      setImgUrl(bookData.img_url);
      setStok(bookData.stok)
      setBookId(bookData.id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updatebook = async(e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.put(`http://localhost:5000/books/${params.bookId}`, {
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

  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/")
      }
    }
  }

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

  const handleStokChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && parseInt(value) === parseFloat(value)) {
      setStok(value);
    }
  };

  return (
    <div className='container mt-5 p-5'>
      <form onSubmit={updatebook} class=" gray-bg-low-opacity box">
                <h2 className='title is-3 text-black has-text-centered'>Edit your <a className='has-text-success'>book</a></h2>
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

export default EditBook