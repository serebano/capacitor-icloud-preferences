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
}
declare const iCloudPreferences: iCloudPreferencesPlugin;
export * from './definitions';
export { iCloudPreferences };
