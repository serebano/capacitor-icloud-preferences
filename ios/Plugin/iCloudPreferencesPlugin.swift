import Foundation
import Capacitor

@objc(iCloudPreferencesPlugin)
public class iCloudPreferencesPlugin: CAPPlugin {
    let store = NSUbiquitousKeyValueStore.default
    private var keysToSync: [String] = []

    @objc func set(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Key is required")
            return
        }

        guard let value = call.getAny("value") else {
            call.reject("Value is required")
            return
        }

        store.set(value, forKey: key)
        store.synchronize()
        call.resolve()
    }

    @objc func get(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Key is required")
            return
        }

        let value = store.object(forKey: key)
        call.resolve(["value": value ?? NSNull()])
    }

    @objc func remove(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Key is required")
            return
        }

        store.removeObject(forKey: key)
        store.synchronize()
        call.resolve()
    }

    @objc func configureSyncKeys(_ call: CAPPluginCall) {
        if let keys = call.getArray("keys", String.self) {
            self.keysToSync = keys
            call.resolve()
        } else {
            call.reject("keys array is required")
        }
    }

    public override func load() {
        syncAllKeysToPreferences()
    }

    private func syncAllKeysToPreferences() {
        guard !keysToSync.isEmpty else { return }

        var synced: [String: Any] = [:]
        for key in keysToSync {
            if let value = store.object(forKey: key) {
                synced[key] = value
            }
        }

        notifyListeners("icloudSyncComplete", data: synced)
    }
}
