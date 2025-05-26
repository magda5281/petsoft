import Image from 'next/image';
import logoSrc from '../../public/logo.svg';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <Image
        src={logoSrc}
        alt='PetSoft Logo'
        priority
        loading='eager'
        draggable={false}
        unoptimized={true}
      />
    </Link>
  );
}
