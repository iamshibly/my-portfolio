import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import NeuralCanvas from '../components/NeuralCanvas';
import PaletteSwitcher from '../components/PaletteSwitcher';
import TopNav from './TopNav';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  /* Safety: force-reveal any elements that IntersectionObserver missed */
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        el.classList.add('visible');
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <NeuralCanvas fixed nodeCount={60} connectionDistance={150} opacity={0.25} />
      <TopNav />
      <main style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </main>
      <PaletteSwitcher />
    </>
  );
};

export default Layout;
