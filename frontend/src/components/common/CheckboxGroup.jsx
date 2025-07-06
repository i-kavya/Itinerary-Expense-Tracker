const CheckboxGroup = ({ day, options, onChange }) => (
  <div className="mb-2">
    <p className="font-semibold mb-1">{day}</p>
    {options.map((item) => (
      <label key={item.name} className="block ml-2 text-sm">
        <input
          type="checkbox"
          onChange={(e) => onChange(day, item.name, e.target.checked)}
          className="mr-2"
        />
        {item.name} (₹{item.cost || 200})
      </label>
    ))}
  </div>
);

export default CheckboxGroup;
