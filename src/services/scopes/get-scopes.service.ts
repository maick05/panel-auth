import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'scopes';

export class GetScopesService extends AbstractAuthService {
	async searchScopes(
		id = '',
		projectKey = '',
		resourceKey = ''
	): Promise<MessageResponse> {
		const params = `?id=${id}&resourceKey=${resourceKey}&projectKey=${projectKey}`;
		const response = await this.httpService.makeGet(
			`/${ctrl}/search${params}`,
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}

	async getScopeById(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(`/${ctrl}/details/${id}`, {
			Authorization: HttpService.GetBearerTokenAuth('apiToken')
		});

		return this.validateGetResponse(response);
	}
}
