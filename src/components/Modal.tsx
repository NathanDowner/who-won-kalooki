import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: React.HTMLAttributes<HTMLImageElement>['className'];
}

const Modal = ({ isOpen, onClose, title, className, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={clsx(className)}>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[90] flex w-screen items-center justify-center p-4 bg-gray-600/80"
      >
        <DialogPanel className="bg-white p-4 rounded-md">
          <DialogTitle className="font-semibold text-xl">{title}</DialogTitle>
          <Description as="div" className="pt-4">
            {children}
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
