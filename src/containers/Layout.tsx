import { ReactNode } from 'react';
import Header from '../components/Header/Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
