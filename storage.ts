// Simplified storage module - not used in this application
// If you need file storage, configure your own S3 or cloud storage

export async function storagePut(
  key: string,
  data: Buffer | Uint8Array | string,
  contentType?: string
): Promise<{ key: string; url: string }> {
  throw new Error("Storage not configured. Please set up your own cloud storage solution.");
}

export async function storageGet(
  key: string,
  expiresIn?: number
): Promise<{ key: string; url: string }> {
  throw new Error("Storage not configured. Please set up your own cloud storage solution.");
}

