import { UserProfile } from '@/models/user.model';
import { User } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { saveUserProfile } from '@/api/user.api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

interface UserProfileFormProps {
  onSuccess: (profile: UserProfile) => void;
  user: User;
}

const UserProfileForm = ({ onSuccess, user }: UserProfileFormProps) => {
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik<UserProfile>({
      initialValues: {
        id: user.uid,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        userName: '',
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string().required('This is a required field'),
        lastName: Yup.string().required('This is a required field'),
        email: Yup.string().email().required('This is a required field'),
        userName: Yup.string()
          .required('This is a required field')
          .min(4)
          .max(20)
          .matches(
            /^[a-zA-Z0-9_]*$/,
            'Only letters, numbers, and underscores are allowed',
          ),
      }),
      onSubmit: async (values) => {
        setLoading(true);
        try {
          await saveUserProfile(values);
          onSuccess(values);
        } catch (error) {
          console.log(error);
          toast.error((error as FirebaseError).message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <form
      className="px-4 text-center flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <p className="text-gray-500">
        Hey! Looks like you forgot to set up your profile. Just add a username
        and you're good to go!
      </p>
      <Input
        label="First Name"
        value={values.firstName}
        name="firstName"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled
        hasError={touched.firstName && Boolean(errors.firstName)}
        smallText={
          touched.firstName && errors.firstName ? errors.firstName : ''
        }
      />
      <Input
        label="Last Name"
        value={values.lastName}
        name="lastName"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled
        hasError={touched.lastName && Boolean(errors.lastName)}
        smallText={touched.lastName && errors.lastName ? errors.lastName : ''}
      />
      <Input
        label="Email"
        value={values.email}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled
      />
      <Input
        label="User Name"
        value={values.userName}
        name="userName"
        onChange={handleChange}
        placeholder="something_cool"
        hasError={touched.userName && Boolean(errors.userName)}
        smallText={touched.userName && errors.userName ? errors.userName : ''}
      />

      <button type="submit" className="btn btn-primary">
        {loading && <span className="loading loading-spinner" />}
        Create Profile
      </button>
    </form>
  );
};

export default UserProfileForm;
