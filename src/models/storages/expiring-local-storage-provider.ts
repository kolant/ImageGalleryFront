import { LocalStorageProvider } from "./local-storage-provider";
import { isNull } from "@/utils/utils";

export class ExpiringLocalStorageProvider extends LocalStorageProvider {
    set(key: string, value: any, lifeTimeInMinutes?: number): any {
        if (!isNull(lifeTimeInMinutes)) {
            const currentTime = new Date().getTime();
            const expires = new Date(currentTime + lifeTimeInMinutes * 60000);

            return super.set(key, { value, expires })
        }

        return super.set(key, value)
    }

    get(key: string): any {
        const cached = super.get(key)
        if (isNull(cached)) { return null }

        const expires = new Date(cached.expires);
        if (expires < new Date()) {
            super.delete(key)
            return null;
        }

        return cached.value;
    }
}

export default new ExpiringLocalStorageProvider()
