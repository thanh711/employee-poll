import "./Leaderboard.css";
import {useState} from 'react'
import { useEffect } from 'react';
import Loading  from '../common/Loading';
import { useSelector } from 'react-redux';


const Leaderboard = () => {
  const [sortUsers,setSortUsers]=useState([]);
  const users = useSelector(state => state.users);  
  useEffect(() => {
    setSortUsers([...users].sort((b,a)=>(a.questions.length+Object.keys(a.answers).length)-(b.questions.length+Object.keys(b.answers).length) ))
  }, [users]);

  
return (
  <div className="container">
    <h1 className="title">Leaderboard</h1>
    {sortUsers.length > 0 ? (
      <>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="header">Users</th>
              <th className="header">Answered</th>
              <th className="header">Created</th>
            </tr>
          </thead>
          <tbody>
            {sortUsers.map((user, index) => (
              <tr key={index}>
                <td className="userCell">
                  <img
                    src={user.avatarURL}
                    alt={user.name}
                    className="avatar"
                  />
                  {user.name}
                </td>
                <td className="cell">{Object.keys(user.answers).length}</td>
                <td className="cell">{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <Loading />
    )}
  </div>
);
};
 
export default Leaderboard;
 