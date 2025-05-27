import React from 'react';

export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col max-w-[65.64rem] mx-auto px-4 min-h-screen'>
      {children}
    </div>
  );
}
