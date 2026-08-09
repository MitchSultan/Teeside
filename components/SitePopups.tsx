'use client'

import { useState, useEffect } from 'react'
import { subscribeNewsletter } from '@/lib/actions/contacts'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const COOKIE_ACCEPTED_KEY = 'teeside_cookies_accepted'
const NEWSLETTER_DISMISSED_KEY = 'teeside_newsletter_dismissed'

// ─────────────────────────────────────────────
// Cookie Banner
// ─────────────────────────────────────────────
function CookieBanner({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const accepted = localStorage.getItem(COOKIE_ACCEPTED_KEY)
    if (!accepted) {
      // Small delay so it doesn't flicker on mount
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  function handleAcceptAll() {
    localStorage.setItem(COOKIE_ACCEPTED_KEY, 'all')
    setVisible(false)
    onAccept()
  }

  function handleNecessaryOnly() {
    localStorage.setItem(COOKIE_ACCEPTED_KEY, 'necessary')
    setVisible(false)
    onAccept()
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      id="cookie-banner"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-5"
      style={{ animation: 'slideUp 0.4s ease-out forwards' }}
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl border border-[#E8E4DD] shadow-xl"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6">
          {/* Icon */}
          <div
            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
            style={{ background: 'var(--color-bg-tertiary)' }}
            aria-hidden="true"
          >
            <span className="text-xl">🍪</span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold mb-0.5"
              style={{ color: 'var(--color-text-primary)' }}
            >
              We use cookies on this site
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Teeside Property Management uses cookies to personalise content, analyse traffic via
              Google Analytics (GA4), and remember your preferences. We collect your IP address,
              browser type, pages visited and session duration. No personally identifiable data is
              sold to third parties.{' '}
              <a
                href="/privacy"
                className="underline hover:opacity-75 transition-opacity"
                style={{ color: 'var(--color-gold)' }}
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-row sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              id="cookie-accept-all"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--color-navy)',
                color: 'var(--color-warm-white)',
                boxShadow: '0 4px 12px rgba(11,29,58,0.25)',
              }}
            >
              Accept all
            </button>
            <button
              id="cookie-necessary-only"
              onClick={handleNecessaryOnly}
              className="flex-1 sm:flex-none text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 hover:bg-gray-50"
              style={{
                borderColor: 'var(--color-warm-gray-dark)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Necessary only
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Newsletter Popup
// ─────────────────────────────────────────────
function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<'prompt' | 'form' | 'done'>('prompt')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = sessionStorage.getItem(NEWSLETTER_DISMISSED_KEY)
    if (!dismissed) {
      // Show after 8 seconds
      const t = setTimeout(() => setVisible(true), 8000)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(NEWSLETTER_DISMISSED_KEY, '1')
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    const result = await subscribeNewsletter({ email })
    setLoading(false)
    if (result?.error) {
      if (result.error.includes('already subscribed')) {
        setStep('done')
      } else {
        setError(result.error)
      }
    } else {
      setStep('done')
      toast.success('You\'re subscribed! Welcome to Teeside.')
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
        onClick={dismiss}
        aria-hidden="true"
        style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-heading"
        id="newsletter-popup"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
      >
        <div
          className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
          style={{ animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={dismiss}
            id="newsletter-close"
            aria-label="Close newsletter popup"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {/* Illustration Area */}
          <div
            className="flex items-center justify-center pt-10 pb-6 px-8"
            style={{ background: 'var(--color-bg-tertiary)' }}
          >
            <div className="relative">
              {/* NEW badge */}
              <div
                className="absolute -top-3 -left-3 z-10 px-2.5 py-1 rounded-t-lg rounded-br-lg text-xs font-bold text-white tracking-wide"
                style={{ background: 'var(--color-gold)' }}
              >
                NEW
              </div>

              {/* Building Illustration – inline SVG */}
              <svg
                width="160"
                height="140"
                viewBox="0 0 160 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Left building */}
                <rect x="8" y="40" width="44" height="100" rx="3" fill="#D1CCC3" />
                <rect x="14" y="50" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="30" y="50" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="14" y="70" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="30" y="70" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="14" y="90" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="30" y="90" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="14" y="110" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="30" y="110" width="10" height="12" rx="1" fill="#8896A6" />

                {/* Center / Main building */}
                <rect x="52" y="15" width="56" height="125" rx="4" fill="#E8E4DD" />
                <rect x="60" y="25" width="14" height="16" rx="2" fill="#C02231" fillOpacity="0.7" />
                <rect x="86" y="25" width="14" height="16" rx="2" fill="#C02231" fillOpacity="0.7" />
                <rect x="60" y="50" width="14" height="16" rx="2" fill="#8896A6" />
                <rect x="86" y="50" width="14" height="16" rx="2" fill="#8896A6" />
                <rect x="60" y="75" width="14" height="16" rx="2" fill="#8896A6" />
                <rect x="86" y="75" width="14" height="16" rx="2" fill="#8896A6" />
                <rect x="60" y="100" width="14" height="16" rx="2" fill="#8896A6" />
                <rect x="86" y="100" width="14" height="16" rx="2" fill="#8896A6" />
                {/* Door */}
                <rect x="72" y="118" width="16" height="22" rx="2" fill="#8896A6" />

                {/* Right building */}
                <rect x="108" y="55" width="44" height="85" rx="3" fill="#D1CCC3" />
                <rect x="114" y="65" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="130" y="65" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="114" y="85" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="130" y="85" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="114" y="105" width="10" height="12" rx="1" fill="#8896A6" />
                <rect x="130" y="105" width="10" height="12" rx="1" fill="#8896A6" />

                {/* Ground */}
                <rect x="0" y="136" width="160" height="4" rx="2" fill="#C5BFB5" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="px-7 py-6">
            {step === 'done' ? (
              <div className="text-center py-4">
                <p className="text-4xl mb-3">🎉</p>
                <h2
                  id="newsletter-heading"
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-inter)' }}
                >
                  You&apos;re on the list!
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  We&apos;ll let you know as soon as new properties go live in Nairobi.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-5 w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--color-navy)',
                    color: 'var(--color-warm-white)',
                    boxShadow: '0 4px 14px rgba(11,29,58,0.25)',
                  }}
                >
                  Got it!
                </button>
              </div>
            ) : step === 'form' ? (
              <>
                <h2
                  id="newsletter-heading"
                  className="text-xl font-bold mb-1"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-inter)' }}
                >
                  Enter your email
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Get new listings delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 mb-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: error ? 'var(--color-error)' : 'var(--color-warm-gray-dark)',
                      color: 'var(--color-text-primary)',
                      background: 'var(--color-bg-tertiary)',
                    }}
                  />
                  {error && (
                    <p className="text-xs mb-3" style={{ color: 'var(--color-error)' }}>
                      {error}
                    </p>
                  )}
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'var(--color-navy)',
                      color: 'var(--color-warm-white)',
                      boxShadow: '0 4px 14px rgba(11,29,58,0.25)',
                    }}
                  >
                    {loading ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </form>
                <p
                  className="mt-3 text-center text-[11px]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  No spam. Unsubscribe anytime.{' '}
                  <a
                    href="/privacy"
                    className="underline hover:opacity-70"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </>
            ) : (
              /* step === 'prompt' */
              <>
                <h2
                  id="newsletter-heading"
                  className="text-xl font-bold mb-1.5"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-inter)' }}
                >
                  Don&apos;t miss out on new rentals!
                </h2>
                <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                  Find the perfect rental for you before someone else does
                </p>
                <button
                  id="newsletter-signup-btn"
                  onClick={() => setStep('form')}
                  className="w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--color-navy)',
                    color: 'var(--color-warm-white)',
                    boxShadow: '0 4px 14px rgba(11,29,58,0.25)',
                  }}
                >
                  Sign up
                </button>
                <button
                  onClick={dismiss}
                  className="mt-2.5 w-full py-2 text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  No thanks
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────
// Root Export – both popups composed together
// ─────────────────────────────────────────────
export function SitePopups() {
  const [cookieAccepted, setCookieAccepted] = useState(false)

  return (
    <>
      <CookieBanner onAccept={() => setCookieAccepted(true)} />
      {/* Show newsletter popup regardless; internally it checks sessionStorage */}
      <NewsletterPopup key={String(cookieAccepted)} />
    </>
  )
}
