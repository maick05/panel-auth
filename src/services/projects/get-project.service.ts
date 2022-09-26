import { MessageResponse } from '../../model/message-response.model';
import { AbstractAuthService } from '../abstract.service';
import { HttpService } from '../http.service';

const ctrl = 'projects';

export class GetProjectService extends AbstractAuthService {
	async searchProjects(): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(`/${ctrl}/search`, {
			Authorization: HttpService.GetBearerTokenAuth('apiToken')
		});

		return this.validateGetResponse(response);
	}

	async getProjectById(id: string): Promise<MessageResponse> {
		const response = await this.httpService.makeGet(`/${ctrl}/details/${id}`, {
			Authorization: HttpService.GetBearerTokenAuth('apiToken')
		});

		return this.validateGetResponse(response);
	}
}
