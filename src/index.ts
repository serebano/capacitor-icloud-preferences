import { registerPlugin } from '@capacitor/core';

export interface iCloudPreferencesPlugin {
  set(options: { key: string; value: any }): Promise<void>;
  get(options: { key: string }): Promise<{ value: any }>;
  remove(options: { key: string }): Promise<void>;
}

const iCloudPreferences = registerPlugin<iCloudPreferencesPlugin>('iCloudPreferences');

export * from './definitions';
export { iCloudPreferences };
