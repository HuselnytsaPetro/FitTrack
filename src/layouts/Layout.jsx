import { Outlet } from 'react-router-dom';
import { TabSwitcher } from '../components/TabSwitcher/TabSwticher';
import { Footer } from '../components/Footer/Footer';

export default function Layout() {
  return (
    <>
      <TabSwitcher />
      <Outlet />
      <Footer />
    </>
  );
}
