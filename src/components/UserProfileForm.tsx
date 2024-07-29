import { CreateProfileDto, UserProfile } from '@/models/user.model';
import { User } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { getUserByUserName, saveUserProfile } from '@/api/user.api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

interface UserProfileFormProps {
  onSuccess: (profile: UserProfile) => void;
  user: User;
}

const UserProfileForm = ({ onSuccess, user }: UserProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik<CreateProfileDto>({
    initialValues: {
      id: user.uid,
      firstName: user.displayName!.split(' ')[0],
      lastName: user.displayName!.split(' ')[1],
      email: user.email!,
      userName: '',
      imgUrl: user.photoURL || undefined,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('This is a required field'),
      firstName: Yup.string().required('This is a required field'),
      lastName: Yup.string().required('This is a required field'),
      userName: Yup.string()
        .required('This is a required field')
        .min(4)
        .max(20)
        .matches(
          /^[a-zA-Z0-9_]*$/,
          'Only letters, numbers, and underscores are allowed',
        ),
    }),
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      try {
        // check for unique username
        const user = await getUserByUserName(values.userName);
        if (user) {
          setErrors({ userName: 'This username is already taken' });
          return;
        }

        // create profile
        const { firstName, lastName, ...rest } = values;
        const newProfile = { ...rest, fullName: `${firstName} ${lastName}` };
        await saveUserProfile(newProfile);
        onSuccess(newProfile);
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
      {!showForm ? (
        <p className="text-gray-500 mb-6">
          Hey! Looks like you don't have a profile yet. Let's take a few seconds
          to get you set up!
        </p>
      ) : (
        <>
          <Input
            label="First Name"
            value={values.firstName}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
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
            hasError={touched.lastName && Boolean(errors.lastName)}
            smallText={
              touched.lastName && errors.lastName ? errors.lastName : ''
            }
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
            placeholder="something_cool..."
            hasError={touched.userName && Boolean(errors.userName)}
            smallText={
              touched.userName && errors.userName ? errors.userName : ''
            }
          />
        </>
      )}

      <button
        // type="button"
        type={!showForm ? 'button' : 'submit'}
        onClick={() => {
          if (!showForm) {
            setShowForm(true);
            new Promise((resolve) =>
              setTimeout(() => {
                resetForm(); // the btn type switching is causing the form to know
                resolve(true);
              }, 0),
            );
          }
        }}
        className="btn btn-primary"
      >
        {loading && <span className="loading loading-spinner" />}
        Create Profile
      </button>
    </form>
  );
};

export default UserProfileForm;
