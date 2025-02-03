import { FunctionComponent, ReactNode } from 'react';
import NextAuthProvider from '@/providers/NextAuthProvider';
import NavContainer from '@/components/navigations/NavContainer';
import { getCookie } from '@/app/actions/cookies';
import { getSupplier } from '@/services';
import { SupplierType } from '@/types';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  let supplier;

  const supplierId = (await getCookie('supplierId'))?.value || '';

  if (supplierId) {
    supplier = await getSupplier<SupplierType>(supplierId);
  }

  return (
    <NextAuthProvider>
      <NavContainer supplier={supplier}>{children}</NavContainer>
    </NextAuthProvider>
  );
};

export default MainLayout;
