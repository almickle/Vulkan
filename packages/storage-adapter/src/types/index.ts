export type StoredFile = {
  key: string;
  size?: number;
  contentType?: string;
};

export type RequestInfo = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
};

export interface FileStorage {
  storageUrl: string;
  getUploadUrl(params: {
    key: string;
    contentType?: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo>;

  getDownloadUrl(params: {
    key: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo>;
}

export type StorageBackendType = "s3" | "local";
