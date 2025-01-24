import type { Metadata } from 'next';
import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'E-bazaar',
  description: 'Нэгдсэн хялбар захиалга',
  icons: '/assets/logos/logo-symbol.svg'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-default-100'>
        <HeroUIProvider>
          <ThemeProvider attribute='class' defaultTheme='light'>
            {children}
            <ToastContainer className='text-xs' />
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
