import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 全件取得
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:8080/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("ユーザー情報の取得に失敗しました");
      setLoading(false);
      console.error("ユーザー取得失敗:", error);
    }
  };

  // ユーザー更新
  const updateUser = async (id: number, updateData: Partial<User>) => {
    try {
      const response = await axios.put<User>(
        `http://localhost:8080/users/update${id}`,
        updateData
      );
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      alert("ユーザーを更新しました");
    } catch (error) {
      console.error("ユーザー更新失敗:", error);
    }
  };

  // ユーザー削除
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("ユーザーを削除しました");
    } catch (error) {
      console.error("ユーザー削除失敗:", error);
    }
  };

  // 初回ロードで全ユーザー取得
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>ユーザー一覧</h1>
      {users.length === 0 ? (
        <p>ユーザーを登録してください</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Name: {user.name} <br />
              Age: {user.age} years old <br />
              Email:{user.email}
              <button
                onClick={() =>
                  updateUser(user.id, { name: "更新済みユーザー", age: user.age, email: user.email })
                }
              >
                更新
              </button>
              <button onClick={() => deleteUser(user.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
