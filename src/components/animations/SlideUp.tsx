import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION } from '@/utils/constants';

interface Props extends PropsWithChildren {
  withBackground?: boolean;
  show: boolean;
}

const SlideUp = ({ show, withBackground = false, children }: Props) => {
  return (
    <>
      {withBackground && show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-30 fixed inset-0 bg-black/20"
        />
      )}
      <motion.div
        className="z-30 fixed bottom-0"
        transition={{
          type: 'tween',
          duration: ANIMATION_DURATION,
        }}
        animate={{ y: show ? 0 : '100%' }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SlideUp;
