"use client"

import React from 'react'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import TextInput from './TextInput'
import Link from 'next/link'
import { getValidationSchema } from '@/lib/validations/authValidation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { IoEyeOff, IoEye } from 'react-icons/io5'
import { create } from 'domain'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Client'
import { signIn, signUp } from '@/lib/actions/Auth.action'
import Loader from './Loader'



const AuthForm = ({ type }: { type: string }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const router = useRouter()
    const isSignIn = type === 'sign-in'
    return (
        <div className='card-border lg:min-w-[566px] py-8 px-8'>
            <div className='flex flex-col card gap-6 '>
                <div className='flex flex-col gap-2 justify-center'>
                    <Logo />
                </div>
            </div>

            <Formik
                 initialValues={isSignIn ? { email: '', password: '' } : { username: '', email: '', password: '' }}
                validationSchema={getValidationSchema(type)}
               async onSubmit={async (values, { setSubmitting }) => {
                    try {
                        if (isSignIn) {
                            // Handle sign-in logic here
                            const { email, password } = values
                            const userCredentials = await signInWithEmailAndPassword(auth, email, password,)
                            const idToken = await userCredentials.user.getIdToken()
                            if(!idToken) {
                                toast.error('Token not found')
                                return
                            }
                            const result = await signIn({
                                email,
                                idToken: idToken
                            })
                            if (!result.success) {
                                toast.error(result.message)
                                return
                            }
                            console.log('Sign in values:', values);
                            toast.success('Sign in successful!');
                            router.push('/')
                        } else {
                            // Handle sign-up logic here
                            const { email, password, username } = values
                            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
                            const result = await signUp({
                                email,
                                password,
                                uid: userCredentials.user.uid,
                                username: username!
                            })
                            if (!result.success) {
                                toast.error(result.message)
                                return
                            }
                            console.log('Sign up values:', values);
                            toast.success('Account Created successful!');
                            router.push('/sign-in')
                        }
                        // You can await API call here, e.g.:
                        // await api.post('/auth', values);
                    } catch (error) {
                        console.error('Submission error:', error);
                        toast.error('An error occurred during submission. Please try again.');
                    } finally {
                        setSubmitting(false); // always stop submitting state
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <FormikForm className="space-y-5 mt-4  form px-1">
                        {!isSignIn && (
                            <TextInput
                                name="username"
                                label="name"
                                placeholder="username"
                                // description="This is your public display name."
                            />
                        )}

                        <TextInput
                            name="email"
                            label="email"
                            placeholder="enter your email"
                            // description="This is your public display name."
                        />

<TextInput
  name="password"
  label="Password"
  placeholder="password"
  type={showPassword ? 'text' : 'password'}
  icon={showPassword ? <IoEyeOff size={20}/> : <IoEye size={20}/>}
  onIconClick={() => setShowPassword(prev => !prev)}
/>

<Button disabled={isSubmitting} type="submit" className="btn flex items-center justify-center gap-2">
  {isSubmitting ? <Loader /> : (isSignIn ? 'Sign in' : 'Create an Account')}
</Button>

                    </FormikForm>

                )}
            </Formik>

            <p className='text-center mt-4'>
                {isSignIn ? 'No account yet?' : 'Already have an account?'}
                <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-user-primary ml-1 hover:underline'>
                    {isSignIn ? 'Sign up' : 'Sign in'}
                </Link>
            </p>
        </div>
    )
}

export default AuthForm
