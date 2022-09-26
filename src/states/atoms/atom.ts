import { atom } from 'recoil';
import { User } from '../../model/user.model';

export const isLoading = atom<boolean>({
	key: 'isLoading',
	default: false
});

export const actualUser = atom<User>({
	key: 'user',
	default: new User()
});
