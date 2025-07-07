
import Login from '../Components/Login.jsx'
import Register from '../Components/Register.jsx'
import { useState } from 'react'


const AuthenticationPage = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md ">
        {/* <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1> */}
     { login ? <Login state={setLogin}/> : <Register state={setLogin} /> }
      </div>
    </div>
  );
};

export default AuthenticationPage;
