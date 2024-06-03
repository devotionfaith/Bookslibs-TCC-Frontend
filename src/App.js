import Login from "./component/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import BooksList from "./component/BooksList";
import EditBook from "./component/EditBook";
import Navbar from "./component/Navbar";
import InputBook from "./component/InputBook";

const BooksListLayout = () => {
  return (
      <div>
          <Navbar />
          <BooksList />
      </div>
  );
};
const EditBookLayout = () => {
  return (
      <div>
         <Navbar />
         <EditBook/>
      </div>
  );
};
const InputBookLayout = () => {
  return (
      <div>
         <Navbar />
         <InputBook />
      </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BooksListLayout />} />
        <Route path="/editbook/:bookId" element={<EditBookLayout/>} />
        <Route path="/inputbook" element={<InputBookLayout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
