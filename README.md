# Capacitor iCloud Preferences Plugin

Sync key-value preferences to iCloud using `NSUbiquitousKeyValueStore`, with optional fallback to Capacitor Preferences.

## Features

- ✅ iCloud key-value storage on iOS
- ✅ Cross-device sync with iCloud
- ✅ Supports custom containers
- ✅ Optional fallback to Capacitor Preferences
- ✅ Fully compatible with Capacitor 6 and 7

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

2. Go to your app target → **Signing & Capabilities** tab.

3. Click **+ Capability** and add **iCloud**.

4. Enable **Key-Value storage**.

5. Under the iCloud section, ensure your app has a valid iCloud container:
   - Default: `iCloud.<your-app-bundle-id>`
   - Can be created/managed in the [Apple Developer Portal](https://developer.apple.com/account/resources/identifiers/list)
   - Ensure it's selected in Xcode under "Containers"

> ℹ️ By default, the plugin uses `.default`, which uses the app's default container.
> If you need a custom container, see below.

### Custom iCloud Container

If you need to use a custom container (e.g., shared across multiple apps):

```ts
await iCloudPreferences.setContainer({
  identifier: 'iCloud.com.example.shared',
});
```

Make sure the container is registered in your provisioning profile and selected in Xcode.

## Usage Example: Hybrid Preferences

Use Capacitor Preferences normally, with iCloud sync on iOS:

```ts
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { iCloudPreferences } from '@serebano/capacitor-icloud-preferences';

async function setPreference(key: string, value: any) {
  await Preferences.set({ key, value: JSON.stringify(value) });

  if (Capacitor.getPlatform() === 'ios') {
    try {
      await iCloudPreferences.set({ key, value });
    } catch (err) {
      console.warn('iCloud sync failed:', err);
    }
  }
}

async function getPreference(key: string) {
  if (Capacitor.getPlatform() === 'ios') {
    try {
      const { value } = await iCloudPreferences.get({ key });
      if (value != null) return value;
    } catch (err) {
      console.warn('iCloud fetch failed, falling back:', err);
    }
  }

  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : null;
}
```

## Auto Sync from iCloud on App Start

To sync known keys from iCloud to Capacitor Preferences at app start:

```ts
const keysToSync = ['theme', 'language'];

await iCloudPreferences.setContainer({
  identifier: 'iCloud.com.example.shared', // Optional
});

await iCloudPreferences.configureSyncKeys({ keys: keysToSync });

iCloudPreferences.addListener('icloudSyncComplete', async (data) => {
  for (const key of keysToSync) {
    if (data[key] != null) {
      await Preferences.set({ key, value: JSON.stringify(data[key]) });
    }
  }
});
```

Call this early in your app (e.g. `main.ts` or `App.vue` `onMounted`).

## API

### `set({ key, value })`
Store a value in iCloud.

### `get({ key })`
Fetch a value from iCloud.

### `remove({ key })`
Remove a value from iCloud.

### `configureSyncKeys({ keys })`
Specify which keys should be synced on plugin load.

### `setContainer({ identifier })`
Set a custom iCloud container identifier.

### `addListener('icloudSyncComplete', callback)`
Listen for a sync event with data when plugin loads.

### `removeAllListeners()`
Unsubscribe all listeners.

## License

MIT