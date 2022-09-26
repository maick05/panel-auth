import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'users';

export class GrantScopeService extends AbstractAuthService {
	async grantScope(
		username = '',
		projectKey = '',
		scopes: string[]
	): Promise<MessageResponse> {
		const data = {
			username,
			projectKey,
			scopes
		};
		const response = await this.httpService.makePost(
			`/${ctrl}/grantscope`,
			data,
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}
}
