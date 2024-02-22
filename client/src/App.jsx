import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-4xl'>User List</h1>
      <div className='p-4'>
        {users.map((user) => (
          <div key={user.id} className='mb-4'>
            <h2 className='text-2xl'>Record-{user.id}</h2>
            <ul>
              <li key={`${user.id}-name`}>{user.name}</li>
              <li key={`${user.id}-email`}>{user.email}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
