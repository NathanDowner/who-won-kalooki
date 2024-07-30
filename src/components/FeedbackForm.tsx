import { useAuth } from '@/contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { CreateFeedbackDto, FeedbackType } from '@/models/feedback.type';
import Select from './Select';
import { toSentenceCase, withAsyncHandling } from '@/utils';
import { useState } from 'react';
import { submitFeedback } from '@/api/messages.api';
import Button from './Button';

interface FeedbackFormProps {
  onSuccess: () => void;
}

const FEEDBACK_OPTIONS: FeedbackType[] = [
  FeedbackType.Suggestion,
  FeedbackType.Review,
  FeedbackType.Bug,
  FeedbackType.Other,
];

const FeedbackForm = ({ onSuccess }: FeedbackFormProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik<CreateFeedbackDto>({
      initialValues: {
        feedback: '',
        email: user?.email || '',
        name: user?.displayName || '',
        userId: user?.uid || '',
        feedbackType: undefined,
      },
      validationSchema: Yup.object().shape({
        feedback: Yup.string().required('This is a required field'),
        email: Yup.string().email().required('This is a required field'),
        name: Yup.string().required('This is a required field'),
        feedbackType: Yup.string().required('This is a required field'),
      }),
      onSubmit: async (values) => {
        setLoading(true);
        const id = await withAsyncHandling<string>(
          submitFeedback(values),
          'Feedback Received!',
        );
        setLoading(false);
        if (id) {
          onSuccess();
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={touched.name && Boolean(errors.name)}
        smallText={touched.name && errors.name ? errors.name : ''}
      />

      <Input
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={touched.email && Boolean(errors.email)}
        smallText={touched.email && errors.email ? errors.email : ''}
      />

      <Select<FeedbackType>
        options={FEEDBACK_OPTIONS}
        valueSelector={(value) => value.toString()}
        labelSelector={(value) => toSentenceCase(value.toString())}
        label="Feedback Type"
        name="feedbackType"
        value={values.feedbackType}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={touched.feedbackType && Boolean(errors.feedbackType)}
        smallText={
          touched.feedbackType && errors.feedbackType ? errors.feedbackType : ''
        }
      />
      <Input
        label="Feedback"
        name="feedback"
        type="textarea"
        value={values.feedback}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={touched.feedback && Boolean(errors.feedback)}
        smallText={touched.feedback && errors.feedback ? errors.feedback : ''}
      />
      <div className="flex justify-center">
        <Button type="submit" loading={loading}>
          Send Feedback
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
