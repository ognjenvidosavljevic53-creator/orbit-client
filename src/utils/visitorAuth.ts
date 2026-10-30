/**
 * visitorAuth.ts
 * Manages visitor identification & login for VrcModMenu.
 * Visitors sign in with their username/handle (e.g., VRChat username or Discord tag).
 * Their username is subsequently attached to all page views, feature interactions, and downloads.
 */

export interface VisitorUser {
  id: string;
  username: string;
  handle?: string;
  loginTimestamp: number;
  downloadCount: number;
  lastActive: number;
}

const CURRENT_USER_KEY = 'vrcmodmenu_logged_visitor';
const ALL_USERS_KEY = 'vrcmodmenu_registered_visitors';

const SAMPLE_VISITORS: VisitorUser[] = [
  {
    id: 'usr-1',
    username: 'Astrid_VR',
    handle: '@astrid_vrchat',
    loginTimestamp: Date.now() - 1000 * 60 * 35,
    downloadCount: 2,
    lastActive: Date.now() - 1000 * 60 * 5,
  },
  {
    id: 'usr-2',
    username: 'KitsuneModder',
    handle: '@kitsunex',
    loginTimestamp: Date.now() - 1000 * 60 * 90,
    downloadCount: 1,
    lastActive: Date.now() - 1000 * 60 * 18,
  },
  {
    id: 'usr-3',
    username: 'VoidWalker',
    handle: '@voidwalker_99',
    loginTimestamp: Date.now() - 1000 * 60 * 140,
    downloadCount: 1,
    lastActive: Date.now() - 1000 * 60 * 45,
  },
  {
    id: 'usr-4',
    username: 'GlitchHunter',
    handle: '@glitch_h',
    loginTimestamp: Date.now() - 1000 * 60 * 240,
    downloadCount: 0,
    lastActive: Date.now() - 1000 * 60 * 60,
  },
];

export function getRegisteredVisitors(): VisitorUser[] {
  try {
    const raw = localStorage.getItem(ALL_USERS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse visitors:', err);
  }
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(SAMPLE_VISITORS));
  return SAMPLE_VISITORS;
}

export function getCurrentVisitor(): VisitorUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse current visitor:', err);
  }
  return null;
}

export function loginVisitor(username: string, handle?: string): VisitorUser {
  const cleanUsername = username.trim() || 'VRChat_Guest_' + Math.floor(100 + Math.random() * 900);
  const cleanHandle = handle?.trim() || `@${cleanUsername.toLowerCase().replace(/\s+/g, '_')}`;

  const all = getRegisteredVisitors();
  let existing = all.find((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());

  if (existing) {
    existing.lastActive = Date.now();
    existing.handle = cleanHandle;
  } else {
    existing = {
      id: 'usr-' + Date.now(),
      username: cleanUsername,
      handle: cleanHandle,
      loginTimestamp: Date.now(),
      downloadCount: 0,
      lastActive: Date.now(),
    };
    all.unshift(existing);
  }

  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent('vrcmodmenu:visitor-auth-changed'));
  return existing;
}

export function logoutVisitor(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new CustomEvent('vrcmodmenu:visitor-auth-changed'));
}

export function incrementVisitorDownloadCount(): void {
  const current = getCurrentVisitor();
  if (!current) return;

  current.downloadCount += 1;
  current.lastActive = Date.now();
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current));

  const all = getRegisteredVisitors();
  const idx = all.findIndex((u) => u.id === current.id);
  if (idx !== -1) {
    all[idx] = current;
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all));
  }
}
