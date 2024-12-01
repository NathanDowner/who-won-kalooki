import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import AppHeader from './AppHeader';
import { NavActionBtn } from './NavBtnWrapper';

interface FullScreenModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: React.HTMLAttributes<HTMLImageElement>['className'];
  leftActionBtn?: NavActionBtn;
  rightActionBtn?: NavActionBtn;
}

export const FullScreenModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  leftActionBtn,
  rightActionBtn,
}: FullScreenModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose}>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex w-screen items-center justify-center p-4 bg-gray-600/80"
          >
            <motion.div
              key="modal-content"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              <DialogPanel
                className={clsx('bg-white p-4 w-screen h-screen', className)}
              >
                <DialogTitle className="font-semibold text-xl">
                  <AppHeader
                    title={title}
                    leftActionBtn={
                      leftActionBtn ?? {
                        icon: XMarkIcon,
                        label: 'Back',
                        onClick: onClose,
                        type: 'button',
                      }
                    }
                    rightActionBtn={rightActionBtn}
                  />
                </DialogTitle>
                <Description as="div" className="pt-4">
                  {children}
                </Description>
              </DialogPanel>
            </motion.div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
