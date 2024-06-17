import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: React.HTMLAttributes<HTMLImageElement>['className'];
  closeOnBackdropClick?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  className,
  closeOnBackdropClick = true,
  children,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className={clsx(className)}>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
            className="fixed inset-0 z-[90] flex w-screen items-center justify-center p-4 bg-gray-600/80"
          >
            <motion.div
              key="modal-content"
              initial={{ rotate: -40, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -40, scale: 0.5, opacity: 0 }}
            >
              <DialogPanel className="bg-white p-4 rounded-md">
                <DialogTitle className="font-semibold text-xl">
                  {title}
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

export default Modal;
