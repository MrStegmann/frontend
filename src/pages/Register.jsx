import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import Input from '../framework/Input';

const Register = () => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [ registerForm, setRegisterForm ] = useState({});

    return (
        <div className='w-full flex flex-col justify-center items-center mx-5 bg-indigo-900 rounded-lg border border-indigo-500'>
            <h2 className='font-bold text-xl text-white my-5'>Register</h2>

            <Input title={"Username"} name={"username"} type={"text"} value={registerForm?.username} onChange={e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})} />

            <Input title={"Email"} name={"email"} type={"email"} value={registerForm?.email} onChange={e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})} />

            <Input title={"Password"} name={"password"} type={"password"} value={registerForm?.password} onChange={e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})} />
            
            <Input title={"Repeat Password"} name={"password2"} type={"password"} value={registerForm?.password2} onChange={e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})} />

            <button className='text-white hover:underline hover:font-bold' onClick={() => handleRegister(registerForm, (result) => {
                if (result.error) return console.error(result.msg);
                console.log(result.msg);
                navigate('/');
            })}>Register</button>
            <div className='border-b w-full border-indigo-500 my-2' />
            <Link className='text-white hover:underline hover:font-bold mb-5' to={"/"}>Login</Link>
        </div>
    )
}

export default Register