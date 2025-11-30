export function uploadFile(key: string, data: Buffer): void {
  // Simulate file upload by storing in local storage (in-memory for this example)
  localStorage.set(key, data);
}

export function downloadFile(key: string): Buffer | null {
  // Simulate file download by retrieving from local storage (in-memory for this example)
  return localStorage.get(key) || null;
}
