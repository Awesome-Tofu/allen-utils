import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/api/Apicontext';
import ProfileIcon from '../assets/profile.svg';
import HomeIcon from '../assets/home.svg';
import '../css/Profile.css';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



function Profile({ alert }) {
    const context = useContext(ApiContext);
    const { getUserdetails, logout } = context;
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);


    const navtoLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        const fetchname = async () => {
            const name = await getUserdetails();
            setName(name);
        }

        fetchname();
    }, [getUserdetails, name]);

    const handlelogout = async () => {
        setProgress(10)
        localStorage.clear();
        await logout();
        alert('Logged out successfully');
        setProgress(100)
        navtoLogin();
    }

    const auth_token = localStorage.getItem('auth_token');

    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            {auth_token ?
                <><div className="parent-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <div onClick={() => {navigate('/')}} className="home-dropdown dropdown dropdown-bottom dropdown-end" style={{ display: 'inline-block' }}>
                        <div tabIndex={0} role="button" className="btn m-1 rounded-full">
                            <img alt='profile icon' src={HomeIcon} style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
                        </div>
                    </div>
                    <div className="profile-dropdown dropdown dropdown-bottom dropdown-start" style={{ display: 'inline-block' }}>
                        <div tabIndex={0} role="button" className="btn m-1">
                            <img alt='profile icon' src={ProfileIcon} style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />{name}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 hover:bg-slate-700 rounded-box z-[1] w-3/4 -2 shadow">
                            <li className='cursor-pointer font-sans font-semibold' onClick={() => document.getElementById('my_modal_2').showModal()} >Logout</li>
                        </ul>
                    </div>
                </div>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z">
                                    </path>
                                </svg>
                            </h3>
                            <p className="py-4 text-2xl">Are you sure you want to logout?</p>
                            <div className="modal-action flex justify-center items-center">
                                <form method="dialog">
                                    <button className="btn mx-2 w-20 bg-red-700 hover:bg-red-900 text-white" onClick={handlelogout} >Yes</button>
                                    <button className="btn mx-2 w-20 text-white">No</button>
                                </form>
                            </div>
                        </div>
                    </dialog></> :
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold">You're Not Signed In</h1>
                        <a href="/login" className="btn btn-info mt-4">Sign In to continue</a>
                    </div>
                </div>
            }
        </>
    );
}

export default Profile;
