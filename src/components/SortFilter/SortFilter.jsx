import css from './style.module.css';

const options = [
  { value: 'A to Z', label: 'A to Z' },
  { value: 'Z to A', label: 'Z to A' },
  { value: 'Less than 10$', label: 'Less than 10$' },
  { value: 'Greater than 10$', label: 'Greater than 10$' },
  { value: 'Popular', label: 'Popular' },
  { value: 'Not popular', label: 'Not popular' },
  { value: 'Show all', label: 'Show all' },
];

const SortFilter = ({ sortType, onSortChange }) => (
  <div className={css.filter_container}>
    <p className={css.filter_span}>Filters</p>
    <div className={css.select_filters}>
      <select value={sortType} onChange={onSortChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SortFilter;
