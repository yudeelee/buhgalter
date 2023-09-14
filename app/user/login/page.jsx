import Header from '@/app/components/sections/header/Header';
import styles from './styles.module.scss';
import Block from '@/app/components/ui/block/Block';
import InputField from '@/app/components/ui/inputs/inputField/InputField';

const Login = () => {
  return (
    <>
      <Header />
      <div className={styles.login}>
        <Block padding={40} border={30}>
          <div className={styles.loginwrapper}>
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
            <div className={styles.center}></div>
            <div className={styles.right}>
              <div className={styles.social}></div>
              <div className={styles.social}></div>
              <div className={styles.social}></div>
            </div>
          </div>
        </Block>
      </div>
      ;
    </>
  );
};

export default Login;
