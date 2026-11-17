import { InfoCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

type DemoHintProps = {
  children: React.ReactNode;
  title: string;
  hint: React.ReactNode;
  className?: string;
};

// Hover/focus tooltip for demo-only instructions.
// Styled to match the app's Sonner "info" toasts (richColors).
export default function DemoHint({
  children,
  title,
  hint,
  className,
}: DemoHintProps) {
  return (
    <div className={cn('relative inline-block group', className)}>
      {children}
      <div
        role='tooltip'
        className='pointer-events-none invisible absolute left-1/2 top-full z-50 mt-3 w-max max-w-[320px] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'
      >
        {/* arrow */}
        <span className='absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[hsl(221,91%,91%)] bg-[hsl(208,100%,97%)]' />
        <div className='relative flex gap-2.5 rounded-lg border border-[hsl(221,91%,91%)] bg-[hsl(208,100%,97%)] p-4 text-left text-[13px] leading-relaxed text-[hsl(210,92%,45%)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
          <InfoCircledIcon className='mt-0.5 h-4 w-4 shrink-0' />
          <div>
            <p className='font-medium'>{title}</p>
            <div className='mt-0.5'>{hint}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
