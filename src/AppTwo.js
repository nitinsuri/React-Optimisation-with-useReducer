import React, { useState, useEffect, useReducer } from 'react';
import Loader from './Loader';
import { appReducer, INITIAL_STATE } from './appReducer';
import './style.scss';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const fetchData = () => {
    dispatch({ type: 'FETCH_START' });
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERROR' });
      });
  };
  return (
    <div>
      <h1>React AppOne to display a list of users!</h1>
      <button onClick={() => fetchData()}>Fetch some data</button>
      <p>{state.error ?? state.error}</p>
      {state.isLoading ? (
        <Loader />
      ) : (
        <ul>
          {state.data?.length > 0 &&
            state.data?.map((user, idx) => (
              <li key={idx}>
                {idx + 1}. {user.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
