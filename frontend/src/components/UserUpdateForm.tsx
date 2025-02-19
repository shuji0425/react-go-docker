import React, { useState } from "react";
import axios from "axios";
import { User } from "../types/user";

interface UserUpdateFormProps {
  user: User;
  onUpdateSuccess: () => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
  user,
  onUpdateSuccess,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState<number | null>(user.age);
  const [message, setMessage] = useState("");

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.patch(
        `http://localhost:8080/users/update${user.id}`,
        {
          name,
          email,
          age,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setMessage("ユーザーが更新されました！");
        onUpdateSuccess();
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(`エラー: ${error.response.data.error}`);
      } else {
        setMessage("予期しないエラーが発生しました。もう一度試してください。");
      }
    }
  };

  return (
    <div>
      <h2>ユーザー更新</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>年齢:</label>
          <input
            type="number"
            value={age ?? ""}
            onChange={(e) =>
              setAge(e.target.value ? parseInt(e.target.value) : null)
            }
          />
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default UserUpdateForm;
