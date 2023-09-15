import styles from './styles.module.scss';

const StandardButton = ({ text, color = 'standard', click }) => {
  const colorClass = !['standard', 'orange'].includes(color)
    ? 'standard'
    : color;
  const classes = styles.btn + ' ' + styles[colorClass];
  return (
    <div className={styles.button}>
      <button className={classes} onClick={click}>
        {text}
      </button>
    </div>
  );
};

export default StandardButton;
