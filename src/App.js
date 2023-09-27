import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import './style.scss';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const delay = new Promise(function (res) {
    setTimeout(() => {
      res('delay complete');
    }, 1000);
  });
  const fetchData = async () => {
    setLoading(true);
    const p = await delay;
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then((data) => data.json())
      .then((data) => {
        data.length === undefined
          ? setError('Nothing found to show.')
          : setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Network error.');
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>React App to display a list of users!</h1>
      {/* <button onClick={() => fetchData()}>Fetch some data</button> */}
      <p>{error ?? error}</p>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {users?.length > 0 &&
            users?.map((user, idx) => (
              <li key={idx}>
                {idx + 1}. {user.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
