/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import clsx from 'clsx';
import Image from 'next/image';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Image
      src={'/Logo.png'}
      className={clsx('h-full w-full object-cover p-2', {})}
      fill={true}
      alt={''}
    />
  );
}
