'use client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: 'add' | 'edit' | 'checkout';
  onClick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  actionType,
  disabled,
  children,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout')
    return (
      <Button onClick={onClick} variant='secondary' disabled={disabled}>
        {children}
      </Button>
    );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size='icon' aria-label='Add new pet'>
            <PlusIcon className='h-6 w-6' />
          </Button>
        ) : (
          <Button variant='secondary'>{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby='form'>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new pet' : 'Edit'}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
