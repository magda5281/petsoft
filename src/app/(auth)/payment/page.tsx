'use client';
import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';

export default function PaymentPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (searchParams.success === 'true') {
      toast.success(
        'Payment successful! You now have lifetime access to PetSoft.',
        { id: 'payment-success' }
      );
    } else if (searchParams.cancelled === 'true') {
      toast.error('Payment cancelled! You can try again.', {
        id: 'payment-error',
      });
    }
  }, [searchParams.success, searchParams.cancelled]);

  return (
    <main className='flex flex-col items-center justify-center space-y-10 mt-4'>
      <H1>PetSoft access requires payment</H1>
      {searchParams && searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push('/app/dashboard');
          }}
        >
          Access PetSoft
        </Button>
      )}
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
