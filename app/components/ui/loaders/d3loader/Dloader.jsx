import styles from './styles.module.scss';

const Dloader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        {new Array(10).fill(0).map((item, idx) => (
          <div className={styles.dot}></div>
        ))}
      </div>
    </div>
  );
};

export default Dloader;
