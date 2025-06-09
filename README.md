# Capacitor iCloud Preferences Plugin

Sync preferences to iCloud using `NSUbiquitousKeyValueStore`.

## Features

- ✅ Simple key-value storage with iCloud sync
- ✅ Works across all iOS devices logged into the same iCloud account
- ✅ Compatible with Capacitor 7

## Installation

```bash
npm install @serebano/capacitor-icloud-preferences
npx cap sync ios
```

## iOS Configuration

1. Open your project in Xcode:

   ```bash
   npx cap open ios
   ```

2. Go to your target > **Signing & Capabilities**.

3. Click `+ Capability` and add **iCloud**.

4. Enable the checkbox for **Key-Value storage**.

5. Ensure your App ID is enabled for iCloud in the [Apple Developer Portal](https://developer.apple.com/account/resources/identifiers/list).

6. Rebuild your app to apply changes.

## Usage

Use Capacitor Preferences by default, and fallback to iCloud sync for iOS:

```ts
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { iCloudPreferences } from '@serebano/capacitor-icloud-preferences';

async function setPreference(key: string, value: any) {
  await Preferences.set({ key, value: JSON.stringify(value) });

  if (Capacitor.getPlatform() === 'ios') {
    try {
      await iCloudPreferences.set({ key, value });
    } catch (e) {
      console.warn('iCloud sync failed:', e);
    }
  }
}

async function getPreference(key: string) {
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const result = await iCloudPreferences.get({ key });
      if (result.value !== null) return result.value;
    } catch (e) {
      console.warn('iCloud fetch failed, falling back:', e);
    }
  }

  const result = await Preferences.get({ key });
  return result.value ? JSON.parse(result.value) : null;
}
```

## Sync iCloud to Preferences on App Start

The plugin will automatically attempt to sync keys from iCloud on load. To enable this, configure the keys you want to sync early in your app:

```ts
import { iCloudPreferences } from '@serebano/capacitor-icloud-preferences';
import { Preferences } from '@capacitor/preferences';

const keysToSync = ['theme', 'language'];

export async function initializeiCloudSync() {
  await iCloudPreferences.configureSyncKeys({ keys: keysToSync });

  iCloudPreferences.addListener('icloudSyncComplete', async (data: any) => {
    for (const key of keysToSync) {
      if (data[key] != null) {
        await Preferences.set({ key, value: JSON.stringify(data[key]) });
      }
    }
  });
}
```

Call `initializeiCloudSync()` in your app’s startup (e.g., `main.ts` or `App.vue` `onMounted`).

## API

### `set({ key, value })`

Stores a value in iCloud-synced preferences.

- `key: string` – required
- `value: any` – required

### `get({ key })`

Retrieves a value from iCloud preferences.

- `key: string` – required

Returns `{ value: any }`.

### `remove({ key })`

Removes a value from iCloud preferences.

- `key: string` – required

## Compatibility

- ✅ iOS 14+
- ✅ Capacitor 6+
- ✅ Fully tested on Capacitor 7

## License

MIT