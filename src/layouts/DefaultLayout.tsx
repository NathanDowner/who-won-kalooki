import Header from '@/components/Header';
import { PropsWithChildren } from 'react';

const DefaultLayout = ({children}: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="p-4 max-w-5xl mx-auto">
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
