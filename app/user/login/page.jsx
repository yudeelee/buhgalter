'use client';

import Header from '@/app/components/sections/header/Header';
import styles from './styles.module.scss';
import Block from '@/app/components/ui/block/Block';
import InputField from '@/app/components/ui/inputs/inputField/InputField';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import StandardButton from '@/app/components/ui/buttons/standardButton/StandardButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

import Dloader from '@/app/components/ui/loaders/d3loader/Dloader';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    redirect('/');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const enter = async () => {
    let options = {
      redirect: false,
      email: email,
      password: password,
    };
    setIsLoading(true);
    const res = await signIn('credentials', options);
    setIsLoading(false);
    if (res?.error) {
      setError(true);
      console.log(res);
    } else {
      setEmail('');
      setPassword('');
      router.replace('/');
    }
  };

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
                error={error}
                type='email'
                placeholder='Введіть Ваш email'
                label='E-mail'
                change={(value) => {
                  setError(false);
                  setEmail(value);
                }}
              />
              <InputField
                error={error}
                type='password'
                placeholder='Введіть Ваш пароль'
                label='Пароль'
                change={(value) => {
                  setError(false);
                  setPassword(value);
                }}
              />
              <div className={styles.pl}>
                <StandardButton text='Увійти' color='orange' click={enter} />
              </div>
            </div>
            <p className={styles.normal}>
              Ще не зареєстровані?{' '}
              <Link href='/user/registration' className={styles.link}>
                Реєстрація
              </Link>
            </p>
          </Block>
          <div className={styles.center}></div>
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
        {isLoading && <Dloader />}
      </div>
      ;
    </>
  );
};

export default Login;
