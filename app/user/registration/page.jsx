'use client';

import Header from '@/app/components/sections/header/Header';
import styles from './styles.module.scss';
import Block from '@/app/components/ui/block/Block';
import InputField from '@/app/components/ui/inputs/inputField/InputField';

import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import StandardButton from '@/app/components/ui/buttons/standardButton/StandardButton';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const dots = new Array(10);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const enter = async () => {
    const req = {
      name,
      email,
      password,
    };
    const res = await axios.post('/api/registration', req);
    console.log(res.data);
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
            <div className={styles.left}>
              <InputField
                type='text'
                placeholder="Введіть Ваш ім'я"
                label="Ім'я"
                change={(value) => setName(value)}
              />
              <InputField
                type='email'
                placeholder='Введіть Ваш email'
                label='E-mail'
                change={(value) => setEmail(value)}
              />
              <InputField
                type='password'
                placeholder='Введіть Ваш пароль'
                label='Пароль'
                change={(value) => setPassword(value)}
              />
              <InputField
                type='password'
                placeholder='Введіть повторно Ваш пароль'
                label='Підтвердження паролю'
                change={(value) => setConfirm(value)}
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
