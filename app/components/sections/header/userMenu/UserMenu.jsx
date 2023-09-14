import styles from './styles.module.scss';
import Link from 'next/link';
import React from 'react';
import { signOut, signIn, useSession } from 'next-auth/react';

const UserMenu = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <div className={styles.userImg}>
            <img src={session?.user.image} alt='' />
          </div>
          <button className={styles.link} onClick={() => signOut()}>
            {session?.user.name.length > 10
              ? session?.user.name.substring(0, 10) + '...'
              : session?.user.name}
          </button>
        </>
      ) : (
        <>
          <div className={styles.userImg}>
            <img src={session?.user.image} alt='' />
          </div>
          <Link href='/user/login' className={styles.link}>
            Увійти
          </Link>
        </>
      )}
    </>
  );
};

export default UserMenu;
