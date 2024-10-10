import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/users';
import Loading  from './common/Loading';


const  Logout= ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(logout());
    navigate('/login'); 
    console.log('logout 1')
  }, [navigate, dispatch]);
  return (<Loading/>);
}
 
export default Logout;