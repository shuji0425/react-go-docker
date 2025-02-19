import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App: React.FC = () => {
  return (
    <div>
      <h1>ユーザーマネジメントアプリ</h1>
      <nav>
        <Link to="/">ユーザー一覧</Link> | <Link to="/add">ユーザー追加</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default App;
