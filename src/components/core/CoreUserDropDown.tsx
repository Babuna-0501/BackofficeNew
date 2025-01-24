'use client';

import { tr } from '@/utils';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { logoutAction } from '@/app/actions/auth';

function CoreUserDropDown() {
  return (
    <Dropdown>
      <DropdownTrigger className='cursor-pointer'>
        <Avatar />
      </DropdownTrigger>

      <DropdownMenu aria-label='actions'>
        <DropdownItem key='logout' className='text-danger' color='danger' onPress={() => logoutAction()}>
          {tr('Гарах')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default CoreUserDropDown;
