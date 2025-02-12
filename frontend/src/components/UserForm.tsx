import React, { useState } from "react";
import axios from "axios";

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
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

      if (response.status === 201) {
        setMessage("ユーザーが追加されました！");
        setName("");
        setEmail("");
        setAge(null);
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
      <h2>ユーザー追加</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>年齢:</label>
          <input
            type="number"
            value={age ?? ""}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : null)}
            required
          />
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
  );
};

export default UserForm;
