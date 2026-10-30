/**
 * Central configuration for client downloads.
 * You can set customDownloadUrl to any direct download link (Google Drive, GitHub Releases, Mega, MediaFire, Discord CDN, etc.)
 * or leave it null to use the local generated package.
 */
export interface DownloadConfig {
  version: string;
  fileName: string;
  fileSize: string;
  gameBuild: string;
  sha256: string;
  // If you have a custom external download link, paste it here (e.g. "https://...")
  customDownloadUrl: string | null;
}

export const downloadConfig: DownloadConfig = {
  version: "v2.4.1",
  fileName: "Orbit-Client-v2.4.1.zip",
  fileSize: "4.2 MB",
  gameBuild: "Build 1482+",
  sha256: "8f2c0b4317a8e2d93e1b7c4d5a9f601b3e7284a1e9486c75302fa9bc4123e19b",
  customDownloadUrl: null, // Set to your custom URL whenever you have one!
};
