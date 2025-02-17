import React from 'react'

const Header = ({open}) => {
  return (
    <div>
        <h3 className='font-semibold mb-5'>Welcome Admin,</h3>
        <button
         className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer mb-5'
         onClick={open}
        >
            Create New Admin
        </button>
    </div>
  )
}

export default Header