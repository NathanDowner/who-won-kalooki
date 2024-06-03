import { PropsWithChildren, createContext, useContext, useState } from 'react';

type TitleContextData = {
  title: string;
  setTitle: (title: string) => void;
  showShadow: boolean;
  setShowShadow: (showShadow: boolean) => void;
};

const TitleContext = createContext<TitleContextData>({
  title: '',
  setTitle: () => {},
  showShadow: true,
  setShowShadow: () => {},
});

export const TitleProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState('');
  const [showShadow, setShowShadow] = useState(true);

  return (
    <TitleContext.Provider
      value={{ title, setTitle, showShadow, setShowShadow }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export function useTitle() {
  const context = useContext(TitleContext);

  if (!context)
    throw new Error('useTitle must be used within an TitleProvider');

  return context;
}
