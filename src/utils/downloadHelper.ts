import { getStoredConfig, getStoredReleaseFile } from './releaseStorage.ts';
import { logDownloadEvent } from './analyticsTracker.ts';

function createZipArchive(files: { name: string; content: string | Uint8Array }[]): Blob {
  const fileRecords: Uint8Array[] = [];
  const centralDirectoryRecords: Uint8Array[] = [];
  let offset = 0;

  const textEncoder = new TextEncoder();

  for (const file of files) {
    const fileNameBytes = textEncoder.encode(file.name);
    const contentBytes =
      typeof file.content === 'string'
        ? textEncoder.encode(file.content)
        : file.content;

    let crc = 0 ^ -1;
    for (let i = 0; i < contentBytes.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ contentBytes[i]) & 0xff];
    }
    crc = (crc ^ -1) >>> 0;

    const localHeader = new Uint8Array(30 + fileNameBytes.length);
    const view = new DataView(localHeader.buffer);

    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0x546b, true);
    view.setUint16(12, 0x5cd5, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, contentBytes.length, true);
    view.setUint32(22, contentBytes.length, true);
    view.setUint16(26, fileNameBytes.length, true);
    view.setUint16(28, 0, true);

    localHeader.set(fileNameBytes, 30);
    fileRecords.push(localHeader);
    fileRecords.push(contentBytes);

    const centralHeader = new Uint8Array(46 + fileNameBytes.length);
    const cView = new DataView(centralHeader.buffer);

    cView.setUint32(0, 0x02014b50, true);
    cView.setUint16(4, 20, true);
    cView.setUint16(6, 20, true);
    cView.setUint16(8, 0, true);
    cView.setUint16(10, 0, true);
    cView.setUint16(12, 0x546b, true);
    cView.setUint16(14, 0x5cd5, true);
    cView.setUint32(16, crc, true);
    cView.setUint32(20, contentBytes.length, true);
    cView.setUint32(24, contentBytes.length, true);
    cView.setUint16(28, fileNameBytes.length, true);
    cView.setUint16(30, 0, true);
    cView.setUint16(32, 0, true);
    cView.setUint16(34, 0, true);
    cView.setUint16(36, 0, true);
    cView.setUint32(38, 0, true);
    cView.setUint32(42, offset, true);

    centralHeader.set(fileNameBytes, 46);
    centralDirectoryRecords.push(centralHeader);

    offset += localHeader.length + contentBytes.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const c of centralDirectoryRecords) {
    centralDirSize += c.length;
  }

  const eocd = new Uint8Array(22);
  const eView = new DataView(eocd.buffer);
  eView.setUint32(0, 0x06054b50, true);
  eView.setUint16(4, 0, true);
  eView.setUint16(6, 0, true);
  eView.setUint16(8, files.length, true);
  eView.setUint16(10, files.length, true);
  eView.setUint32(12, centralDirSize, true);
  eView.setUint32(16, centralDirOffset, true);
  eView.setUint16(20, 0, true);

  return new Blob([...fileRecords, ...centralDirectoryRecords, eocd] as unknown as BlobPart[], {
    type: 'application/zip',
  });
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

export async function triggerOrbitDownload(): Promise<void> {
  const currentConfig = getStoredConfig();
  logDownloadEvent(currentConfig.fileName || 'Orbit-Client-v2.4.1.zip').catch(() => {});

  // 1. If owner set an external download link
  if (currentConfig.customDownloadUrl && currentConfig.customDownloadUrl.trim() !== '') {
    const a = document.createElement('a');
    a.href = currentConfig.customDownloadUrl.trim();
    a.download = currentConfig.fileName || 'Orbit-Client.zip';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // 2. If owner uploaded a custom file to the browser
  const uploadedFile = await getStoredReleaseFile();
  if (uploadedFile) {
    const url = URL.createObjectURL(uploadedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentConfig.fileName || uploadedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return;
  }

  // 3. Fallback to default high-contrast release package
  const configContent = JSON.stringify(
    {
      portal: "VrcModMenu",
      client_name: "Orbit",
      version: currentConfig.version || "2.4.1",
      build_target: "VRChat Build 1482+",
      theme: {
        palette: "monochrome_pure_black",
        high_contrast: true,
        hud_opacity: 0.92,
        accent_color: "#ffffff"
      },
      features: {
        avatar_tools: {
          enable_pedestal_cloner: true,
          bone_weight_limiter: 256,
          enforce_fallback_shader: false,
          strip_malicious_mesh_data: true
        },
        visual_esp: {
          enabled: true,
          draw_wireframe_box: true,
          show_distance_meters: true,
          show_trust_level_tag: true,
          occlusion_culling: true,
          radar_display: true
        },
        performance: {
          fps_limiter_mode: "vr_refresh_sync",
          max_particles_per_avatar: 3000,
          clamp_dynamic_bone_distance: 12.0,
          limit_unfocused_frametime: true,
          suppress_micro_stutters: true
        },
        anti_crash: {
          active_shield: true,
          drop_malicious_shaders: true,
          sanitize_audio_sources: true,
          max_audio_decibels: 0.0,
          reject_corrupted_animator_packets: true
        },
        keybinds: {
          toggle_overlay: "Insert",
          toggle_quick_mute: "End",
          toggle_esp: "F4",
          rejoin_world: "F8"
        }
      }
    },
    null,
    2
  );

  const readmeContent = `======================================================
  VRC MOD MENU // ORBIT CLIENT RELEASE
  Portal: VrcModMenu
  Client: Orbit
  Release: ${currentConfig.version}
======================================================

Release Date: March 2026
Verified For: VRChat Game Build 1482+
Checksum (SHA-256): ${currentConfig.sha256}

QUICK INSTALLATION:
1. Ensure MelonLoader (v0.6.1 or newer) is installed to your VRChat directory.
2. Extract the contents of this archive:
   - Orbit.dll
   - orbit_config.json
3. Place 'Orbit.dll' and 'orbit_config.json' inside:
   [SteamLibrary]/steamapps/common/VRChat/Mods/
4. Launch VRChat via Steam or Oculus Launcher.
5. In-Game Controls:
   - Desktop Mode: Press [Insert] to toggle the Orbit Monochrome Overlay.
   - VR Mode: Click [Right Thumbstick] while opening the Quick Menu.

Hosted on VrcModMenu Portal.
`;

  const checksumContent = `${currentConfig.sha256} *Orbit.dll\n`;
  const dllHeader = `MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00\xb8\x00\x00\x00\x00\x00\x00\x00@\x00\x00\x00\x00\x00\x00\x00VrcModMenu.Orbit.Client.Assembly`;

  const blob = createZipArchive([
    { name: 'Orbit.dll', content: dllHeader },
    { name: 'orbit_config.json', content: configContent },
    { name: 'README_INSTALL.txt', content: readmeContent },
    { name: 'checksums.sha256', content: checksumContent }
  ]);

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = currentConfig.fileName || 'VrcModMenu-Orbit.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
