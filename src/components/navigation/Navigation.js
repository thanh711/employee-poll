import "./Navigation.css";
import React, { useEffect, useState }  from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);  
    const location = useLocation();
    const currentPath = location.pathname;
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
       if(!user?.id){
        navigate("/login", { state: { previousPage: currentPath } });
       }
      }, [navigate, user, currentPath]);
      
      const handleSearch = () => {
        navigate('/'+searchTerm)
      };

      
    return (
        <div>
             <nav>
                <Link to={'/'}  className='menu-item'>Home</Link>
                <Link to={'/leaderboard'}  className='menu-item'>Leaderboard</Link>
                <Link to={'/add'}  className='menu-item'>New</Link>
                <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Ex: questions/:question_id, leaderboard..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Go</button>
                </div>
                <div className="nav-right-items">
                    <div className="user-info">
                        <img src={user.avatarURL} className="user-avatar" alt="avatar" /> 
                        <span>{user.name} </span>
                    </div>
                <Link to={'/logout'}  className='menu-item'>Logout</Link>
                </div>
            </nav>
            {children} 
        </div>
  );
};
 
export default Navigation;