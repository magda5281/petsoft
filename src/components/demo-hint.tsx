import { cn } from '@/lib/utils';

type DemoHintProps = {
  children: React.ReactNode;
  hint: React.ReactNode;
  className?: string;
};

// Lightweight hover/focus tooltip used to show demo-only instructions.
// Shows on mouse hover and on keyboard focus of the wrapped element.
export default function DemoHint({ children, hint, className }: DemoHintProps) {
  return (
    <div className={cn('relative inline-block group', className)}>
      {children}
      <div
        role='tooltip'
        className='pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max max-w-xs -translate-x-1/2 rounded-md bg-zinc-900 px-3 py-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100'
      >
        {hint}
      </div>
    </div>
  );
}
