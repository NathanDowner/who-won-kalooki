import { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ANIMATION_DURATION } from '@/utils/constants';

interface Props extends PropsWithChildren {
  withBackground?: boolean;
  show: boolean;
}

const SlideUp = ({ show, withBackground = true, children }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {withBackground && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-[60] fixed inset-0 bg-black/20"
            />
          )}

          <motion.div
            className="z-[61] fixed bottom-0"
            transition={{
              type: 'tween',
              duration: ANIMATION_DURATION,
            }}
            animate={{ y: 0 }}
            initial={{ y: '100%' }}
            exit={{ y: '100%' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideUp;
