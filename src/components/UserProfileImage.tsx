import clsx from 'clsx';
import defaultUserImg from '@/assets/default-user.svg';

type Props = {
  className?: string;
  imgUrl?: string;
};

const UserProfileImage = ({ className, imgUrl }: Props) => {
  return (
    <img
      src={imgUrl ?? defaultUserImg}
      className={clsx('border-black border-4 rounded-full', className)}
    />
  );
};

export default UserProfileImage;
