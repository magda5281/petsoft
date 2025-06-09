'use client';
import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  { label: 'Dashboard', path: '/app/dashboard' },
  { label: 'Accounts', path: '/app/account' },
];

export default function AppHeader() {
  const activePathName = usePathname();

  return (
    <header className='flex items-center justify-between border-b border-white/10 py-2 '>
      <Logo />
      <nav>
        <ul className='flex space-x-4'>
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  'text-zinc-200 rounded-sm px-4 py-2 hover:text-white focus:text-white transition-colors duration-200',
                  { 'bg-black/10 text-white': activePathName === route.path }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
