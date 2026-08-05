import Link from 'next/link'
import { getPublicBlogs, getFeaturedBlogs } from '@/lib/queries/blogs'
import { Newspaper, Calendar, Clock, ArrowRight, Search, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    page?: string
  }>
}

const categories = [
  'All',
  'Market Trends',
  'Landlord Tips',
  'Investment Advisory',
  'Legal & Tax',
  'Diaspora Guide',
]

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams
  const search = searchParams.q || ''
  const category = searchParams.category || 'All'
  const page = parseInt(searchParams.page || '1', 10)
  const pageSize = 6

  const [{ data: blogs, totalPages, count }, featuredBlogs] = await Promise.all([
    getPublicBlogs({ search, category, page, pageSize }),
    getFeaturedBlogs(1),
  ])

  const featured = featuredBlogs[0] || blogs[0]

  return (
    <div className="pt-20 lg:pt-24 pb-16 bg-[var(--color-bg-primary)] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-gold-dark)] font-medium">Market Insights & Blog</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-[url('/images/hero1.jpg')] bg-no-repeat bg-center bg-cover py-16 lg:py-20 relative overflow-hidden my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center sm:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3.5 py-1.5 rounded-full mb-4">
            <Newspaper size={14} /> Teeside Insights
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            Real Estate Market <span className="text-[var(--color-gold)]">Insights & Guides</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            Stay ahead in the Nairobi real estate market with expert advice on high-yield locations, landlord property management, land legalities, and diaspora investments.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-white p-4 rounded-2xl shadow-sm border border-black/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = (category.toLowerCase() === cat.toLowerCase()) || (cat === 'All' && !searchParams.category)
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}${search ? `&q=${encodeURIComponent(search)}` : ''}`}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[var(--color-navy)] text-white shadow-sm'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
                  }`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>

          {/* Search Form */}
          <form action="/blog" method="GET" className="relative w-full md:w-72">
            {category && category !== 'All' && <input type="hidden" name="category" value={category} />}
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-navy)] outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 border border-transparent focus:border-[var(--color-gold)]"
            />
          </form>
        </div>

        {/* Featured Hero Article Card (Page 1 without search filter) */}
        {featured && page === 1 && !search && category === 'All' && (
          <div className="mb-14">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5 grid grid-cols-1 lg:grid-cols-12 group hover:border-[var(--color-gold)]/40 transition-all duration-300">
              <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px] bg-[var(--color-navy)]">
                <img
                  src={featured.cover_image || '/images/hero1.jpg'}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-[var(--color-gold)] text-[var(--color-navy)] text-xs font-bold px-3.5 py-1.5 shadow-md">
                    Featured Insight
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                    <span className="text-[var(--color-gold-dark)] font-semibold uppercase">{featured.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {featured.read_time}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4 group-hover:text-[var(--color-gold-dark)] transition-colors leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--color-warm-gray)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={featured.author_name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-[var(--color-navy)]">{featured.author_name}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {new Date(featured.published_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <Link href={`/blog/${featured.slug}`} className="btn-primary !py-2.5 !px-5 !text-xs">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-black/5">
            <Newspaper size={48} className="mx-auto text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">No articles found</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mb-6">
              Try adjusting your search query or select another category filter.
            </p>
            <Link href="/blog" className="btn-navy !py-2 !px-4 !text-xs">
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-black/5 hover:shadow-xl hover:border-[var(--color-gold)]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-[var(--color-navy)]">
                    <img
                      src={blog.cover_image || '/images/hero2.jpg'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[var(--color-navy)] text-[var(--color-gold)] text-[10px] font-bold px-3 py-1 border border-[var(--color-gold)]/30">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-[var(--color-gold-dark)]" />
                        {new Date(blog.published_at).toLocaleDateString('en-KE', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-[var(--color-gold-dark)]" />
                        {blog.read_time}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-gold-dark)] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[var(--color-warm-gray)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={blog.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={blog.author_name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-[var(--color-navy)]">
                      {blog.author_name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold-dark)] inline-flex items-center gap-1"
                  >
                    Read
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}${category !== 'All' ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${encodeURIComponent(search)}` : ''}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-black/10 text-[var(--color-navy)] hover:bg-[var(--color-bg-tertiary)]"
              >
                Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${category !== 'All' ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${encodeURIComponent(search)}` : ''}`}
                className={`w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                  p === page
                    ? 'bg-[var(--color-navy)] text-white shadow-sm'
                    : 'bg-white border border-black/10 text-[var(--color-navy)] hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {p}
              </Link>
            ))}

            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}${category !== 'All' ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${encodeURIComponent(search)}` : ''}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-black/10 text-[var(--color-navy)] hover:bg-[var(--color-bg-tertiary)]"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
