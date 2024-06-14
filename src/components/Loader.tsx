import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebouncedValue } from '@mantine/hooks';

interface LoaderProps {
  isLoading: boolean;
  text?: string;
}

const Loader = ({ isLoading, text = 'Loading' }: LoaderProps) => {
  const [debouncedLoading] = useDebouncedValue(isLoading, 500);

  return (
    <AnimatePresence>
      {debouncedLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white inset-0 fixed z-50 flex flex-col justify-center items-center"
        >
          <motion.div
            transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }}
            animate={{
              y: [0, -20, -20, -20, 0, 0],
              scale: [1, 1.2, 1.2, 1.2, 1, 1],
              rotate: [0, -20, 20, -20, 20, 0],
            }}
            // animate={{
            //   scale: [1, 1.2, 1.2, 1.2, 1],
            //   rotate: [0, 0, 360, 360, 360],
            //   y: [0, -20, -20, -20, 0],
            // }}
          >
            <Logo className="h-32" />
          </motion.div>
          <h1 className="flex text-xl gap-1 -mt-8">
            {text}{' '}
            <span className="loading loading-dots loading-xs relative -bottom-1"></span>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
