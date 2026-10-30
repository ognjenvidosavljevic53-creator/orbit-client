import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { FeaturesGrid } from './components/FeaturesGrid.tsx';
import { ShowcasePreview } from './components/ShowcasePreview.tsx';
import { DownloadSection } from './components/DownloadSection.tsx';
import { SafetySection } from './components/SafetySection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { DownloadModal } from './components/DownloadModal.tsx';
import { OwnerPanel } from './components/OwnerPanel.tsx';
import { VisitorAuthModal } from './components/VisitorAuthModal.tsx';
import { triggerOrbitDownload } from './utils/downloadHelper.ts';
import { ReleaseConfig, getStoredConfig, DEFAULT_RELEASE } from './utils/releaseStorage.ts';
import { logPageView } from './utils/analyticsTracker.ts';
import { getRoleState } from './utils/roleManager.ts';
import { 
  VisitorUser, 
  getCurrentVisitor, 
  incrementVisitorDownloadCount 
} from './utils/visitorAuth.ts';
import { Info, X, User } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ReleaseConfig>(DEFAULT_RELEASE);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [ownerPanelOpen, setOwnerPanelOpen] = useState(false);
  const [visitorAuthOpen, setVisitorAuthOpen] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState<VisitorUser | null>(null);
  const [coOwnerBannerDismissed, setCoOwnerBannerDismissed] = useState(false);
  const [role, setRole] = useState<'owner' | 'co-owner'>('owner');

  useEffect(() => {
    // 1. Load active release configuration
    setConfig(getStoredConfig());

    // 2. Load active visitor user
    setCurrentVisitor(getCurrentVisitor());

    // 3. Check active role
    const roleState = getRoleState();
    setRole(roleState.currentRole);

    // 4. Log page view telemetry
    logPageView('Viewed VrcModMenu Homepage').catch(() => {});

    // 5. Listen for role changes
    const handleRoleUpdate = () => {
      const updated = getRoleState();
      setRole(updated.currentRole);
    };
    window.addEventListener('vrcmodmenu:role-updated', handleRoleUpdate);

    // 6. Listen for visitor auth changes
    const handleVisitorAuthUpdate = () => {
      setCurrentVisitor(getCurrentVisitor());
    };
    window.addEventListener('vrcmodmenu:visitor-auth-changed', handleVisitorAuthUpdate);

    return () => {
      window.removeEventListener('vrcmodmenu:role-updated', handleRoleUpdate);
      window.removeEventListener('vrcmodmenu:visitor-auth-changed', handleVisitorAuthUpdate);
    };
  }, []);

  const refreshConfig = () => {
    setConfig(getStoredConfig());
  };

  const handleOpenDownload = async () => {
    // If not logged in, prompt visitor login modal first to capture their name
    const visitor = getCurrentVisitor();
    if (!visitor) {
      setVisitorAuthOpen(true);
      return;
    }

    incrementVisitorDownloadCount();
    await triggerOrbitDownload();
    setDownloadModalOpen(true);
  };

  const handleDownloadTriggered = async () => {
    const visitor = getCurrentVisitor();
    if (!visitor) {
      setVisitorAuthOpen(true);
      return;
    }
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

  const handleLoginSuccess = async (user: VisitorUser) => {
    setCurrentVisitor(user);
    // Proceed to initiate download after identifying
    incrementVisitorDownloadCount();
    await triggerOrbitDownload();
    setDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* Co-Owner Role Active Banner */}
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

      {/* Top Bar Navigation */}
      <Navbar
        config={config}
        currentVisitor={currentVisitor}
        onOpenDownload={handleOpenDownload}
        onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        onOpenLogin={() => setVisitorAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          config={config}
          onOpenDownload={handleOpenDownload}
          onExplorePreview={handleScrollToPreview}
          onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        />

        {/* 6-Card Features Grid */}
        <FeaturesGrid />

        {/* Framing Area & Live Interactive Menu Simulator */}
        <ShowcasePreview />

        {/* Step-by-Step Installation & Direct Download */}
        <DownloadSection
          config={config}
          onDownloadTriggered={handleDownloadTriggered}
          onOpenOwnerPanel={() => setOwnerPanelOpen(true)}
        />

        {/* Safety Philosophy & Integrity */}
        <SafetySection />

        {/* Technical FAQ */}
        <FaqSection />
      </main>

      {/* Footer with Discord, GitHub, Owner Link, and Safety Disclaimer */}
      <Footer
        config={config}
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

      {/* Visitor Sign In Gate Modal */}
      <VisitorAuthModal
        isOpen={visitorAuthOpen}
        onClose={() => setVisitorAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
