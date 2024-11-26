import React, { useState, useCallback } from 'react';
import ConfirmationModalComponent from '../components/ConfirmationModal'; // Adjust the import path as necessary

interface UseConfirmationModalOptions {
  title?: string;
  subtitleText?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  confirmBtnClassName?: string;
}

interface UseConfirmationModalReturn {
  onConfirm: () => void;
  ConfirmationModal: React.FC;
}

const useConfirmationModal = (
  actionFunction: () => void,
  {
    title = 'Are you sure?',
    cancelBtnText = 'No',
    confirmBtnText = 'Yes',
    subtitleText = '',
    confirmBtnClassName = 'bg-red-500 text-white hover:bg-red-600',
  }: UseConfirmationModalOptions = {},
): UseConfirmationModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    actionFunction();
    setIsOpen(false);
  }, [actionFunction]);

  const onConfirm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const ConfirmationModal: React.FC = () => (
    <ConfirmationModalComponent
      title={title}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      cancelBtnText={cancelBtnText}
      confirmBtnText={confirmBtnText}
      confirmBtnClassName={confirmBtnClassName}
    >
      {subtitleText}
    </ConfirmationModalComponent>
  );

  return { onConfirm, ConfirmationModal };
};

export default useConfirmationModal;
