import { MutableRefObject, PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ButtonContainer = ({ children }: PropsWithChildren) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const buttonContainer = document.getElementById('button-container');
    if (!buttonContainer || !elRef.current) return;

    buttonContainer.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        buttonContainer.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <footer className="flex fixed bottom-4 gap-4 px-6 w-screen">
      {children}
    </footer>,
    elRef.current!,
  );
};

export default ButtonContainer;
