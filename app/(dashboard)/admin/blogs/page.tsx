import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { getAdminBlogs } from '@/lib/queries/blogs'
import { BlogManagementClient } from '@/components/dashboard/BlogManagementClient'

export const dynamic = 'force-dynamic'

export default async function AdminBlogsPage() {
  const { data: blogs } = await getAdminBlogs({ pageSize: 50 })

  return (
    <>
      <AdminHeader title="Blog & Content Management" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <BlogManagementClient initialBlogs={blogs} />
      </div>
    </>
  )
}
