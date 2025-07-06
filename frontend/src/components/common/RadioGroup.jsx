const RadioGroup = ({ label, name, options, selected, onChange }) => (
  <div className="mb-4">
    <p className="font-medium mb-1">{label}</p>
    {options.map((opt) => (
      <label key={opt.name} className="block">
        <input
          type="radio"
          name={name}
          checked={selected.name === opt.name}
          onChange={() => onChange(opt)}
          className="mr-2"
        />
        {opt.name} (₹{opt.pricePerNight}/night)
      </label>
    ))}
  </div>
);

export default RadioGroup;
