import { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const fetchProfile = async () => {
    const token = localStorage.getItem('access')
    const res = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setProfile(res.data)
  }

  const handleAvatarUpload = async (e) => {
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])

    const token = localStorage.getItem('access')

    await axios.put('http://127.0.0.1:8000/api/auth/profile/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    fetchProfile()
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {profile && (
        <div>
          <img
            src={
              profile.avatar
                ? `http://127.0.0.1:8000${profile.avatar}`
                : '/default-avatar.png'
            }
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Password:</strong> {profile.password}</p>

          <input
            type="file"
            onChange={handleAvatarUpload}
            className="mt-4 text-white"
          />
        </div>
      )}
    </div>
  )
}

export default Profile
