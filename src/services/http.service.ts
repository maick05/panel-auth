import { LocalStorageHelper } from './../helper/local-storage.helper';
import axios, { AxiosError } from 'axios';
import { Buffer } from 'buffer';
import { CustomResponse } from '../interfaces/custom-response.interface';

export class HttpService {
	constructor(protected readonly url: string) {}

	async makePost(
		endpoint: string,
		data: any,
		headers = {}
	): Promise<CustomResponse | any> {
		try {
			const response = await axios.post(
				`${this.url}${endpoint}`,
				JSON.stringify(data),
				{
					headers: {
						'Content-Type': 'application/json',
						...headers
					}
				}
			);

			return response;
		} catch (err) {
			if (err instanceof AxiosError) return err.response;

			return err;
		}
	}

	async makeGet(endpoint: string, headers = {}): Promise<CustomResponse | any> {
		try {
			const response = await axios.get(`${this.url}${endpoint}`, {
				headers: {
					'Content-Type': 'application/json',
					...headers
				}
			});

			return response;
		} catch (err) {
			if (err instanceof AxiosError) return err.response;

			return err;
		}
	}

	static GetTokenBasicAuth(username: string, password: string) {
		return 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
	}

	static GetBearerTokenAuth(keyToken: string) {
		return 'Bearer ' + LocalStorageHelper.getValue<String>(keyToken);
	}
}
