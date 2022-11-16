import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4">
      <h4 className="text-2xl text-green-500"> Registration Successfull</h4>
      <Link href="/login">
        <button className="bg-blue-300 w-[150px] rounded-md capitalize p-1 text-white">login now</button>
      </Link>
    </div>
  )
}

export default Dashboard
