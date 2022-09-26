import { LocalStorageHelper } from './../helper/local-storage.helper';
import { MessageResponse } from '../model/message-response.model';
import { HttpService } from './http.service';
import { AbstractAuthService } from './abstract.service';
import { AUTH_PROJECT } from '../consts/projects.const';

export class LoginService extends AbstractAuthService {
	async login(username: string, password: string): Promise<MessageResponse> {
		const dataArr = [
			'AUTH/API/GET_PROJECT',
			'AUTH/API/GET_USER',
			'AUTH/API/GET_SCOPE',
			'AUTH/API/GRANT_SCOPE',
			'AUTH/API/INACTIVATE_USER',
			'AUTH/API/ACTIVATE_USER'
		];

		const response = await this.httpService.makePost('/auth/login', dataArr, {
			Authorization: HttpService.GetTokenBasicAuth(username, password),
			projectkey: AUTH_PROJECT,
			filterscopes: 1
		});

		console.log(response.status);
		console.log(response.data);

		switch (response.status) {
			case 200:
			case 201:
				LocalStorageHelper.setValue('apiToken', response.data.token);
				console.log(response.data.token);
				console.log(LocalStorageHelper.getValue('apiToken'));
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
