/**
 * roleManager.ts
 * Manages Guest vs Co-Owner vs Owner access control.
 * By default, any new visitor to the link is strictly a 'guest'.
 * Guests cannot see or access Owner tools or set custom files.
 * The Owner unlocks their role via the secret passkey or secret owner URL parameter.
 */

export type UserRole = 'guest' | 'co-owner' | 'owner';

export interface RoleState {
  currentRole: UserRole;
  ownerPasskey: string;
  coOwnerPasskey: string;
  coOwnerName: string;
  coOwnerEmail: string;
}

const ROLE_STORAGE_KEY = 'vrcmodmenu_role_state';

// BY DEFAULT: New visitors are strictly 'guest'. Zero owner access.
const DEFAULT_ROLE_STATE: RoleState = {
  currentRole: 'guest',
  ownerPasskey: 'notnyxo', // Master passkey (also accepts 1337)
  coOwnerPasskey: 'coowner2026',
  coOwnerName: 'Friend / Partner',
  coOwnerEmail: 'coowner@vrcmodmenu.net',
};

export function getRoleState(): RoleState {
  try {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ownerParam = urlParams.get('owner');
      const roleParam = urlParams.get('role');
      const keyParam = urlParams.get('key');

      // 1. Check if Owner secret link is used (e.g. ?owner=notnyxo or ?key=notnyxo or ?owner=1337)
      if (
        ownerParam === 'notnyxo' || 
        ownerParam === '1337' || 
        keyParam === 'notnyxo' || 
        keyParam === '1337'
      ) {
        const saved = localStorage.getItem(ROLE_STORAGE_KEY);
        const state = saved ? { ...DEFAULT_ROLE_STATE, ...JSON.parse(saved) } : { ...DEFAULT_ROLE_STATE };
        state.currentRole = 'owner';
        localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(state));
        return state;
      }

      // 2. Check if Co-Owner invite link is used (e.g. ?role=co-owner)
      if (roleParam === 'co-owner' || roleParam === 'coowner') {
        const saved = localStorage.getItem(ROLE_STORAGE_KEY);
        const state = saved ? { ...DEFAULT_ROLE_STATE, ...JSON.parse(saved) } : { ...DEFAULT_ROLE_STATE };
        state.currentRole = 'co-owner';
        localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(state));
        return state;
      }

      // 3. Check persistent saved role in localStorage
      const saved = localStorage.getItem(ROLE_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.currentRole) {
            return { ...DEFAULT_ROLE_STATE, ...parsed };
          }
        } catch {
          // ignore corrupted json
        }
      }

      // 4. Auto-detect Owner environment:
      // In local dev or AI Studio dev/preview container (*.run.app, localhost),
      // the creator is the Owner. Automatically grant Owner role so they see custom & panel like it used to be.
      const host = window.location.hostname;
      const isOwnerDevEnvironment = 
        host === 'localhost' || 
        host === '127.0.0.1' || 
        host.includes('ais-dev-') || 
        host.includes('ais-pre-') || 
        host.includes('.run.app');

      if (isOwnerDevEnvironment) {
        return {
          ...DEFAULT_ROLE_STATE,
          currentRole: 'owner',
        };
      }
    }
  } catch (err) {
    console.warn('Failed to load role state:', err);
  }
  // All new public users on deployed domains (e.g. orbit-client-eight.vercel.app) default strictly to 'guest'
  return DEFAULT_ROLE_STATE;
}

export function saveRoleState(state: RoleState): void {
  try {
    localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('vrcmodmenu:role-updated'));
  } catch (err) {
    console.error('Failed to save role state:', err);
  }
}

export function authenticateOwner(passkey: string): boolean {
  const clean = passkey.trim();
  const current = getRoleState();
  if (clean === current.ownerPasskey || clean === 'notnyxo' || clean === '1337') {
    const updated: RoleState = { ...current, currentRole: 'owner' };
    saveRoleState(updated);
    return true;
  }
  return false;
}

export function logoutRole(): void {
  const current = getRoleState();
  const updated: RoleState = { ...current, currentRole: 'guest' };
  saveRoleState(updated);
}

export function generateCoOwnerInviteLink(): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('role', 'co-owner');
  return url.toString();
}

export function generateOwnerSecretLink(): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('owner', 'notnyxo');
  return url.toString();
}
