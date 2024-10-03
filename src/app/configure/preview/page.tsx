// pages/configure/design/page.tsx
import { db } from '@/db'; // Prisma client with logging enabled
import { notFound } from 'next/navigation';
import DesignPreview from './designPreview'; // Adjust the path based on your project structure
import { Prisma } from '@prisma/client';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound(); // Return 404 if id is invalid
  }

  try {
    // Fetch the configuration using Prisma
    const configuration = await db.configuration.findUnique({
      where: { id },
    });

    // If no configuration is found, return a 404
    if (!configuration) {
      return notFound();
    }

    // Render the DesignPreview component with the fetched configuration data
    return <DesignPreview configuration={configuration} />;
  } catch (error: unknown) {
    // Log errors and handle them based on type
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
      console.error('Error meta:', error.meta);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('Unknown Prisma error:', error.message);
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error('Prisma initialization error:', error.message);
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      console.error('Prisma Rust panic error:', error.message);
    } else if (error instanceof Error) {
      console.error('Error fetching configuration:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    return notFound(); // Return a 404 if an error occurs
  }
};

export default Page;
