import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Background } from "./components/background";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Login } from "./components/login";
import { Error } from "./components/error";
import { BookList } from "./components/book-list";

function App() {
  let shouldRedirect = true;

  return (
    <div className="App">
      <Background />
      <h1 className="title">Book Management System</h1>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={shouldRedirect && <Navigate replace to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/Books" element={<BookList />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
