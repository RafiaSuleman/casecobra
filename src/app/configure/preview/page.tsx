import { db } from '@/db'
import { notFound } from 'next/navigation'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== 'string') {
    console.error('No ID or invalid ID type:', id)
    return notFound()
  }

  try {
    const configuration = await db.configuration.findUnique({
      where: { id },
    })

    if (!configuration) {
      console.error(`No configuration found for ID: ${id}`)
      return notFound()
    }

    // Return the rest of your page component here

  } catch (error) {
    console.error('Error fetching configuration from database:', error)
    return notFound()
  }
}

export default Page
