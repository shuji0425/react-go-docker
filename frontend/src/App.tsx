import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div>
      <h1>ユーザーマネジメントアプリ</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
