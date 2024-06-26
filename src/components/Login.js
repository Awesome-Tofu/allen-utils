import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../context/api/Apicontext';
import { useNavigate }from 'react-router-dom';
// eslint-disable-next-line
import LoadingBar from 'react-top-loading-bar';


const Login = ({ alert }) => {
    const context = useContext(ApiContext);
    const { login } = context;
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    const navtoHome = () => {
        navigate('/');
    }

    useEffect(() => {
        setProgress(100)
    }, [])

    const auth_token = localStorage.getItem('auth_token');


    const handleLogin = async (e) => {
        setProgress(10)
        e.preventDefault();
        const formid = document.getElementById('formid').value;
        const password = document.getElementById('password').value;
        if (!formid || !password) {
            alert('Please fill all the fields', 'w');
            return;
        }

        const data = await login(formid, password);
        if (data) {
            alert('Login successful', 's');
        } else {
            alert('Login failed', 'e');
            console.log('Login failed');
        }
        setProgress(100)
        navtoHome();
    }

    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            {!auth_token ?
                <div className="flex items-center justify-center h-screen">
                    <form className='w-1/6 flex flex-col items-center -mt-24' onSubmit={handleLogin}>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" id='formid' className="grow" placeholder="Form ID" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" id='password' className="grow" placeholder="Password" />
                        </label>
                        <button type="submit" className="btn btn-primary mt-4">Login</button>
                    </form>
                </div> :
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold">You're Now Signed In</h1>
                        <a href="/" className="btn btn-info mt-4">Go to Home</a>
                    </div>
                </div>
            }
        </>
    );
}

export default Login;