"use client";
import in_img from '../../../public/bg_img.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Logo from './Logo';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import { toast } from 'sonner';
import { FaShieldAlt, FaBolt, FaHeadset, FaCheckCircle, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import { auth } from '../firebase/Client';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, signUp } from '@/lib/actions/Auth.action';
import { getValidationSchema } from '@/lib/validations/authValidation';
import Loader from './Loader';

const desktopPhrases = [
  "Welcome! Ready to prep?",
  "Hello there! Let's ace it!",
  "Hi! Let’s prep and ace it!",
];

const mobilePhrases = [
  "Make it count today!",
  "Let's ace it!",
  "Hi! Prep time!",
];

const AuthForm = ({ type }: { type: string }) => {
    const pathname = usePathname(); // or useLocation().pathname

  const is_SignIn = pathname === '/sign-in';
    const [phrases, setPhrases] = useState(desktopPhrases);
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // On mount and resize, update phrases depending on window width
    const updatePhrases = () => {
      if (window.innerWidth <= 640) {
        setPhrases(mobilePhrases);
      } else {
        setPhrases(desktopPhrases);
      }
      setPhraseIndex(0);
      setCharIndex(0);
      setIsDeleting(false);
    };

    updatePhrases();
    window.addEventListener('resize', updatePhrases);
    return () => window.removeEventListener('resize', updatePhrases);
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return;

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
  }, [charIndex, isDeleting, phraseIndex, phrases]);

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



  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 h-[100%] lg:h-full relative text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0" />


        <div className=" max-sm:px-4 max-sm:py-6 h-full px-6 sm:px-10 py-8 sm:py-14 flex flex-col justify-between pointer-events-none">
          <div className="max-w-md mx-auto sm:mx-0">
            <h1 className="text-4xl  sm:text-5xl font-extrabold drop-shadow-lg leading-tight mb-4">
              Welcome to Nexview
            </h1>
            <p className="text-sm sm:text-lg opacity-90 drop-shadow-md mb-8 max-sm:leading-6">
            A platform designed to help you ace interviews with personalized practice, instant feedback, and expert guidance.
            </p>

            {/* Features list */}
            <ul className="space-y-3 text-white/90 text-xs sm:text-base max-sm:hidden">
              <li className="flex items-center gap-3 ">
                <FaCheckCircle className="text-green-400 text-xl sm:text-2xl" />
                <span>Interactive mock interviews with AI-driven feedback</span>
              </li>
              <li className="flex items-center gap-3">
                <FaUserTie className="text-blue-400 text-xl sm:text-2xl" />
                <span>Connect with industry professionals</span>
              </li>
              <li className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-yellow-400 text-xl sm:text-2xl" />
                <span>Personalized coaching & resources</span>
              </li>
            </ul>

            {/* <Image src={in_img} alt=''/> */}
          </div>

          {/* Testimonial */}
          <div className="max-w-xs italic text-xs sm:text-sm text-white/70 drop-shadow-md pointer-events-auto mx-auto sm:mx-0 max-sm:hidden max-sm:mt-16">
            “InterviewPro helped me land my dream job by building my confidence and skills.”
            <br />
            <span className="not-italic font-semibold mt-3 block">– Alex, Software Engineer</span>
          </div>
        </div>
      </div>


      {/* Right Side */}
    <div
      className={`w-full lg:w-full max-sm:h-[64%] h-[100%] max-sm:bg-black/80 px-6 py-12 lg:px-12 flex justify-center flex-col max-sm:px-4 ${
        isSignIn ? 'max-sm:pt-[85px]' : 'max-sm:pt-[148px]'
      } max-sm:mb-4`}
    >
        <h2 className="text-purple-600 max-sm:text-white text-3xl lg:text-4xl font-bold tracking-wide mb-2">{text}
        <span className="animate-pulse">|</span></h2>
        <p className="text-gray-500 max-sm:text-white text-base lg:text-[1rem] font-normal mb-10 mt-2">Enter details to login.</p>

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

        <div className="mt-6 text-sm flex gap-1 max-sm:pb-4">
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
