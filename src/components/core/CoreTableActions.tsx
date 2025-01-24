'use client';

import { changePathAction } from '@/app/actions/main';
import { tr } from '@/utils';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { PressEvent } from '@react-types/shared/src/events';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

type ActionType = { icon: React.ReactNode; color: 'success' | 'danger' | 'warning'; onPress?: (e: PressEvent) => void };

interface CoreTableActionsProps {
  id: string;
  actions?: string[];
  setLoading: (loading: boolean) => void;
  onDeleteAction?: (id: string) => void;
}

const CoreTableActions: FunctionComponent<CoreTableActionsProps> = ({ actions = [], id, setLoading, onDeleteAction }) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const actionsMap: Record<string, ActionType> = {
    view: { icon: <EyeIcon className='w-4 h-4' />, color: 'warning', onPress: () => changePathAction(`${pathname}/${id}`) },
    edit: {
      icon: <PencilSquareIcon className='w-4 h-4' />,
      color: 'success',
      onPress: () => {
        setLoading(true);
        changePathAction(`${pathname}/${id}`);
      }
    },
    delete: { icon: <TrashIcon className='w-4 h-4' />, color: 'danger', onPress: onOpen }
  };

  const onDelete = async () => {
    if (onDeleteAction) {
      onDeleteAction(id);
    }
    onClose();
  };

  return (
    <div className='flex gap-4'>
      {actions.map((action, index) => {
        return (
          <Button
            size='sm'
            isIconOnly
            key={index}
            className='text-white'
            color={actionsMap[action].color}
            onPress={actionsMap[action].onPress}
          >
            {actionsMap[action].icon}
          </Button>
        );
      })}

      <Modal isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{tr(`Устгах`)}</ModalHeader>

              <ModalBody className='text-sm'>{tr('Та устгахдаа итгэлтэй байна уу?')}</ModalBody>

              <ModalFooter>
                <Button color='danger' onPress={onDelete} size='sm'>
                  {tr('Устгах')}
                </Button>
                <Button variant='light' onPress={onClose} size='sm'>
                  {tr('Цуцлах')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoreTableActions;
