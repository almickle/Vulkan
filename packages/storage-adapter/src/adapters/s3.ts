import { FileStorage, RequestInfo } from "../types";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Storage implements FileStorage {
  storageUrl: string = process.env.STORAGE_URL as string;

  private s3: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.bucket = this.storageUrl;
    this.region = "us-west-1";
    this.s3 = new S3Client({ region: this.region });
  }

  async getUploadUrl(params: {
    key: string;
    contentType?: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo> {
    const { key, contentType, expiresInSeconds = 600 } = params;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: expiresInSeconds
    });

    return { url, method: "PUT" };
  }

  async getDownloadUrl(params: {
    key: string;
    expiresInSeconds?: number;
  }): Promise<RequestInfo> {
    const { key, expiresInSeconds = 600 } = params;

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: expiresInSeconds
    });

    return { url, method: "GET" };
  }
}
