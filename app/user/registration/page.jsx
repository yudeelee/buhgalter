'use client';

import Header from '@/app/components/sections/header/Header';
import styles from './styles.module.scss';
import Block from '@/app/components/ui/block/Block';
import InputField from '@/app/components/ui/inputs/inputField/InputField';

import { getSession, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import StandardButton from '@/app/components/ui/buttons/standardButton/StandardButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import Dloader from '@/app/components/ui/loaders/d3loader/Dloader';

import { redirect } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    redirect('/');
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const [errmessage, setErrMessage] = useState('');
  const [sucmessage, setSucMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!nameError && !emailError && !passwordError && !confirmError) {
      setErrMessage('');
    }
  }, [nameError, emailError, passwordError, confirmError]);

  const enter = async () => {
    if (password !== confirm) {
      setPasswordError(true);
      setConfirmError(true);
      setErrMessage('Пароль і підтвердження паролю не зівпадають');
      return;
    }

    const req = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    const res = await axios.post('/api/registration', req);
    setIsLoading(false);
    const data = res.data;
    if (data.err) {
      if (data.message === 'Будь-ласка заповніть усі поля') {
        if (name === '') setNameError(true);
        if (email === '') setEmailError(true);
        if (password === '') setPasswordError(true);
        if (confirm === '') setConfirmError(true);
        setErrMessage(data.message);
      }
      if (
        data.message === 'Некоректний E-mail' ||
        data.message === 'Користувач з таким E-mail вже існує'
      ) {
        setEmailError(true);
        setErrMessage(data.message);
      }
      if (
        data.message === 'Довжина Вашого паролю має бути більша за 6 і менша 36'
      ) {
        setPasswordError(true);
        setConfirmError(true);
        setErrMessage(data.message);
      }
      if (data.message === 'Щось хибне трапилось на сервері') {
        setErrMessage(data.message);
      }
    } else {
      setSucMessage(data.message);
      setTimeout(() => {
        router.replace('/user/login');
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.title}>
          <Block padding={20} border={20}>
            <h1>Реєстрація</h1>
          </Block>
        </div>
        <div className={styles.loginwrapper}>
          <Block padding={40} border={20}>
            {errmessage && <p className={styles.errormsg}>{errmessage}</p>}
            {sucmessage && <p className={styles.succesmsg}>{sucmessage}</p>}
            <div className={styles.left}>
              <InputField
                error={nameError}
                type='text'
                placeholder="Введіть Ваш ім'я"
                label="Ім'я"
                change={(value) => {
                  setNameError(false);
                  setName(value);
                }}
              />
              <InputField
                error={emailError}
                type='email'
                placeholder='Введіть Ваш email'
                label='E-mail'
                change={(value) => {
                  setEmailError(false);
                  setEmail(value);
                }}
              />
              <InputField
                error={passwordError}
                type='password'
                placeholder='Введіть Ваш пароль'
                label='Пароль'
                change={(value) => {
                  setPasswordError(false);
                  setPassword(value);
                }}
              />
              <InputField
                error={confirmError}
                type='password'
                placeholder='Введіть повторно Ваш пароль'
                label='Підтвердження паролю'
                change={(value) => {
                  setConfirmError(false);
                  setConfirm(value);
                }}
              />
              <div className={styles.pl}>
                <StandardButton
                  text='Зареєструватися'
                  color='orange'
                  click={enter}
                />
              </div>
            </div>
            <p className={styles.normal}>
              Вже зареєстровані?{' '}
              <Link href='/user/login' className={styles.link}>
                Увійдіть
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
