import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { isValidEmail } from '@/utils/validators'
import { formatFirebaseError } from '@/utils/formatters'
import { APP_NAME } from '@/utils/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) { setEmailError('Email is required.'); return }
    if (!isValidEmail(email)) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      toast.error(formatFirebaseError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-bold text-secondary-900 dark:text-white">{APP_NAME}</span>
        </Link>

        <div className="bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 rounded-2xl shadow-card p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-success" />
              </div>
              <h1 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                Check your inbox
              </h1>
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-6 leading-relaxed">
                We&apos;ve sent a password reset link to{' '}
                <span className="font-medium text-secondary-700 dark:text-secondary-200">{email}</span>.
                Check your spam folder if it doesn&apos;t arrive.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to sign in
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">
                  Reset your password
                </h1>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError('')
                  }}
                  error={emailError}
                  placeholder="you@example.com"
                  icon={Mail}
                  required
                  autoComplete="email"
                />
                <Button type="submit" loading={loading} className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
