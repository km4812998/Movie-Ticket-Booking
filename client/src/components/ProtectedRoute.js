import React, { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
// import { HideLoading, ShowLoading } from '../redux/loadersSlice';

function ProtectedRoute({ children }) {
    const {user} =useSelector((state)=>state.users)
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const getCurrentUser = async () => {
        try {
            // dispatch(ShowLoading());
            const response = await GetCurrentUser();
            // dispatch(HideLoading());
            if (response.success) {
                
                dispatch(setUser(response.data))
            }
            else {
                dispatch(setUser(null))
                message.error(response.message);
                localStorage.removeItem("token");
                navigate('/login');
            }
        } catch (error) {
            // dispatch(HideLoading());
            dispatch(setUser(null))
            message.error(error.message);
        }
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            getCurrentUser();
        }
        else{
            navigate('/login');
        }
    });

    return (
        user &&(
        <div className="layout ">
            <div className='header bg-primary flex justify-between p-2'>
                <div>
                    <h1 className='text-3xl text-white cursor-pointer'
                    onClick={()=>{
                        navigate('/');
                    }} >
                        MOVIX
                    </h1>
                </div>

                <div className='circle bg-white p-1 flex gap-1'>
                <i className="ri-shield-user-fill test-primary"></i>
                    <h1 className="text-2xl underline"
                    onClick={()=>{
                        if(user.isAdmin){
                            navigate('/admin');
                        }
                        else{
                            navigate('/profile');
                        }
                    }}
                    >{user.name}</h1>
                    <i className="ri-logout-circle-r-line ml-1"
                        onClick={()=>{
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}
                        ></i>
                </div>
            </div>
            <div className='content mt-1 p-1'>
                {children}
            </div>
        </div>
        )
    )
}

export default ProtectedRoute;