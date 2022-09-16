import axios, { AxiosError } from 'axios';
import { Buffer } from 'buffer';
import { CustomResponse } from '../interfaces/custom-response.interface';

export class HttpService {
	static async makePost(
		url: string,
		data: any,
		headers = {}
	): Promise<CustomResponse | any> {
		try {
			const response = await axios.post(url, JSON.stringify(data), {
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
}
