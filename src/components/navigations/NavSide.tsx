import { FunctionComponent } from 'react';
import { MENU_LIST } from '@/configs';
import Link from 'next/link';
import { cn, tr } from '@/utils';
import { usePathname } from 'next/navigation';
import { Button, Tooltip } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import CoreSvgIcon from '@/components/core/CoreSvgIcon';
import CoreImage from '@/components/core/CoreImage';

interface NavSideProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavSide: FunctionComponent<NavSideProps> = props => {
  const { isOpen, setIsOpen } = props;

  const pathname = usePathname();

  return (
    <div
      className={cn(
        'fixed top-0 left-0 bottom-0 transition-all z-50 bg-background flex flex-col gap-4',
        isOpen ? 'w-60' : 'w-20'
      )}
    >
      <Button
        className='rounded-full absolute -right-4 top-16 z-50'
        isIconOnly
        onPress={() => setIsOpen(!isOpen)}
        variant='flat'
        size='sm'
      >
        {isOpen ? <ChevronLeftIcon className='w-4 h-4' /> : <ChevronRightIcon className='w-4 h-4' />}
      </Button>

      <div className='flex items-center justify-center w-full h-14'>
        <CoreImage src={isOpen ? '/assets/logos/logo-ebazaar.svg' : '/assets/logos/logo-admin.svg'} />
      </div>

      <div className='relative w-full flex-1 flex flex-col px-3.5 gap-4 shadow-lg'>
        <div className='text-xs w-full text-center'>{tr('Цэс')}</div>

        <div className='flex-1 w-full flex-col flex gap-2'>
          {MENU_LIST.map((menu, index: number) => {
            const isActive = pathname.startsWith(menu.pathname);

            return (
              <Tooltip
                key={index}
                content={menu.label}
                showArrow={true}
                placement='right'
                color={isActive ? 'primary' : 'default'}
                className='text-xs'
                shadow='md'
              >
                <Button
                  as={Link}
                  href={menu.pathname}
                  color={isActive ? 'primary' : 'default'}
                  size='sm'
                  fullWidth
                  className={`min-w-full ${isOpen ? 'justify-start' : 'justify-center'}`}
                  variant={isActive ? 'solid' : 'ghost'}
                  isIconOnly={!isOpen}
                  startContent={<CoreSvgIcon src={`/assets/menu/${menu.icon}.svg`} className={`${isActive && 'bg-white'}`} />}
                >
                  {isOpen && tr(menu.label)}
                </Button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavSide;
