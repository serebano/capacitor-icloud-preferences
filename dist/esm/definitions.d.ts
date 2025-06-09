import type { PluginListenerHandle } from '@capacitor/core';
export interface iCloudPreferencesPlugin {
    set(options: {
        key: string;
        value: any;
    }): Promise<void>;
    get(options: {
        key: string;
    }): Promise<{
        value: any;
    }>;
    remove(options: {
        key: string;
    }): Promise<void>;
    setContainer(options: {
        identifier: string;
    }): Promise<void>;
    configureSyncKeys(options: {
        keys: string[];
    }): Promise<void>;
    addListener(eventName: 'icloudSyncComplete', listenerFunc: (data: Record<string, any>) => void): Promise<PluginListenerHandle>;
    removeAllListeners(): Promise<void>;
}
