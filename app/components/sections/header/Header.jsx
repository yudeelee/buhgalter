import styles from './styles.module.scss';
import Logo from './logo/Logo';
import Block from '../../ui/block/Block';
import Menu from './menu/Menu';
import UserMenu from './userMenu/UserMenu';

const menuItems = [
  { title: 'Головна', link: '/' },
  { title: 'Послуги', link: '/services' },
  { title: 'Навчання', link: '/teaching' },
  { title: 'Курси', link: '/courses' },
  { title: 'Контакти', link: '/contacts' },
];

const Header = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Block type='nav' padding={20} border={20} display='inline'>
        <Menu items={menuItems} />
      </Block>
      <Block type='nav' padding={20} border={20} display='inline'>
        <UserMenu />
      </Block>
    </div>
  );
};

export default Header;
