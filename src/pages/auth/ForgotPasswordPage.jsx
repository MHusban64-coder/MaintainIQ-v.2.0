import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Button, Input } from '../../components/common';
import { getErrorMessage } from '../../utils/helpers';

export default function ForgotPasswordPage() { const [email, setEmail] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const submit = async (event) => { event.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.'); setError(''); setLoading(true); try { await sendPasswordResetEmail(auth, email); toast.success('Password reset email sent.'); } catch (requestError) { toast.error(getErrorMessage(requestError)); } finally { setLoading(false); } }; return <><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Account recovery</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-ink dark:text-white">Reset your password</h1><p className="mt-2 text-sm leading-6 text-muted">We’ll send a secure reset link to your inbox.</p><form className="mt-8 space-y-5" onSubmit={submit} noValidate><Input label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={error} placeholder="you@company.com" /><Button type="submit" loading={loading} className="w-full">Send reset link</Button></form><p className="mt-7 text-center text-sm text-muted"><Link className="font-semibold text-brand-600 hover:text-brand-700" to="/login">Back to log in</Link></p></>; }
