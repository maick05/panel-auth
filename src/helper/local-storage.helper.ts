export class LocalStorageHelper {
	static getValue<GetType>(key: string): GetType | null {
		const value = localStorage.getItem(key);
		if (!value) return null;
		return JSON.parse(value);
	}

	static setValue<SetType>(key: string, value: SetType) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static removeItem(key: string) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}

	static IsCached(): boolean {
		const token = LocalStorageHelper.getValue('apiToken');
		return token !== null;
	}
}
