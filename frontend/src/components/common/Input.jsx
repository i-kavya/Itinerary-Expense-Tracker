const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <input
      {...props}
      className="w-full border p-2 rounded focus:outline-none focus:ring"
    />
  </div>
);

export default Input;
