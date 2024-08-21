import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Input from '../framework/Input';

const Login = () => {
    const { handleLogin } = useAuth()
    const navigate = useNavigate();

    const [ loginForm, setLoginForm ] = useState({});

    return (
        <div className='w-full flex flex-col justify-center items-center mx-5 bg-indigo-900 rounded-lg border border-indigo-500'>
            <h2 className='font-bold text-xl text-white my-5'>Login</h2>
            <Input title={"Email"} name={"email"} type={"email"} value={loginForm?.email} onChange={e => setLoginForm({...loginForm, [e.target.name]: e.target.value})} />
            
            <Input title={"Password"} name={"password"} type={"password"} value={loginForm?.password} onChange={e => setLoginForm({...loginForm, [e.target.name]: e.target.value})} />

            <button className='text-white hover:underline hover:font-bold' onClick={() => handleLogin(loginForm, (result) => {
                if (result.error) return console.error(result.msg);
                console.log(result.msg);
                navigate('/ui');
            })}>Login</button>
            <div className='border-b w-full border-indigo-500 my-2' />
            <Link className='text-white hover:underline hover:font-bold mb-5' to={"/register"}>Register</Link>
        </div>
    )
}

export default Login