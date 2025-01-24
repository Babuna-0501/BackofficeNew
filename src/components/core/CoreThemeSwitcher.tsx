'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@heroui/react";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function CoreThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    if (theme !== 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button isIconOnly onPress={changeTheme} className='rounded-full'>
      <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
}

export default CoreThemeSwitcher;
