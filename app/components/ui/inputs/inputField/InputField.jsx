import styles from './styles.module.scss';

const InputField = ({ type = 'text', change, placeholder, label }) => {
  const inputType = !['text', 'password', 'email', 'number'].includes(type)
    ? 'text'
    : type;
  return (
    <div className={styles.formData}>
      {label && <label>{label}</label>}
      <input type={inputType} placeholder={placeholder} onChange={change} />
    </div>
  );
};

export default InputField;