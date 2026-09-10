import { create } from 'zustand';

interface SettingsState {
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
  toggleTheme: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark', // Force dark for TradeVision
  notificationsEnabled: true,
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
}));
