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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { propertySchema, type PropertyFormValues } from '@/lib/validations/property'
import { createProperty, updateProperty, uploadPropertyImage } from '@/lib/actions/properties'
import type { Property } from '@/types'

interface PropertyFormProps {
  property?: Property
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(property?.images ?? [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title ?? '',
      description: property?.description ?? '',
      property_type: property?.property_type ?? 'residential',
      status: property?.status ?? 'available',
      address: property?.address ?? '',
      city: property?.city ?? 'Nairobi',
      county: property?.county ?? 'Nairobi',
      latitude: property?.latitude ?? null,
      longitude: property?.longitude ?? null,
      bedrooms: property?.bedrooms ?? null,
      bathrooms: property?.bathrooms ?? null,
      square_feet: property?.square_feet ?? null,
      price: property?.price ?? 0,
      rental_price: property?.rental_price ?? null,
      images: property?.images ?? [],
      features: property?.features ?? {},
    },
  })

  const propertyType = watch('property_type')
  const status = watch('status')

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadPropertyImage(formData)
    setUploading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.url) {
      const updated = [...images, result.url]
      setImages(updated)
      setValue('images', updated)
      toast.success('Image uploaded')
    }
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    setValue('images', updated)
  }

  async function onSubmit(values: PropertyFormValues) {
    const payload = { ...values, images }
    const result = property
      ? await updateProperty(property.id, payload)
      : await createProperty(payload)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success(property ? 'Property updated' : 'Property created')
    router.push('/admin/properties')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={propertyType}
            onValueChange={(v) => setValue('property_type', v as PropertyFormValues['property_type'])}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="bedsitter">Bedsitter</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={status}
            onValueChange={(v) => setValue('status', v as PropertyFormValues['status'])}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="ready">Ready for Occupation</SelectItem>
              <SelectItem value="off-plan">Off-Plan</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
              <SelectItem value="repossessed">Repossessed</SelectItem>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
            {...register('description')}
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register('address')} />
          {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register('city')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="county">County</Label>
          <Input id="county" {...register('county')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (KES)</Label>
          <Input id="price" type="number" {...register('price')} />
          {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rental_price">Rental Price (KES)</Label>
          <Input id="rental_price" type="number" {...register('rental_price')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" type="number" {...register('bedrooms')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" type="number" step="0.5" {...register('bathrooms')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="square_feet">Square Feet</Label>
          <Input id="square_feet" type="number" {...register('square_feet')} />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Images</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={url} className="relative h-24 w-24 rounded-md overflow-hidden border">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-destructive text-white text-xs px-1.5 rounded"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting || uploading}>
          {isSubmitting ? 'Saving…' : property ? 'Update Property' : 'Create Property'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
