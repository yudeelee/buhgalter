import styles from './styles.module.scss';

const Block = ({
  children,
  type = 'block',
  border = 50,
  display = 'block',
  padding = 50,
}) => {
  const borderClass = ![10, 20, 30, 40, 50].includes(border) ? '10' : border;
  const paddingClass = ![20, 30, 40, 50, 60, 70, 80, 90, 100].includes(padding)
    ? '20'
    : padding;
  const displayClass = !['block', 'inline'].includes(display)
    ? 'block'
    : display;
  const classes =
    styles.block +
    ' ' +
    styles[`border-${borderClass}`] +
    ' ' +
    styles[`display-${displayClass}`] +
    ' ' +
    styles[`padding-${paddingClass}`];
  return (
    <Wrapper type={type} classes={classes}>
      <div className={styles.ddd}>{children}</div>
    </Wrapper>
  );
};

const Wrapper = ({ children, type, classes }) => {
  if (type === 'section') {
    return <section className={classes}>{children}</section>;
  }
  if (type === 'article') {
    return <article className={classes}>{children}</article>;
  }
  if (type === 'main') {
    return <main className={classes}>{children}</main>;
  }
  if (type === 'nav') {
    return <nav className={classes}>{children}</nav>;
  }
  return <div className={classes}>{children}</div>;
};

export default Block;
