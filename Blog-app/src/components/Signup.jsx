/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import authService from "../appwrite/auth"
import { useNavigate , Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import { login} from "../store/authSlice"
import {useDispatch} from 'react-redux'

function Signup() {
    const navigate = useNavigate();
    const [error , setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data);
            if(userData) {
                const user = await authService.getCurrentUser()
                if(user) {
                    //dispatch(login(user))
                    dispatch(login({ userData: user }));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }}

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5 ">
                    <Input
                      {...register('name', {required: true})}
                        placeholder='Full Name'
                        label='Full Name'
                    />
                    <Input
                      {...register('email', {required: true})}
                        placeholder='Email'
                        label='Email'
                        type = 'email'
                    />
                    <Input
                      {...register('password', {required: true})}
                        placeholder='Password'
                        label='Password'
                        type = 'password'  
                    />
                    <Button type='submit' className='w-full hover:bg-blue-700 click:bg-blue-900'>
                        Sign up
                    </Button>
                </form>
        </div>
    </div>
  )
}


export default Signup