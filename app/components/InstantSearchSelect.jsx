import { useRange } from 'react-instantsearch';

export default function InstantSearchSelect ({
  name,
  placeholder,
  title,
  options,
  refinementProps
}) {

  const { refine } = useRange(refinementProps);

  return (
    <select
      name={name}
      id={name}
      title={title}
      defaultValue={placeholder}
      onChange={(e) => refine([e.target.value,20])}
      className='form-select'
    >
      <option disabled value={placeholder} className="hidden">
          {placeholder}
      </option>
      {options.map((option) => {
        return (
          <option value={option}>
            {option}+
          </option>
      )})}
    </select>
  );
}