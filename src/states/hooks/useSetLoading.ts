import { isLoading } from './../atoms/atom';
import { useSetRecoilState } from 'recoil';

export const useSetLoading = () => {
	const setLoading = useSetRecoilState<boolean>(isLoading);
	return (load: boolean) => {
		setLoading(load);
	};
};
