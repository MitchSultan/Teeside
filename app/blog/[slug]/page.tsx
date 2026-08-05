import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicBlogBySlug, getFeaturedBlogs } from '@/lib/queries/blogs'
import { Calendar, Clock, ArrowLeft, Share2, User, ChevronRight, Newspaper, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

interface SingleBlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SingleBlogPage(props: SingleBlogPageProps) {
  const params = await props.params
  const blog = await getPublicBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getFeaturedBlogs(3)
  const filteredRelated = relatedBlogs.filter((b) => b.id !== blog.id).slice(0, 2)

  return (
    <div className="pt-20 lg:pt-24 pb-16 bg-[var(--color-bg-primary)] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] flex-wrap">
          <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-[var(--color-navy)]">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-gold-dark)] font-medium truncate max-w-[200px] sm:max-w-xs">
            {blog.title}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <Badge className="bg-[var(--color-gold)]/15 text-[var(--color-gold-dark)] text-xs font-bold px-3.5 py-1 mb-4 border border-[var(--color-gold)]/30">
            {blog.category}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--color-warm-gray)] text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-3">
              <img
                src={blog.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                alt={blog.author_name}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <div>
                <p className="font-bold text-sm text-[var(--color-navy)]">{blog.author_name}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Teeside Real Estate Advisory</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[var(--color-gold-dark)]" />
                {new Date(blog.published_at).toLocaleDateString('en-KE', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[var(--color-gold-dark)]" />
                {blog.read_time}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-72 sm:h-96 lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-md mb-10 bg-[var(--color-navy)]">
          <img
            src={blog.cover_image || '/images/hero1.jpg'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-[var(--color-gold)] shadow-sm mb-10 text-base font-medium text-[var(--color-navy)] leading-relaxed">
          {blog.excerpt}
        </div>

        {/* Article Body Content */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-black/5 text-[var(--color-text-primary)] leading-relaxed space-y-6 text-sm sm:text-base prose max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={index} className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] pt-4 pb-2 border-b border-black/5" style={{ fontFamily: 'var(--font-inter)' }}>
                  {paragraph.replace('# ', '')}
                </h1>
              )
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] pt-4 pb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('---')) {
              return <hr key={index} className="my-6 border-[var(--color-warm-gray)]" />
            }
            return (
              <p key={index} className="text-[var(--color-text-secondary)] leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Article Footer & Consultation Callout */}
        <div className="mt-12 bg-[var(--color-navy)] text-white p-8 sm:p-10 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-2 block">
              Need Professional Assistance?
            </span>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
              Maximize Your Real Estate Yields in Nairobi
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Our specialists provide end-to-end property management, sales valuation, and land due diligence across the Nairobi Metropolitan Area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/property-management" className="btn-primary !py-2.5 !px-5 !text-xs">
                Property Management
              </Link>
              <Link href="/contact" className="btn-secondary !py-2.5 !px-5 !text-xs">
                Speak With An Advisor
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {filteredRelated.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--color-warm-gray)]">
            <h3 className="text-xl font-bold text-[var(--color-navy)] mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
              Related Market Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredRelated.map((rel) => (
                <div key={rel.id} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-all">
                  <span className="text-[10px] font-bold text-[var(--color-gold-dark)] uppercase block mb-2">{rel.category}</span>
                  <h4 className="text-base font-bold text-[var(--color-navy)] mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-4">
                    {rel.excerpt}
                  </p>
                  <Link href={`/blog/${rel.slug}`} className="text-xs font-bold text-[var(--color-navy)] hover:text-[var(--color-gold-dark)] inline-flex items-center gap-1">
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
