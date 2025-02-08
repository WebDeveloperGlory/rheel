import house from '../../assets/images/house.png'

const PropertyMetrics = ({ properties }) => {
  const propertyMetrics = [
    {
      name: 'Active Properties',
      value: properties.length,
      image: house
    },
    {
      name: 'Properties for Sale',
      value: properties.filter(property => property.type === 'Sell').length,
      image: house
    },
    {
      name: 'Properties for Lease',
      value: properties.filter(property => property.type === 'Lease').length,
      image: house
    },
  ]

  return (
    <div className='flex gap-5 flex-wrap mb-8'>
      {propertyMetrics.map((data, index) => (
        <div
          key={index}
          className='bg-white flex items-center rounded-xl w-full md:w-[337px] justify-between p-5 text-[#23272E]'
        >
          <article>
            <h3 className='font-bold text-[13px] mb-2'>{data.name}</h3>
            <h1 className='font-bold text-2xl'>{data.value}</h1>
          </article>
          <img src={data.image} alt="" className='w-[30px]' />
        </div>
      ))}
    </div>
  )
}

export default PropertyMetrics
