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
  } catch (error: unknown) {
    // Narrow down the error type
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
    } else if (error instanceof Error) {
      console.error('Error fetching configuration:', error.message);
      console.error('Full error details:', error);
    } else {
      console.error('Unexpected error:', error);
    }

    return notFound();
  }
};

export default Page;
