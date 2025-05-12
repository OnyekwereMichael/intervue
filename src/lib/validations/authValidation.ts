
import * as Yup from 'yup'
export const getValidationSchema = (type: string) => {
    const baseSchema = {
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 4 characters')
        .required('Password is required'),
    };
  
    if (type === 'sign-up') {
      return Yup.object({
       username: Yup.string()
          .min(2, 'Username must be at least 3 characters')
          .max(50, 'Username must be at most 50 characters')
          .required('Username is required'),
        ...baseSchema,
      });
    }
}