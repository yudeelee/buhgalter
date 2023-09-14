import styles from './styles.module.scss';
import Link from 'next/link';
import React from 'react';

const UserMenu = () => {
  return (
    <>
      <div className={styles.userImg}></div>
      <Link href='/user/login' className={styles.link}>
        Увійти
      </Link>
    </>
  );
};

export default UserMenu;
