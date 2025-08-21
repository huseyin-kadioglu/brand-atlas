export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="brand-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
