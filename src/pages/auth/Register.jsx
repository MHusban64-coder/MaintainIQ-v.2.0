import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Zap } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { validateRegisterForm } from '@/utils/validators'
import { formatFirebaseError } from '@/utils/formatters'
import { APP_NAME } from '@/utils/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validateRegisterForm(form)
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return }

    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created! Welcome to MaintainIQ.')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(formatFirebaseError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-secondary-50 dark:bg-secondary-900">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-secondary-900 dark:bg-secondary-800 p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">{APP_NAME}</span>
        </div>
        <div className="relative space-y-6">
          {[
            'QR code generation for every asset',
            'Maintenance timeline & history',
            'Issue reporting with photo evidence',
            'Real-time analytics dashboard',
            'Dark mode & responsive design',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-secondary-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="relative text-secondary-500 text-sm">
          Built for the SMIT Final Hackathon · Batch 18
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-bold text-secondary-900 dark:text-white">{APP_NAME}</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
              Create your account
            </h1>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              Get started in less than a minute
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Input
              label="Full name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Jane Smith"
              icon={User}
              required
              autoComplete="name"
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              icon={Mail}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Min. 6 characters"
              icon={Lock}
              required
              autoComplete="new-password"
              hint="At least 6 characters"
            />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Repeat your password"
              icon={Lock}
              required
              autoComplete="new-password"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary-500 dark:text-secondary-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
