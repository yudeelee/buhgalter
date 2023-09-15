import styles from './styles.module.scss';

const InputField = ({ type = 'text', change, placeholder, label, error }) => {
  const inputType = !['text', 'password', 'email', 'number'].includes(type)
    ? 'text'
    : type;
  return (
    <div className={`${styles.formData} ${error ? styles.error : ''}`}>
      {label && <label>{label}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
      />
    </div>
  );
};

export default InputField;
