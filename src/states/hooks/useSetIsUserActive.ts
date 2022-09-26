import { useRecoilValue } from 'recoil';
import { actualUser } from '../atoms/atom';
import { useSetRecoilState } from 'recoil';
import { User } from '../../model/user.model';

export const useSetIsUserActive = () => {
	const user = useRecoilValue(actualUser);
	const setUser = useSetRecoilState<User>(actualUser);
	return (isActive: boolean) => {
		setUser({ ...user, active: isActive });
	};
};
