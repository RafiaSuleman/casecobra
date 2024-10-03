import { db } from '@/db'; // Prisma client
import { notFound } from 'next/navigation';
import DesignPreview from './designPreview';
import { Prisma } from '@prisma/client';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  try {
    const configuration = await db.configuration.findUnique({
      where: { id },
    });

    if (!configuration) {
      return notFound();
    }

    return <DesignPreview configuration={configuration} />;
  } catch (error: any) {
    console.error('Error fetching configuration:', error.message);
    console.error('Full error details:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
    }
    return notFound();
  }
};

export default Page;
