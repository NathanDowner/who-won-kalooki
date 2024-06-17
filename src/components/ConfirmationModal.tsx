import React from 'react';
import Modal, { ModalProps } from './Modal';

interface ConfirmationModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmBtnText: string;
  cancelBtnText: string;
  confirmBtnClassName?: React.HTMLAttributes<HTMLImageElement>['className'];
  cancelBtnClassName?: React.HTMLAttributes<HTMLImageElement>['className'];
  closeOnBackdropClick?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  title,
  onClose,
  className,
  cancelBtnText,
  confirmBtnText,
  onCancel,
  onConfirm,
  children,
  confirmBtnClassName = '',
  cancelBtnClassName = '',
  closeOnBackdropClick = true,
}: ConfirmationModalProps) => {
  function handleClick(handler?: () => void) {
    if (handler) handler();
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      className={className}
      closeOnBackdropClick={closeOnBackdropClick}
    >
      <div className="mb-4">{children}</div>
      <div className="flex justify-end gap-4">
        <button
          className={`btn ${cancelBtnClassName}`}
          onClick={() => handleClick(onCancel)}
        >
          {cancelBtnText}
        </button>
        <button
          className={`btn btn-primary ${confirmBtnClassName}`}
          onClick={() => handleClick(onConfirm)}
        >
          {confirmBtnText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
