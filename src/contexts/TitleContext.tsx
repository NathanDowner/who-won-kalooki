import { PropsWithChildren, createContext, useContext, useState } from 'react';

type TitleContextData = {
  title: string;
  setTitle: (title: string) => void;
};

const TitleContext = createContext<TitleContextData>({
  title: '',
  setTitle: () => {},
});

export const TitleProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState('Default Title');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
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
