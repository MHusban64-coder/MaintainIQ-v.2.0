import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Calendar, Camera, Save } from 'lucide-react'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '@/firebase/config'
import { useAuth } from '@/context/AuthContext'
import { formatDate } from '@/utils/formatters'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08 } }),
}

export default function Profile() {
  const { currentUser, userProfile, fetchUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [nameError, setNameError] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const fileInputRef = useRef(null)

  async function handleSaveName(e) {
    e.preventDefault()
    if (!displayName.trim()) { setNameError('Name is required.'); return }
    setNameError('')
    setSavingName(true)
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() })
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: displayName.trim(),
        updatedAt: serverTimestamp(),
      })
      await fetchUserProfile(currentUser.uid)
      toast.success('Name updated successfully.')
    } catch {
      toast.error('Failed to update name. Please try again.')
    } finally {
      setSavingName(false)
    }
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB.'); return }
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file.'); return }

    setUploadingPhoto(true)
    try {
      const storageRef = ref(storage, `avatars/${currentUser.uid}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      await updateProfile(auth.currentUser, { photoURL: url })
      await updateDoc(doc(db, 'users', currentUser.uid), {
        photoURL: url,
        updatedAt: serverTimestamp(),
      })
      await fetchUserProfile(currentUser.uid)
      toast.success('Profile photo updated.')
    } catch {
      toast.error('Failed to upload photo. Please try again.')
    } finally {
      setUploadingPhoto(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const initials = (currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <PageHeader title="Profile" subtitle="Manage your personal information and account settings." />
      </motion.div>

      {/* Avatar card */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <Card>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-primary-600 flex items-center justify-center overflow-hidden ring-4 ring-white dark:ring-secondary-700 shadow-md">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">{initials}</span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                aria-label="Change profile photo"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-secondary-700 border border-border dark:border-secondary-600 shadow-md flex items-center justify-center hover:bg-secondary-50 dark:hover:bg-secondary-600 transition-colors disabled:opacity-50"
              >
                {uploadingPhoto ? (
                  <div className="w-3.5 h-3.5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera size={13} className="text-secondary-600 dark:text-secondary-300" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
                aria-label="Upload profile photo"
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                {currentUser?.displayName || 'User'}
              </h2>
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-0.5">
                {currentUser?.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-medium">
                  <Shield size={11} />
                  {userProfile?.role || 'user'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 text-xs font-medium">
                  <Calendar size={11} />
                  Joined {formatDate(userProfile?.createdAt || currentUser?.metadata?.creationTime)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Edit name */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-5">
            Personal Information
          </h3>
          <form onSubmit={handleSaveName} className="space-y-5">
            <Input
              label="Display name"
              value={displayName}
              onChange={(e) => { setDisplayName(e.target.value); if (nameError) setNameError('') }}
              error={nameError}
              placeholder="Your full name"
              icon={User}
              required
            />
            <Input
              label="Email address"
              value={currentUser?.email || ''}
              icon={Mail}
              disabled
              hint="Email cannot be changed here."
            />
            <div className="flex justify-end">
              <Button type="submit" loading={savingName} icon={Save} size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Account info */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <Card>
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-4">
            Account Details
          </h3>
          <dl className="divide-y divide-border dark:divide-secondary-700">
            {[
              { label: 'User ID', value: currentUser?.uid || '—' },
              { label: 'Role', value: userProfile?.role || 'user' },
              { label: 'Account created', value: formatDate(currentUser?.metadata?.creationTime) },
              { label: 'Last sign-in', value: formatDate(currentUser?.metadata?.lastSignInTime) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-3 gap-4">
                <dt className="text-sm text-secondary-500 dark:text-secondary-400 shrink-0">{label}</dt>
                <dd className="text-sm font-medium text-secondary-900 dark:text-white text-right truncate">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </motion.div>
    </div>
  )
}
