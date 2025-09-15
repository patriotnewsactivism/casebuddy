/**
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/create-signed-request.html
 */
export default function createSignedURL({ accountKey, accountSecret, sessionToken, bucketName, Key, Region, expires, uploadId, partNumber, }: {
    accountKey: string;
    accountSecret: string;
    sessionToken: string;
    bucketName: string;
    Key: string;
    Region: string;
    expires: string | number;
    uploadId?: string;
    partNumber?: string | number;
}): Promise<URL>;
//# sourceMappingURL=createSignedURL.d.ts.map