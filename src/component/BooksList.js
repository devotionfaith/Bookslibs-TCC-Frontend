import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const BooksList = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [books, setBooks] = useState("");
  const [users, setUsers] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    refreshToken();
    getbooks();
    getUsers();

  },[]);

  const getUsers = async() => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

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

  const getbooks = async() => {
    const response = await axiosJWT.get(`http://localhost:5000/books`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setBooks(response.data);
  }

  const EditBook = (id) => {
    navigate(`/editbook/${id}`);
  }

  const DeleteBook = async(id) => {
    try {
      const response = await axiosJWT.delete(`http://localhost:5000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getbooks();
    } catch (error) {
      console.log(error);
    }
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const capitalizedName = capitalizeFirstLetter(name);  

const Book = ({ book }) => {
  return (
    <div className="column is-one-third">
      <div className="card bg-card">
        <header className="card-header">
          <p className="card-header-title ml-2 text-white">{book.judul}</p>
        </header>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <img className='image is-4by3 ' style={{ width: '150px', height: '225px' }}  src={book.img_url} alt="Cover buku" />
            </div>
            <div className="media-content text-white">
              <p>Penulis: {book.pengarang}</p>
              <p>Stok: {book.stok}</p>
            </div>
          </div>
          <div className="card-footer">
            <button className="button is-small is-primary" onClick={() => EditBook(book.id)}>Edit</button>
            <button className="button is-small is-danger ml-5" onClick={() => DeleteBook(book.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
  return (
    <div className='container mt-1 p-5'>
      <h1 className='title text-black is-5 mb-5 has-text-centered'>
        Hello, {capitalizedName}!
      </h1>
       <hr />
  <div>
    {books.length === 0 ? (
        <a href="/inputbook" className="button is-success ml-auto">Tambah Buku</a>
    ) : (
      <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-three-quarters">
              <h2 className="title text-black">Daftar Buku</h2>
            </div>
            <div className="column is-flex">
              <a href="/inputbook" className="button is-success ml-auto">Tambah Buku</a>
            </div>
          </div>
        <div className="columns is-multiline">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    )}
  </div>

    </div>
  )
}

export default BooksList