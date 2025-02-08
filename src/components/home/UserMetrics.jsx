const UserMetrics = ({ metrics }) => {
  return (
    <div className='flex gap-5 flex-wrap mb-8'>
      {metrics.map((data, index) => (
        <div key={index} className='bg-white flex items-center rounded-xl w-full md:w-[330px] justify-between p-5 text-[#23272E]'>
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

export default UserMetrics
