const PropertyCategories = ({ activeCategory, onCategoryChange }) => {
  return (
    <ul className='flex text-[#181818] md:text-[14px] items-center gap-5 mb-7'>
      <li
        className={`cursor-pointer ${activeCategory === 'active' ? 'text-[#FF5B19]' : ''}`}
        onClick={() => onCategoryChange('active')}
      >
        Active
      </li>
      <li
        className={`cursor-pointer ${activeCategory === 'archived' ? 'text-[#FF5B19]' : ''}`}
        onClick={() => onCategoryChange('archived')}
      >
        Archived
      </li>
    </ul>
  )
}

export default PropertyCategories
