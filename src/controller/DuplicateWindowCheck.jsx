
import { useEffect } from 'react';
import { DublicateTab } from '../Hooks/GeneralHooks';

const DuplicateWindowCheck = (pageId) => {
  const totalTabs = [];
  useEffect(() => {
    const DUPLICATE_WINDOW_KEY = `duplicate_tab_${pageId}`;

    const checkAndSetFlag = () => {
      if (!localStorage.getItem(DUPLICATE_WINDOW_KEY)) {
        localStorage.setItem(DUPLICATE_WINDOW_KEY, 'true');
        totalTabs.push(...DUPLICATE_WINDOW_KEY,`duplicate_tab_${pageId}`);
        localStorage.setItem('tot_open_tab',totalTabs);
      } else {
        window.location.href = '/error';
        window.close(); 
      }
    };

    checkAndSetFlag();

    const cleanup = () => {
      localStorage.removeItem(DUPLICATE_WINDOW_KEY);
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [pageId]);
};

export default DuplicateWindowCheck;
