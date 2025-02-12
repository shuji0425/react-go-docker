import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>ユーザーマネジメントアプリ</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
