import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'projects';

export class GetProjectService extends AbstractAuthService {
	async searchProjects(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(
			`/${ctrl}/search?key=${id}`,
			{
				Authorization: HttpService.GetBearerTokenAuth('apiToken')
			}
		);

		return this.validateGetResponse(response);
	}

	async getProjectById(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(`/${ctrl}/details/${id}`, {
			Authorization: HttpService.GetBearerTokenAuth('apiToken')
		});

		return this.validateGetResponse(response);
	}
}
