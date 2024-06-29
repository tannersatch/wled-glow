import WLED from '@/api/wled-json';
import { useEffect, useState } from 'react';

const useWled = (ip: string) => {
  const cleanIp = ip?.replaceAll('"', '');
  const [wled, setWled] = useState<WLED | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initWled = async () => {
      if (cleanIp) {
        const wledInstance = new WLED({ host: cleanIp });
        await wledInstance.init();
        setWled(wledInstance);
        setIsReady(wledInstance.isReady);
      }
    };
    initWled();
  }, [cleanIp]);

  const retry = async () => {
    if (wled) {
      await wled.init();
      setIsReady(wled.isReady);
    }
  };

  return { wled, isReady, retry };
};

export default useWled;
