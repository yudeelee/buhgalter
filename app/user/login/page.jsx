'use client';

import Header from '@/app/components/sections/header/Header';
import styles from './styles.module.scss';
import Block from '@/app/components/ui/block/Block';
import InputField from '@/app/components/ui/inputs/inputField/InputField';

import { signIn, getSession } from 'next-auth/react';

const Login = () => {
  const dots = new Array(10);
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.title}>
          <Block padding={20} border={20}>
            <h1>Вхід</h1>
          </Block>
        </div>
        <div className={styles.loginwrapper}>
          <Block padding={40} border={20}>
            <div className={styles.left}>
              <InputField
                type='email'
                placeholder='Введіть Ваш email'
                label='E-mail'
              />
              <InputField
                type='password'
                placeholder='Введіть Ваш пароль'
                label='Пароль'
              />
            </div>
          </Block>
          <div className={styles.center}>
            {/* {new Array(10).fill(2).map((item, idx) => (
              <div key={idx} className={styles.circle}></div>
            ))} */}
          </div>
          <Block padding={40} border={20}>
            <div className={styles.right}>
              <div className={styles.social} onClick={() => signIn('google')}>
                <img src='/img/gl.png' alt='' />
              </div>
              <div className={styles.social} onClick={() => signIn('facebook')}>
                <img src='/img/fb.png' alt='' />
              </div>
              <div className={styles.social} onClick={() => signIn('twitter')}>
                <img src='/img/tw.png' alt='' />
              </div>
            </div>
          </Block>
        </div>
      </div>
      ;
    </>
  );
};

export default Login;
