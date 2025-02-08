const PropertyHeader = ({ onCreateProperty }) => {
  return (
    <div className='flex flex-col gap-3 items-start mb-5'>
      <h1 className='font-bold'>Properties</h1>
      <button
        onClick={onCreateProperty}
        className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer'
      >
        Create New Property
      </button>
    </div>
  )
}

export default PropertyHeader
