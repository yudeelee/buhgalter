import Link from 'next/link';
import styles from './styles.module.scss';

const Menu = ({ items }) => {
  return (
    <ul className={styles.menu}>
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
