// "use client"

// import React from 'react'
// import { Formik, Form as FormikForm } from 'formik'
// import * as Yup from 'yup'
// import { Button } from '@/components/ui/button'
// import Logo from './Logo'
// import TextInput from './TextInput'
// import Link from 'next/link'
// import { getValidationSchema } from '@/lib/validations/authValidation'
// import { toast } from 'sonner'
// import { useRouter } from 'next/navigation'
// import { IoEyeOff, IoEye } from 'react-icons/io5'
// import { create } from 'domain'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../firebase/Client'
// import { signIn, signUp } from '@/lib/actions/Auth.action'
// import Loader from './Loader'



// const AuthForm = ({ type }: { type: string }) => {
//     const [showPassword, setShowPassword] = React.useState(false);

//     const router = useRouter()
//     const isSignIn = type === 'sign-in'
//     return (
//         <div className='card-border lg:min-w-[566px] py-8 px-8'>
//             <div className='flex flex-col card gap-6 '>
//                 <div className='flex flex-col gap-2 justify-center'>
//                     <Logo />
//                 </div>
//             </div>

//             <Formik
//                  initialValues={isSignIn ? { email: '', password: '' } : { username: '', email: '', password: '' }}
//                 validationSchema={getValidationSchema(type)}
//                async onSubmit={async (values, { setSubmitting }) => {
//                     try {
//                         if (isSignIn) {
//                             // Handle sign-in logic here
//                             const { email, password } = values
//                             const userCredentials = await signInWithEmailAndPassword(auth, email, password,)
//                             const idToken = await userCredentials.user.getIdToken()
//                             if(!idToken) {
//                                 toast.error('Token not found')
//                                 return
//                             }
//                             const result = await signIn({
//                                 email,
//                                 idToken: idToken
//                             })
//                             if (!result.success) {
//                                 toast.error(result.message)
//                                 return
//                             }
//                             console.log('Sign in values:', values);
//                             toast.success('Sign in successful!');
//                             router.push('/')
//                         } else {
//                             // Handle sign-up logic here
//                             const { email, password, username } = values
//                             const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
//                             const result = await signUp({
//                                 email,
//                                 password,
//                                 uid: userCredentials.user.uid,
//                                 username: username!
//                             })
//                             if (!result.success) {
//                                 toast.error(result.message)
//                                 return
//                             }
//                             console.log('Sign up values:', values);
//                             toast.success('Account Created successful!');
//                             router.push('/sign-in')
//                         }
//                         // You can await API call here, e.g.:
//                         // await api.post('/auth', values);
//                     } catch (error) {
//                         console.error('Submission error:', error);
//                         toast.error('An error occurred during submission. Please try again.');
//                     } finally {
//                         setSubmitting(false); // always stop submitting state
//                     }
//                 }}
//             >
//                 {({ isSubmitting }) => (
//                     <FormikForm className="space-y-5 mt-4  form px-1">
//                         {!isSignIn && (
//                             <TextInput
//                                 name="username"
//                                 label="name"
//                                 placeholder="username"
//                                 // description="This is your public display name."
//                             />
//                         )}

//                         <TextInput
//                             name="email"
//                             label="email"
//                             placeholder="enter your email"
//                             // description="This is your public display name."
//                         />

// <TextInput
//   name="password"
//   label="Password"
//   placeholder="password"
//   type={showPassword ? 'text' : 'password'}
//   icon={showPassword ? <IoEyeOff size={20}/> : <IoEye size={20}/>}
//   onIconClick={() => setShowPassword(prev => !prev)}
// />

// <Button disabled={isSubmitting} type="submit" className="btn flex items-center justify-center gap-2">
//   {isSubmitting ? <Loader /> : (isSignIn ? 'Sign in' : 'Create an Account')}
// </Button>

//                     </FormikForm>

//                 )}
//             </Formik>

//             <p className='text-center mt-4'>
//                 {isSignIn ? 'No account yet?' : 'Already have an account?'}
//                 <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-user-primary ml-1 hover:underline'>
//                     {isSignIn ? 'Sign up' : 'Sign in'}
//                 </Link>
//             </p>
//         </div>
//     )
// }

// export default AuthForm


"use client";

import in_img from '../../../public/robot.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Logo from './Logo';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import { toast } from 'sonner';

import { auth } from '../firebase/Client';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, signUp } from '@/lib/actions/Auth.action';
import { getValidationSchema } from '@/lib/validations/authValidation';
import Loader from './Loader';

const AuthForm = ({ type }: { type: string }) => {
     const [text, setText] = useState("");
      const [phraseIndex, setPhraseIndex] = useState(0);
      const [charIndex, setCharIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
    
      useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typingSpeed = isDeleting ? 40 : 80;
    
        const timeout = setTimeout(() => {
          const updatedCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
          setText(currentPhrase.substring(0, updatedCharIndex));
          setCharIndex(updatedCharIndex);
    
          if (!isDeleting && updatedCharIndex === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
          } else if (isDeleting && updatedCharIndex === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }, typingSpeed);
    
        return () => clearTimeout(timeout);
      }, [charIndex, isDeleting, phraseIndex]);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const isSignIn = type === 'sign-in';

  const initialValues = isSignIn
    ? { email: '', password: '' }
    : { username: '', email: '', password: '' };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (isSignIn) {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error('Token not found');
          return;
        }

        const result = await signIn({ email, idToken });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Sign in successful!');
        router.push('/');
      } else {
        const { email, password, username } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          email,
          password,
          uid: userCredentials.user.uid,
          username,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Account created successfully!');
        router.push('/sign-in');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const phrases = [
  "Empowering interviews, one question at a time.",
  "Crafting better conversations for success.",
  "Elevate your confidence with every answer.",
];

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 h-full relative">
        <div className="flex justify-start mb-10">
          <Logo />
        </div>
        <div className="flex justify-center items-center w-full">
          <Image src={in_img} alt="Login Illustration" className="w-full max-w-[400px] max-sm:max-w-[350px] h-full object-contain" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 shadow-md z-0" />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-full place  h-[100%] max-sm:bg-black/80 px-6 py-12 lg:px-12 flex justify-center flex-col">
        <h2 className="text-purple-600 text-3xl lg:text-4xl font-bold tracking-wide mb-2">Welcome!</h2>
        <p className="text-gray-500 text-base lg:text-[1rem] font-normal mb-10 mt-2">Enter details to login.</p>

        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(type)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6 w-full max-w-md">
              {!isSignIn && (
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-3 text-base border border-[#dcdcdc] rounded-md outline-none placeholder:text-[#9b9b9b] placeholder:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 mt-1 text-sm" />
                </div>
              )}

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 text-base border border-[#dcdcdc] rounded-md outline-none placeholder:text-[#9b9b9b] placeholder:text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
              </div>

              <div className="relative w-full">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 text-base border border-[#dcdcdc] rounded-md outline-none placeholder:text-[#9b9b9b] placeholder:text-sm"
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-600 text-xl cursor-pointer"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />

              <Link href="#" className="text-purple-400 text-sm font-semibold text-left">
                Forgot Password?
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 text-white font-semibold p-3 rounded-md w-full hover:bg-purple-600 transition-colors duration-300"
              >
                {isSubmitting ? <Loader /> : isSignIn ? 'Log In' : 'Create Account'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-sm flex gap-1">
          {isSignIn ? 'No account yet?' : 'Already have an account?'}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="text-purple-500 font-bold text-user-primary ml-1 hover:underline"
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
