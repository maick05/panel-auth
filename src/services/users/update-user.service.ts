import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'users';

export class UpdateUserService extends AbstractAuthService {
	async activateUser(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makePost(
			`/${ctrl}/activate/${id}`,
			{},
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}

	async inactivateUser(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makePost(
			`/${ctrl}/inactivate/${id}`,
			{},
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}

	async updateUser(id: string, name: string): Promise<MessageResponse> {
		const response = await this.httpService.makePut(
			`/${ctrl}/update/${id}`,
			{ name },
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}
}
