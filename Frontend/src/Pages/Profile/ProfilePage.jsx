import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function ProfilePage() {
  const { user } = useSelector(state => state.auth)
  const [updateUser, setUpdateUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  // console.log("User from state in profile page: ",updateUser)

  const handleUpdateUserProfile = (e) => {
    const {name, value} = e.target
    setUpdateUser(prev => ({
      ...prev,
      [name] : value
    }))
    // console.log('All info are updated')
  }
  const handleSubmitChanges = ()=> {
    setEditMode(!editMode)
  }

  return (
    <div>
      <div className="header">
        <div className="bg-gradientBlue w-full h-40 rounded-[14px]"></div>
        <div className='profile flex items-center justify-between my-12'>
          <div className='flex items-center gap-8'>
            <div className="avatar bg-blue w-32 h-32 rounded-full flex items-center justify-center">
              <h1 className='font-bold text-[52px] text-white'>{user.nom.charAt(0).toUpperCase() || 'A'}</h1>
            </div>
            <div>
              <div className="name text-[24px] font-bold">{user.nom || "Alex Rawlers"} {user.prenom}</div>
              <div className="role font-medium">{user.profile || 'Director'}</div>
              <div className="email font-light tracking-wide">{user.email || 'alex@example.com'}</div>
            </div>
          </div>
          <div className='edit'>
            <button
                type="submit"
                onClick={handleSubmitChanges}
                className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
              >
                {editMode ? "Mettre à jour" : "Modifier"}
              </button>
          </div>
        </div>
      </div>

      <div className="content">
      <div className="flex gap-6 mb-4">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Nom <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleUpdateUserProfile}
              placeholder="Votre nom..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Prenom <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="prenom"
              value={user.prenom}
              onChange={handleUpdateUserProfile}
              placeholder="Votre prenom..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Nom d'Utilisateur <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUpdateUserProfile}
              placeholder="Votre nom d'utilisateur..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
        </div>

        <div className="flex gap-6 mb-4">
        <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Email <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleUpdateUserProfile}
              placeholder="Votre email..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Numero de telephone <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="phone"
              value={user.Numero_tel}
              onChange={handleUpdateUserProfile}
              placeholder="Nom d'utilisateur..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage