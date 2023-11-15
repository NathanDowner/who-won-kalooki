import { useTitle } from '@/contexts/TitleContext';
import { useEffect } from 'react';

const useSetPageTitle = (title: string) => {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(title);
  }, []);
};

export default useSetPageTitle;
