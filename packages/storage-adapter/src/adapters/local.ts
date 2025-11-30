import { FileStorage, RequestInfo } from "@/types";

export class LocalStorage implements FileStorage {
  storageUrl: string;

  constructor() {
    this.storageUrl = process.env.STORAGE_URL as string;
  }

  async getUploadUrl(params: {
    key: string;
    contentType?: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo> {
    return {
      url: `${this.storageUrl}/${params.key}`,
      method: "PUT"
    };
  }

  async getDownloadUrl(params: {
    key: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo> {
    return {
      url: `${this.storageUrl}/${params.key}`,
      method: "GET"
    };
  }
}
