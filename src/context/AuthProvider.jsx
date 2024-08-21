import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const handleRegister = (data, cb) => {
        if (!data?.username) return cb({error: true, msg: "Username is required"});
        if (!data?.email) return cb({error: true, msg: "Email is required"});
        if (!data?.password) return cb({error: true, msg: "Password is required"});
        if (data.password !== data.password2) return cb({error: true, msg: "Password do not match"});
        if (localStorage.getItem(data.email)) return cb({error: true, msg: "Email already used"});
        delete data.password2;

        // Testing. This will be a db query
        const dataStringified = JSON.stringify(data);
        localStorage.setItem(data.email, dataStringified);
        cb({error: false, msg: "Success"});
    };

    const handleLogin = (data, cb) => {
        if (!localStorage.getItem(data.email)) return cb({error: true, msg: "User does not exist"});
        const parsedData = JSON.parse(localStorage.getItem(data.email));
        if (parsedData.password !== data.password) return cb({error: true, msg: "Incorrect password"});
        data.loginToken = Date.now();

        // Testing. This will be a db query
        const dataStringified = JSON.stringify(data);
        localStorage.setItem(data.email, dataStringified);
        //
        localStorage.setItem("loginToken", data.loginToken);
        cb({error: false, msg: "Success"})
    };

    useEffect(() => {
        if (localStorage.getItem("loginToken")) {
            const myStorage = window.localStorage;
            const token = localStorage.getItem("loginToken");

            // Testing
            for (const k in myStorage) {
                const stringData = localStorage.getItem(k);
                if (stringData && stringData.includes("loginToken")) {
                    const data = JSON.parse(stringData);
                    if (data && data.loginToken && data.loginToken === Number(token)) navigate("/ui");
                };
            };
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={{handleRegister, handleLogin}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export {
    AuthProvider
}
  
export default AuthContext