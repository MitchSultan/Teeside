'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconStar,
  IconStarFilled,
  IconEye,
  IconExternalLink,
} from '@tabler/icons-react'
import type { Blog } from '@/types'
import { createBlog, updateBlog, deleteBlog, toggleBlogFeatured } from '@/lib/actions/blogs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'

const categories = [
  'Market Trends',
  'Landlord Tips',
  'Investment Advisory',
  'Legal & Tax',
  'Diaspora Guide',
]

export function BlogManagementClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Sheet state for Create / Edit
  const [isOpen, setIsOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(false)

  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [authorName, setAuthorName] = useState('Teeside Editorial')
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200')
  const [readTime, setReadTime] = useState('5 min read')
  const [coverImage, setCoverImage] = useState('/images/hero1.jpg')
  const [status, setStatus] = useState<'published' | 'draft'>('published')
  const [featured, setFeatured] = useState(false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingBlog) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      )
    }
  }

  const openCreateSheet = () => {
    setEditingBlog(null)
    setTitle('')
    setSlug('')
    setExcerpt('')
    setContent('')
    setCategory(categories[0])
    setAuthorName('Teeside Editorial')
    setAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200')
    setReadTime('5 min read')
    setCoverImage('/images/hero1.jpg')
    setStatus('published')
    setFeatured(false)
    setIsOpen(true)
  }

  const openEditSheet = (blog: Blog) => {
    setEditingBlog(blog)
    setTitle(blog.title)
    setSlug(blog.slug)
    setExcerpt(blog.excerpt)
    setContent(blog.content)
    setCategory(blog.category)
    setAuthorName(blog.author_name)
    setAuthorAvatar(blog.author_avatar || '')
    setReadTime(blog.read_time)
    setCoverImage(blog.cover_image || '/images/hero1.jpg')
    setStatus(blog.status)
    setFeatured(blog.featured)
    setIsOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !excerpt || !content) {
      toast.error('Please complete all required fields')
      return
    }

    setLoading(true)
    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      author_name: authorName,
      author_avatar: authorAvatar,
      read_time: readTime,
      cover_image: coverImage,
      status,
      featured,
    }

    if (editingBlog) {
      const res = await updateBlog(editingBlog.id, payload)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Article updated successfully!')
        setBlogs((prev) =>
          prev.map((b) => (b.id === editingBlog.id ? { ...b, ...payload } : b))
        )
        setIsOpen(false)
        router.refresh()
      }
    } else {
      const res = await createBlog(payload)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Article created successfully!')
        const newBlogObj: Blog = {
          id: `blog-${Date.now()}`,
          ...payload,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setBlogs((prev) => [newBlogObj, ...prev])
        setIsOpen(false)
        router.refresh()
      }
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    const res = await deleteBlog(id)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success('Article deleted')
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      router.refresh()
    }
  }

  const handleToggleFeatured = async (blog: Blog) => {
    const res = await toggleBlogFeatured(blog.id, blog.featured)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(
        blog.featured ? 'Removed from featured' : 'Marked as featured'
      )
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, featured: !b.featured } : b))
      )
      router.refresh()
    }
  }

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.author_name.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      b.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesStatus =
      selectedStatus === 'All' || b.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header Bar & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Blog Articles</h2>
          <p className="text-xs text-muted-foreground">
            Manage real estate news, market trends, landlord guides, and insights.
          </p>
        </div>
        <Button onClick={openCreateSheet} className="gap-2 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy)]/90">
          <IconPlus size={16} /> New Article
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-background p-4 rounded-lg border">
        <div className="relative">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-9 px-3 rounded-md border text-xs bg-background outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-9 px-3 rounded-md border text-xs bg-background outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Blog Table */}
      <div className="rounded-md border bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Cover</TableHead>
              <TableHead>Article Details</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No blog articles found. Click "New Article" to publish your first post.
                </TableCell>
              </TableRow>
            ) : (
              filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <img
                      src={blog.cover_image || '/images/hero1.jpg'}
                      alt={blog.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-semibold text-xs text-foreground line-clamp-1">{blog.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{blog.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] whitespace-nowrap">
                      {blog.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{blog.author_name}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`text-[10px] capitalize ${
                        blog.status === 'published'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => handleToggleFeatured(blog)}
                      title={blog.featured ? 'Unmark featured' : 'Mark as featured'}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      {blog.featured ? <IconStarFilled size={18} /> : <IconStar size={18} className="text-muted-foreground" />}
                    </button>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(blog.published_at).toLocaleDateString('en-KE')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="View Live"
                      >
                        <IconExternalLink size={16} />
                      </Link>
                      <button
                        onClick={() => openEditSheet(blog)}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="Edit Article"
                      >
                        <IconEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-red-600 dark:hover:bg-red-950"
                        title="Delete Article"
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Editor Sheet Form */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto p-6">
          <SheetHeader className="mb-6">
            <SheetTitle>{editingBlog ? 'Edit Blog Article' : 'Create New Article'}</SheetTitle>
            <SheetDescription>
              {editingBlog ? 'Update article content, metadata, and publishing status.' : 'Draft or publish a new article for the frontend blog module.'}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Article Title *</label>
              <Input
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Top 7 Real Estate Investments in Nairobi"
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">URL Slug *</label>
              <Input
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="top-7-real-estate-investments-nairobi"
                className="text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border text-xs bg-background outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Publish Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                  className="w-full h-9 px-3 rounded-md border text-xs bg-background outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Author Name</label>
                <Input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Geoffery Mwangombe"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Estimated Read Time</label>
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Cover Image URL</label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/hero1.jpg or https://..."
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Article Excerpt *</label>
              <textarea
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise summary of the article for card previews..."
                className="w-full p-3 rounded-md border text-xs bg-background outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Full Content (Markdown / Text) *</label>
              <textarea
                required
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write full article body using headers (# Section), bullet points, and paragraphs..."
                className="w-full p-3 rounded-md border text-xs font-mono bg-background outline-none resize-y"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-muted-foreground"
              />
              <label htmlFor="featured" className="text-xs font-semibold cursor-pointer">
                Feature on Homepage Section
              </label>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="text-xs bg-[var(--color-navy)] text-white">
                {loading ? 'Saving…' : editingBlog ? 'Update Article' : 'Publish Article'}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
