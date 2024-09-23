import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp'
import { db } from '@/db'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const { configId } = metadata.input;
    
        // Fetch the file and convert it to a buffer
        const res = await fetch(file.url);
        if (!res.ok) {
          throw new Error(`Failed to fetch image from URL: ${file.url}`);
        }
    
        const buffer = await res.arrayBuffer();
    
        // Process image metadata using sharp
        const imgMetadata = await sharp(Buffer.from(buffer)).metadata();
        const { width, height } = imgMetadata;
    
        // Handle the database operations
        if (!configId) {
          const configuration = await db.configuration.create({
            data: {
              imageUrl: file.url,
              height: height || 500,
              width: width || 500,
            },
          });
    
          console.log('New configuration created:', configuration);
          return { configId: configuration.id };
        } else {
          const updatedConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url,
            },
          });
    
          console.log('Configuration updated:', updatedConfiguration);
          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        throw new Error('Failed to process the uploaded image.');
      }
    })
    
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter