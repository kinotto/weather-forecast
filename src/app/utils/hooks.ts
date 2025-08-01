import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      if (width <= 767) setDevice('mobile');
      else if (width <= 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    updateDevice(); // initial check
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return device;
}
