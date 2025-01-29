// import { s3Storage as s3StorageAdapter } from '@payloadcms/storage-s3'

// import type { Plugin } from 'payload'

// export const s3Storage: Plugin = s3StorageAdapter({
//   collections: {
//     media: {
//       prefix: 'media',
//       disableLocalStorage: true,
//     },
//     assets: {
//       prefix: 'assets',
//       disableLocalStorage: true,
//     },
//     'user-photo': {
//       prefix: 'user-photos',
//       disableLocalStorage: true,
//     },
//   },
//   acl: 'private',
//   bucket: process.env.S3_BUCKET as string,
//   config: {
//     endpoint: process.env.S3_ENDPOINT,
//     forcePathStyle: true,
//     region: 'us-east-1', // Dummy region to avoid error
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY as string,
//       secretAccessKey: process.env.S3_SECRET_KEY as string,
//     },
//   },
// })
