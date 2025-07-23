import { useEffect, useState } from 'react'

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        No user found. Please login.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-32 h-32 rounded-full border-4 border-red-600 mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-lg text-gray-300">{user.email}</p>
    </div>
  )
}

export default Profile
