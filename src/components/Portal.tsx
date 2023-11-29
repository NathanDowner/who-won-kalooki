import { PropsWithChildren, useEffect, useRef, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const portalRoot = document.getElementById('portal');
    if (!portalRoot || !elRef.current) return;

    portalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        portalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current!);
};

export default Portal;
