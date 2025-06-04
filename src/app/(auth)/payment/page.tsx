'use client';
import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  console.log('searchParams', searchParams);
  const hasSuccess = searchParams?.get('success');
  const hasCancelled = searchParams?.get('cancelled');

  const [status, setStatus] = useState<'success' | 'cancelled' | ''>('');
  useEffect(() => {
    if (hasSuccess) {
      setStatus('success');
    }
    if (hasCancelled) {
      setStatus('cancelled');
    }
    if (!hasSuccess && !hasCancelled) {
      setStatus('');
    }
  }, [searchParams]);

  if (status === 'success') {
    toast.success(
      'Payment successful! You now have lifetime access to PetSoft.'
    );
  } else if (status === 'cancelled') {
    toast.error('Payment cancelled! You can try again.');
  }

  return (
    <main className='flex flex-col items-center justify-center space-y-10 mt-4'>
      <H1>PetSoft access requires payment</H1>
      {!(searchParams && hasSuccess) && (
        <Button
          onClick={async () => {
            await createCheckoutSession();
          }}
        >
          Buy lifetime access for £299
        </Button>
      )}
    </main>
  );
}
