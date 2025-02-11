import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name} - {user.age} years old
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
