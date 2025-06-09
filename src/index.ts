import { registerPlugin } from '@capacitor/core';
import type { iCloudPreferencesPlugin } from './definitions';

const iCloudPreferences = registerPlugin<iCloudPreferencesPlugin>('iCloudPreferences');

export * from './definitions';
export { iCloudPreferences };
