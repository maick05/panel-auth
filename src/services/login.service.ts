import { MessageResponse } from '../model/message-response.model';
import { HttpService } from './http.service';
export class LoginService {
	async login(username: string, password: string): Promise<MessageResponse> {
		const dataArr = [
			'AUTH/API/GET_PROJECT',
			'AUTH/API/GET_USER',
			'AUTH/API/GET_SCOPE'
		];

		const response = await HttpService.makePost(
			'http://auth.devseeder.com/auth/login',
			dataArr,
			{
				Authorization: HttpService.GetTokenBasicAuth(username, password),
				projectkey: 'AUTH'
			}
		);

		console.log(response);
		console.log(response.status);
		console.log(response.data);

		switch (response.status) {
			case 200:
			case 201:
			case 202:
			case 203:
			case 204:
				return new MessageResponse(true, '');
			case 401:
			case 403:
				return new MessageResponse(
					false,
					`Username and password doesn't match!`
				);
			default:
				return new MessageResponse(false, 'Error: ' + response.data.message);
		}
	}
}
