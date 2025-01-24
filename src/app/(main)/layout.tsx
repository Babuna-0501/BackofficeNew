import { FunctionComponent, ReactNode } from 'react';
import NextAuthProvider from '@/providers/NextAuthProvider';
import NavContainer from '@/components/navigations/NavContainer';
import { getSuppliers } from '@/services';
import { getCookie } from '@/app/actions/cookies';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  const suppliers = await getSuppliers({ limit: 1000 });
  const supplierId = (await getCookie('supplierId'))?.value || '';

  return (
    <NextAuthProvider>
      <NavContainer suppliers={suppliers?.data ?? []} supplierId={supplierId}>
        {children}
      </NavContainer>
    </NextAuthProvider>
  );
};

export default MainLayout;
