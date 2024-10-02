import { db } from '@/db'; // Ensure this imports your configured Prisma client
import { notFound } from 'next/navigation';
import DesignPreview from './designPreview'; // Adjust the path based on your project structure

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Server-side component to get the id in searchParams
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  // Validate the id
  if (!id || typeof id !== 'string') {
    return notFound(); // If id is invalid, return a 404
  }

  try {
    // Fetch the configuration using the id
    const configuration = await db.configuration.findUnique({
      where: { id },
    });

    // If no configuration found, return a 404
    if (!configuration) {
      return notFound();
    }

    // Return the DesignPreview component with the fetched configuration
    return <DesignPreview configuration={configuration} />;
  } catch (error) {
    console.error('Error fetching configuration:', error); // Log any errors
    return notFound(); // Handle errors by returning a 404
  }
};

export default Page;


/* import { db } from '@/db'; // Assuming db is your Prisma client
import { notFound } from 'next/navigation';
import DesignPreview from './designPreview';

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

    // Log to verify data
    console.log('Fetched Configuration:', configuration);

    return <DesignPreview configuration={configuration} />;
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return notFound();
  }
};

export default Page;
 */