import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("ユーザー情報の取得に失敗しました");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.age} years old <br />
            Email:{user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;