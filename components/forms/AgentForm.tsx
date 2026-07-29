'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { agentSchema, type AgentFormValues } from '@/lib/validations/property'
import { createAgent, updateAgent, uploadAgentImage } from '@/lib/actions/agents'
import type { Agent } from '@/types'

interface AgentFormProps {
  agent?: Agent
}

export function AgentForm({ agent }: AgentFormProps) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      full_name: agent?.full_name ?? '',
      email: agent?.email ?? '',
      phone: agent?.phone ?? '',
      bio: agent?.bio ?? '',
      profile_image: agent?.profile_image ?? '',
      license_number: agent?.license_number ?? '',
      experience_years: agent?.experience_years ?? null,
      is_active: agent?.is_active ?? true,
      social_links: agent?.social_links ?? {},
    },
  })

  const isActive = watch('is_active')
  const profileImage = watch('profile_image')

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadAgentImage(formData)
    setUploading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.url) {
      setValue('profile_image', result.url)
      toast.success('Photo uploaded')
    }
  }

  async function onSubmit(values: AgentFormValues) {
    const result = agent
      ? await updateAgent(agent.id, values)
      : await createAgent(values)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success(agent ? 'Agent updated' : 'Agent created')
    router.push('/admin/agents')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" {...register('full_name')} />
          {errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register('phone')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="license_number">License Number</Label>
          <Input id="license_number" {...register('license_number')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience_years">Experience (years)</Label>
          <Input id="experience_years" type="number" {...register('experience_years')} />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
            {...register('bio')}
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-2">
          <Checkbox
            id="is_active"
            checked={isActive}
            onCheckedChange={(checked) => setValue('is_active', checked === true)}
          />
          <Label htmlFor="is_active">Active on site</Label>
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label>Profile Photo</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {profileImage && (
            <div className="relative h-24 w-24 rounded-full overflow-hidden border">
              <Image src={profileImage} alt="" fill className="object-cover" sizes="96px" />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting || uploading}>
          {isSubmitting ? 'Saving…' : agent ? 'Update Agent' : 'Create Agent'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
