import { HttpService } from './http.service';
import { AxiosResponse } from 'axios';
import { MessageResponse } from '../model/message-response.model';

export abstract class AbstractAuthService {
	protected httpService: HttpService;
	constructor() {
		this.httpService = new HttpService('http://auth.devseeder.com');
	}

	validateGetResponse(response: AxiosResponse) {
		switch (response.status) {
			case 200:
			case 201:
			case 202:
			case 203:
			case 204:
				return new MessageResponse(true, response.data);
			default:
				return new MessageResponse(false, 'Error: ' + response.data.message);
		}
	}
}
