import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'users';

export class GetUserService extends AbstractAuthService {
	async searchUsers(name = '', projectKey = ''): Promise<MessageResponse> {
		const params = `?name=${name}&projectKey=${projectKey}`;
		const response = await this.httpService.makeGet(
			`/${ctrl}/search${params}`,
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken'),
				projectkey: 'AUTH'
			}
		);

		return this.validateGetResponse(response);
	}
}
