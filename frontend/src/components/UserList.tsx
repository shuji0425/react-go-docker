import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";
import UserUpdateForm from "./UserUpdateForm";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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
  const handleUpdateSuccess = () => {
    fetchUsers();
    setEditingUser(null);
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
      {editingUser ? (
        <UserUpdateForm
          user={editingUser}
          onUpdateSuccess={handleUpdateSuccess}
        />
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.age ?? "年齢未設定"}
              <button onClick={() => setEditingUser(user)}>編集</button>
              <button onClick={() => deleteUser(user.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
