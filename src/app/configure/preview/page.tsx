
import { db } from '@/db'; // Prisma client already managed here
import { notFound } from 'next/navigation';
import DesignPreview from './designPreview';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Server-side component to get the id in searchParams
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  // Fetch the configuration using the id
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  // Client-side component
  return <DesignPreview configuration={configuration} />;
};

export default Page;

/* import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './designPreview'
import { PrismaClient } from '@prisma/client';


declare global {
  // Add your custom property to globalThis
  var prisma: PrismaClient | undefined;
}
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma){
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

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

export default Page */
