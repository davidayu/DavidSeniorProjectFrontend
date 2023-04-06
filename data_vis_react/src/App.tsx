import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type User = {
  id: number;
  username: string;
};
function App() {
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/user_list/';
    axios.get(url).then((response) => {
      setUsers(response.data);
    });
  }, []);
  return <div className="App">{users ? users.map((user) => {
    return <p>{user.id + " " + user.username}</p>
  }) : null}</div>;

}

export default App;
