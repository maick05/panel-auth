import { useRecoilValue } from 'recoil';
import { actualUser } from '../atoms/atom';
import { useSetRecoilState } from 'recoil';
import { User } from '../../model/user.model';
import { useSetLoading } from './useSetLoading';
import { UpdateUserService } from '../../services/users/update-user.service';
import { toast } from 'react-toastify';

const updateUserService = new UpdateUserService();

const updateUserActiveProp = async (user: User) => {
	return user.active
		? await updateUserService.inactivateUser(user._id)
		: await updateUserService.activateUser(user._id);
};

export const useSetIsUserActive = () => {
	const user = useRecoilValue(actualUser);
	const setUser = useSetRecoilState<User>(actualUser);
	const setLoading = useSetLoading();

	return async (isActive: boolean) => {
		setLoading(true);
		const response = await updateUserActiveProp(user);
		setLoading(false);

		if (!response.success) {
			toast(response.message);
			return;
		}

		setUser({ ...user, active: isActive });

		const labelActive = isActive ? 'activated' : 'inactivated';

		toast(`User ${labelActive} successfully`);
	};
};
