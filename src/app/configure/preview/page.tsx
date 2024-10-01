import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './designPreview'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
// server side component in which we get id in searchparams
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }
//clientside component
  return <DesignPreview configuration={configuration} />
}

export default Page