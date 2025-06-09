# Capacitor iCloud Preferences Plugin

Sync preferences to iCloud using NSUbiquitousKeyValueStore.

## Installation
```bash
npm install @serebano/capacitor-icloud-preferences
npx cap sync ios
```

## Usage
```ts
import { iCloudPreferences } from '@serebano/capacitor-icloud-preferences';

await iCloudPreferences.set({ key: 'theme', value: 'dark' });
const result = await iCloudPreferences.get({ key: 'theme' });
console.log(result.value);
```