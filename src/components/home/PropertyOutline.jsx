import { EllipsisVertical } from 'lucide-react'

const PropertyOutline = ({ data }) => {
  return (
    <div className='bg-white p-5 py-7 rounded-lg mb-8 md:w-[300px] '>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-xl md:text-[14px] font-bold text-[#23272E]'>Properties Outline</h2>
        <EllipsisVertical className='w-4 h-4 text-[#4B465C] cursor-pointer' />
      </div>
      <div className="flex flex-col gap-5">
        {data.map((item, index) => (
          <div key={index} className='flex items-center justify-between rounded-lg p-5 md:p-3 text-white' style={{ backgroundColor: item.backgroundColor }}>
            <article>
              <h2 className='text-2xl font-bold mb-2'>{item.value}</h2>
              <p>{item.name}</p>
            </article>
            <img src={item.icon} alt="" className='md:w-[30px]' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyOutline
