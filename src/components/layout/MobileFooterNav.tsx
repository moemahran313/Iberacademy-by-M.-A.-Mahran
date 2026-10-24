import React from 'react';
import { Compass, Sparkles, GraduationCap, Layers, User as UserIcon } from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export interface MobileFooterNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileFooterNav: React.FC<MobileFooterNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Hoy',
      icon: Compass,
      isActive: activeTab === 'dashboard'
    },
    {
      id: 'stories',
      label: 'Inmersión',
      icon: Sparkles,
      isActive: activeTab === 'stories' || activeTab === 'videos'
    },
    {
      id: 'workshop',
      label: 'Taller',
      icon: GraduationCap,
      isActive: ['workshop', 'vocabulary', 'verbs', 'grammar', 'tutor', 'shadowing', 'a0_foundation'].includes(activeTab)
    },
    {
      id: 'path',
      label: 'Progreso',
      icon: Layers,
      isActive: activeTab === 'path' || activeTab === 'planner'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: UserIcon,
      isActive: activeTab === 'profile'
    }
  ];

  const handleTabClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#181615]/95 backdrop-blur-md border-t border-stone-200/90 dark:border-stone-800/90 pb-safe pl-safe pr-safe shadow-lg">
      <nav className="flex items-center justify-around h-16 max-w-lg mx-auto px-2" aria-label="Mobile Navigation">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.isActive;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] px-2 py-1 rounded-xl transition-all cursor-pointer relative touch-expand-48 ${
                isActive
                  ? 'text-[#C85A32] dark:text-[#E07A5F] font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-110 bg-[#C85A32]/10 dark:bg-[#C85A32]/20' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <div className="absolute top-1 w-1 h-1 bg-[#C85A32] dark:bg-[#E07A5F] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
