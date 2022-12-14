import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'users';

export class GetUserService extends AbstractAuthService {
	async searchUsers(
		name = '',
		projectKey = '',
		onlyActive = true
	): Promise<MessageResponse> {
		const params = `?name=${name}&projectKey=${projectKey}&active=${onlyActive}`;
		const response = await this.httpService.makeGet(
			`/${ctrl}/search${params}`,
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}

	async getUserById(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(`/${ctrl}/details/${id}`, {
			Authorization: HttpService.GetBearerTokenAuth('apiToken')
		});

		return this.validateGetResponse(response);
	}
}
