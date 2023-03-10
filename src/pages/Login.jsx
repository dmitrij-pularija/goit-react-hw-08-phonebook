import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';

const LoginPage = () => {
  return (
    <>
      <AuthForm mode={'login'} />
      <Link to="/register">I`m not registered</Link>
    </>
  );
};

export default LoginPage;