import { Bell } from 'lucide-react'

const TopSection = () => {
  return (
    <div className='flex justify-between p-5 bg-white items-center rounded-lg mb-8'>
      <h2 className='font-bold text-2xl'>Properties</h2>
      <div className="relative hidden md:block">
        <Bell className="w-6 h-6 text-gray-600" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </div>
  )
}

export default TopSection
