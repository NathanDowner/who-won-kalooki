import { PropsWithChildren, createContext, useContext, useState } from 'react';

type KeypadContextData = {
  openKeypad: (initialValue: string) => void;
  onCloseKeypad: (finalValue: string) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  isVisible: boolean;
  // onChange: (value: string) => void;
};

const KeypadContext = createContext<KeypadContextData>({} as KeypadContextData);

export const KeypadProvider = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('0');

  const openKeypad = (initialValue: string) => {
    setValue(initialValue);
    setIsVisible(true);
  };

  const onCloseKeypad = (finalValue: string) => {
    setValue(finalValue);
    setIsVisible(false);
  };

  return (
    <KeypadContext.Provider
      value={{ isVisible, openKeypad, onCloseKeypad, value, setValue }}
    >
      {children}
    </KeypadContext.Provider>
  );
};

export function useKeypad() {
  const context = useContext(KeypadContext);

  if (!context) {
    throw new Error('useKeypad must be used within a KeypadProvider');
  }

  return context;
}
