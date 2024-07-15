import React, { useEffect } from 'react';
import { Form,message } from 'antd';
import Button from '../../components/Button';
import {Link, useNavigate} from 'react-router-dom'
import { LoginUser } from '../../apicalls/users';
// import { useDispatch } from 'react-redux';
// import {HideLoading, ShowLoading} from "../../redux/loadersSlice";


function Login() {
    const navigate =useNavigate();
    // const dispatch = useDispatch();

    const onFinish = async(values) => {
        try{
            // dispatch(ShowLoading());
            const response = await LoginUser(values);
            // dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href="/";
            } else{
                 message.error(response.message);
            }
        }
        catch(error){
            // dispatch(HideLoading());
            message.error(error.message);
        }
    };
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/");
        }
    });
    return (
        <div className='flex flex-col justify-center h-screen items-center bg-primary content'>
            <div className='card mt-10 p-3 w-400'>
                <h1 className='text-xl  flex justify-center items-center mb-3'>
                    MOVIX - Login
                </h1>
                <hr/>
                <Form layout='vertical' className='mt-2' onFinish={onFinish}>
                    <Form.Item label='Email:' name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                        <input type="email" />
                    </Form.Item>
                    <Form.Item label='Password:' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                        <input type="password" />
                    </Form.Item>
                    <div className='flex flex-col mt-2 gap-1 '>
                    <Button fullWidth title="LOGIN" type="submit" />
                    <Link to="/register" className='text-primary'>Don't have an account? Register</Link>
                    </div>                    
                </Form>
            </div>
        </div>
    )
}

export default Login;