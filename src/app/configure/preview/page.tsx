import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './designPreview'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  // Validate the ID from searchParams
  if (!id || typeof id !== 'string') {
    console.error('No ID provided or invalid ID type.')
    return notFound()
  }

  try {
    // Fetch configuration from the database
    const configuration = await db.configuration.findUnique({
      where: { id },
    })

    // If no configuration found, log the ID and return 404
    if (!configuration) {
      console.error(`No configuration found for ID: ${id}`)
      return notFound()
    }

    // Return the DesignPreview component with the fetched configuration
    return <DesignPreview configuration={configuration} />
  } catch (error) {
    // Log any potential errors during the fetch operation
    console.error('Error fetching configuration:', error)
    return notFound()
  }
}

export default Page
