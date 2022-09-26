import { actualUser } from './../atoms/atom';
import { useSetRecoilState } from 'recoil';
import { User } from '../../model/user.model';

export const useSetUser = () => {
	const setUser = useSetRecoilState<User>(actualUser);
	return (user: User) => {
		setUser(user);
	};
};
