import { FunctionComponent, ReactNode } from 'react';
import NextAuthProvider from '@/providers/NextAuthProvider';
import NavContainer from '@/components/navigations/NavContainer';
import { getCookie } from '@/app/actions/cookies';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  return (
    <NextAuthProvider>
      <NavContainer supplierId={supplierId}>{children}</NavContainer>
    </NextAuthProvider>
  );
};

export default MainLayout;
