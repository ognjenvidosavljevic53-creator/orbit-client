/**
 * roleManager.ts
 * Manages Owner vs Co-Owner permissions and passkeys for VrcModMenu.
 * Owner has full access including replacing release files.
 * Co-Owner can customize site metadata/announcements/branding, but CANNOT change the release file.
 */

export type UserRole = 'owner' | 'co-owner';

export interface RoleState {
  currentRole: UserRole;
  ownerPasskey: string;
  coOwnerPasskey: string;
  coOwnerName: string;
  coOwnerEmail: string;
}

const ROLE_STORAGE_KEY = 'vrcmodmenu_role_state';

const DEFAULT_ROLE_STATE: RoleState = {
  currentRole: 'owner',
  ownerPasskey: '1337',
  coOwnerPasskey: 'coowner2026',
  coOwnerName: 'Friend / Partner',
  coOwnerEmail: 'coowner@vrcmodmenu.net',
};

export function getRoleState(): RoleState {
  try {
    // Check URL query parameters first (e.g. ?role=co-owner or ?invite=co-owner)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role');
      if (roleParam === 'co-owner' || roleParam === 'coowner') {
        const saved = localStorage.getItem(ROLE_STORAGE_KEY);
        const state = saved ? { ...DEFAULT_ROLE_STATE, ...JSON.parse(saved) } : DEFAULT_ROLE_STATE;
        state.currentRole = 'co-owner';
        localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(state));
        return state;
      }
    }

    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_ROLE_STATE, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Failed to load role state:', err);
  }
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

export function generateCoOwnerInviteLink(): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('role', 'co-owner');
  return url.toString();
}
