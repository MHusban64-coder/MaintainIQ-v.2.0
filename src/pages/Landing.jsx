import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  QrCode,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Package,
  Wrench,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'
import { APP_NAME, APP_TAGLINE } from '@/utils/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: QrCode,
    title: 'QR-Based Tracking',
    description:
      'Every asset gets a unique QR code. Scan instantly to access full history, maintenance records, and status.',
    color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
  },
  {
    icon: Wrench,
    title: 'Maintenance Logs',
    description:
      'Record every service event on a visual timeline. Never lose track of what was done, when, and by whom.',
    color: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
  },
  {
    icon: AlertCircle,
    title: 'Issue Reporting',
    description:
      'Flag problems instantly with priority levels and photo evidence. Keep your team informed in real time.',
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description:
      'Visualize asset health across your organization with live charts and key performance indicators.',
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
  },
  {
    icon: Shield,
    title: 'Warranty Tracking',
    description:
      'Monitor warranty expiry dates and receive timely alerts before coverage lapses.',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  },
  {
    icon: Package,
    title: 'Asset Management',
    description:
      'Manage your entire asset inventory with rich metadata: category, location, assignment, and status.',
    color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  },
]

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Register Your Asset',
    description: 'Add an asset with details like category, serial number, location, and assignee. A QR code is generated automatically.',
  },
  {
    number: '02',
    icon: QrCode,
    title: 'Scan the QR Code',
    description: 'Print and attach the QR to the physical asset. Anyone can scan it to instantly access the full asset profile.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Track & Maintain',
    description: 'Log maintenance records, report issues, and monitor asset health — all from a single, organized dashboard.',
  },
]

const highlights = [
  'No more paper maintenance logs',
  'Instant asset lookup via QR scan',
  'Centralized issue tracking',
  'Real-time analytics dashboard',
  'Works on any device',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-border dark:border-secondary-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-secondary-900 dark:text-white tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100 dark:bg-primary-900/20 blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent-100 dark:bg-accent-900/20 blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-400 text-xs font-medium mb-6"
          >
            <Zap size={12} />
            Modern Asset Maintenance Platform
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-secondary-900 dark:text-white mb-6 leading-tight"
          >
            Scan.{' '}
            <span className="text-primary-600">Report.</span>{' '}
            Maintain.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl text-secondary-500 dark:text-secondary-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Replace paper maintenance logs with QR-powered asset tracking.
            Every asset gets a digital identity — scan it, report issues,
            and maintain it from anywhere.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-primary-600 hover:bg-primary-700 font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 font-medium text-sm transition-all hover:bg-secondary-50 dark:hover:bg-secondary-700 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          {/* Highlights */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10"
          >
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-1.5 text-sm text-secondary-500 dark:text-secondary-400"
              >
                <CheckCircle2 size={14} className="text-accent-500 shrink-0" />
                {h}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-800/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to manage assets
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 max-w-xl mx-auto">
              A focused set of tools that covers the full maintenance lifecycle —
              without the enterprise bloat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.5}
                className="bg-white dark:bg-secondary-800 border border-border dark:border-secondary-700 rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-secondary-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 max-w-lg mx-auto">
              Get started in three steps. No training required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.6}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border dark:bg-secondary-700" aria-hidden="true" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 flex items-center justify-center mx-auto mb-5 relative">
                  <step.icon size={26} className="text-primary-600 dark:text-primary-400" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-secondary-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-500 opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-700 opacity-40 blur-3xl" />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to modernize your maintenance?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Set up your first asset in minutes. No credit card required.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Start for Free
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border dark:border-secondary-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-600 flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-secondary-900 dark:text-white">
              {APP_NAME}
            </span>
            <span className="text-secondary-400 text-xs ml-1">— {APP_TAGLINE}</span>
          </div>
          <p className="text-xs text-secondary-400">
            Built for the SMIT Final Hackathon · Batch 18
          </p>
        </div>
      </footer>
    </div>
  )
}
