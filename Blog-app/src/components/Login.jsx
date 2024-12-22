/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react'
import authService from "../appwrite/auth"
import { useNavigate , Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import { login as authLogin } from "../store/authSlice"
import {useDispatch} from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const [error , setError] = useState('')
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if(session) {
                const user = await authService.getCurrentUser()
                if(user) {
                    dispatch(authLogin(user))
                    navigate('/')
                }
            }
            
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full '>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5 ">
                    <Input
                        {...register('email', {required: true})}
                        placeholder='Email'
                        label='Email'
                    />
                    <Input
                        {...register('password', {required: true})}
                        placeholder='Password'
                        label='Password'
                        type='password'
                    />
                    <Button type='submit'>
                        Sign In {" "}
                    </Button>
                </form>

            </div>
        </div>
    )
}

export default Login
