import { useDispatch, useSelector } from 'react-redux'
import {
  updateSearchField,
  updateSearchInput,
} from '../../features/admin/adminSlice'
const searchOptions = [
  { value: '', label: 'None' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
]

const SearchField = () => {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector(state => state.admin)

  const handleSelectChange = event => {
    dispatch(updateSearchField(event.target.value))
  }

  const handleInputChange = event => {
    dispatch(updateSearchInput(event.target.value))
  }

  return (
    <div className="flex flex-col md:flex-row items-end gap-2 flex-grow">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            Search By
          </span>
        </div>
        <select
          name="fieldName"
          onChange={handleSelectChange}
          value={searchQuery.search.fieldName}
          className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
        >
          {searchOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control w-full">
        {searchQuery.search.fieldName && (
          <div className="label">
            <span className="label-text text-[15px] font-semibold">
              {searchQuery.search.fieldName}
            </span>
          </div>
        )}
        <input
          type="text"
          name="fieldValue"
          value={searchQuery.search.fieldValue}
          onChange={handleInputChange}
          placeholder={`${searchQuery.search.fieldName ? 'Enter ' + searchQuery.search.fieldName : 'Field unselected'}`}
          className={`input input-bordered w-full border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-primary`}
        />
      </label>
    </div>
  )
}

export default SearchField
