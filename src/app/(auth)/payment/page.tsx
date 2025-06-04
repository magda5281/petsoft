'use client';
import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function PaymentPage({ searchParams }) {
  const [isPending, startTransition] = useTransition();
  //TODO: improve toast implementation
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (searchParams.success || searchParams.cancelled) {
      setStatus(true);
    }
  }, [searchParams]);

  if (searchParams.success) {
    toast.success(
      'Payment successful! You now have lifetime access to PetSoft.'
    );
  } else if (searchParams.cancelled) {
    toast.error('Payment cancelled! You can try again.');
  }

  return (
    <main className='flex flex-col items-center justify-center space-y-10 mt-4'>
      <H1>PetSoft access requires payment</H1>
      {!(searchParams && searchParams.success) && (
        <Button
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
          disabled={isPending}
        >
          Buy lifetime access for £299
        </Button>
      )}
    </main>
  );
}
