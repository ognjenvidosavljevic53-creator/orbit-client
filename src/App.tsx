import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { FeaturesGrid } from './components/FeaturesGrid.tsx';
import { ShowcasePreview } from './components/ShowcasePreview.tsx';
import { DownloadSection } from './components/DownloadSection.tsx';
import { SafetySection } from './components/SafetySection.tsx';
import { CreditsSection } from './components/CreditsSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { DownloadModal } from './components/DownloadModal.tsx';
import { OwnerPanel } from './components/OwnerPanel.tsx';
import { OwnerAuthModal } from './components/OwnerAuthModal.tsx';
import { SecretOwnerPage } from './components/SecretOwnerPage.tsx';
import { triggerOrbitDownload } from './utils/downloadHelper.ts';
import { ReleaseConfig, getStoredConfig, DEFAULT_RELEASE } from './utils/releaseStorage.ts';
import { logPageView } from './utils/analyticsTracker.ts';
import { getRoleState, UserRole } from './utils/roleManager.ts';
import { incrementVisitorDownloadCount } from './utils/visitorAuth.ts';
import { Info, X } from 'lucide-react';

function checkIsSecretRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path === '/secret-owner' ||
    path.startsWith('/secret-owner') ||
    hash.includes('secret-owner') ||
    search.includes('secret-owner')
  );
}

export default function App() {
  const [config, setConfig] = useState<ReleaseConfig>(DEFAULT_RELEASE);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [ownerPanelOpen, setOwnerPanelOpen] = useState(false);
  const [ownerAuthOpen, setOwnerAuthOpen] = useState(false);
  const [coOwnerBannerDismissed, setCoOwnerBannerDismissed] = useState(false);
  const [role, setRole] = useState<UserRole>(() => getRoleState().currentRole);
  const [isSecretRoute, setIsSecretRoute] = useState<boolean>(checkIsSecretRoute);

  useEffect(() => {
    setConfig(getStoredConfig());

    const roleState = getRoleState();
    setRole(roleState.currentRole);

    logPageView('Viewed VrcModMenu Homepage').catch(() => {});

    const handleRoleUpdate = () => {
      const updated = getRoleState();
      setRole(updated.currentRole);
    };
    window.addEventListener('vrcmodmenu:role-updated', handleRoleUpdate);

    const handleLocationChange = () => {
      setIsSecretRoute(checkIsSecretRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Discreet shortcut for Owner: Ctrl+Shift+O or Cmd+Shift+O
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        e.preventDefault();
        setOwnerAuthOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('vrcmodmenu:role-updated', handleRoleUpdate);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const refreshConfig = () => {
    setConfig(getStoredConfig());
  };

  // Direct download handler: downloads file immediately for visitors and owners
  const handleOpenDownload = async () => {
    incrementVisitorDownloadCount();
    await triggerOrbitDownload();
    setDownloadModalOpen(true);
  };

  const handleDownloadTriggered = async () => {
    incrementVisitorDownloadCount();
    await triggerOrbitDownload();
    setDownloadModalOpen(true);
  };

  const handleScrollToPreview = () => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
    setIsSecretRoute(false);
  };

  // If visitor navigated to /secret-owner, render the dedicated stealth gateway
  if (isSecretRoute) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <SecretOwnerPage
          config={config}
          currentRole={role}
          onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
          onNavigateHome={navigateToHome}
        />

        {/* Owner Operations Panel */}
        <OwnerPanel
          isOpen={ownerPanelOpen}
          onClose={() => setOwnerPanelOpen(false)}
          onConfigUpdated={refreshConfig}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* Co-Owner Role Active Banner (Only shown if invited co-owner) */}
      {role === 'co-owner' && !coOwnerBannerDismissed && (
        <aside aria-label="Role assignment status" className="bg-neutral-900 border-b border-neutral-700 px-4 py-2 font-mono text-xs text-neutral-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-white" />
            <span>
              <strong>CO-OWNER MODE ACTIVE:</strong> You have permissions to customize site branding, AI queries & view analytics. File replacement is restricted to the Owner.
            </span>
            <button
              onClick={() => setOwnerPanelOpen(true)}
              className="underline text-white ml-2 hover:text-neutral-400"
            >
              Open Customizer
            </button>
          </div>
          <button
            onClick={() => setCoOwnerBannerDismissed(true)}
            className="p-1 text-neutral-400 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Top Bar Navigation (Clean public presentation without Visitor Sign In or Owner Login buttons) */}
      <Navbar
        config={config}
        currentRole={role}
        onOpenDownload={handleOpenDownload}
        onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          config={config}
          currentRole={role}
          onOpenDownload={handleOpenDownload}
          onExplorePreview={handleScrollToPreview}
          onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        />

        {/* 6-Card Features Grid with Movement, World Hacks, Boxing, Spoof */}
        <FeaturesGrid />

        {/* Framing Area & Live Interactive Menu Simulator */}
        <ShowcasePreview />

        {/* Step-by-Step Installation & Direct Download */}
        <DownloadSection
          config={config}
          currentRole={role}
          onDownloadTriggered={handleDownloadTriggered}
          onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        />

        {/* Safety Philosophy & Integrity */}
        <SafetySection />

        {/* Official Credits to notnyxo */}
        <CreditsSection />

        {/* Technical FAQ */}
        <FaqSection />
      </main>

      {/* Footer with notnyxo credits, Discord, GitHub (zero Owner Gate button for public visitors) */}
      <Footer
        config={config}
        currentRole={role}
        onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
      />

      {/* Download Confirmation & Verification Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        config={config}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Owner & Team Operations Panel with AI & Visitor Search */}
      <OwnerPanel
        isOpen={ownerPanelOpen}
        onClose={() => setOwnerPanelOpen(false)}
        onConfigUpdated={refreshConfig}
      />

      {/* Hidden Owner Passkey Gate Modal (Triggered by Ctrl+Shift+O / Cmd+Shift+O) */}
      <OwnerAuthModal
        isOpen={ownerAuthOpen}
        onClose={() => setOwnerAuthOpen(false)}
        onSuccess={() => {
          setRole('owner');
          setOwnerPanelOpen(true);
        }}
      />
    </div>
  );
}
