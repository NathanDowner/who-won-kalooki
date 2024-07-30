import { db } from '@/lib/firebase';
import { CreateFeedbackDto } from '@/models/feedback.type';
import { addDoc, collection } from 'firebase/firestore';

export async function submitFeedback(feedback: CreateFeedbackDto) {
  const response = await addDoc(collection(db, 'feedback'), feedback);
  return response.id;
}
