/**
 * releaseStorage.ts
 * Allows the website owner to upload/set custom files or URLs directly in the browser.
 * Uses IndexedDB for zero-size-limit binary storage and localStorage for metadata.
 */

export interface ReleaseConfig {
  siteName: string;
  clientName: string;
  version: string;
  fileName: string;
  fileSize: string;
  gameBuild: string;
  sha256: string;
  customDownloadUrl: string; // If empty, uses stored file or default generated zip
  statusText: string;
}

export const DEFAULT_RELEASE: ReleaseConfig = {
  siteName: "VrcModMenu",
  clientName: "Orbit",
  version: "v2.4.1",
  fileName: "VrcModMenu-Orbit-v2.4.1.zip",
  fileSize: "4.2 MB",
  gameBuild: "Build 1482+",
  sha256: "8f2c0b4317a8e2d93e1b7c4d5a9f601b3e7284a1e9486c75302fa9bc4123e19b",
  customDownloadUrl: "",
  statusText: "Status: Online · Verified Build 1482",
};

const DB_NAME = 'VrcModMenuDB';
const DB_VERSION = 1;
const STORE_NAME = 'releases';
const FILE_KEY = 'active_release_file';
const CONFIG_KEY = 'vrcmodmenu_release_config';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function getStoredConfig(): ReleaseConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_RELEASE, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Failed to load release config from localStorage:', err);
  }
  return DEFAULT_RELEASE;
}

export function saveStoredConfig(config: ReleaseConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save release config:', err);
  }
}

export async function storeReleaseFile(file: File): Promise<{
  fileName: string;
  fileSize: string;
  sha256: string;
}> {
  // 1. Calculate SHA-256
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sha256 = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  // 2. Format size
  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  const fileSize = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${(file.size / 1024).toFixed(0)} KB`;

  // 3. Store in IndexedDB
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const putRequest = store.put(file, FILE_KEY);
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(putRequest.error);
  });

  return {
    fileName: file.name,
    fileSize,
    sha256,
  };
}

export async function getStoredReleaseFile(): Promise<File | null> {
  try {
    const db = await openDB();
    return new Promise<File | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(FILE_KEY);
      request.onsuccess = () => {
        resolve((request.result as File) || null);
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function clearStoredReleaseFile(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(FILE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore
  }
}
