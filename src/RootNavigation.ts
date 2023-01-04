import { createNavigationContainerRef } from '@react-navigation/native';
import { StackParamList } from './navigation/types';


export const navigationRef = createNavigationContainerRef<StackParamList>();

export function navigate(name: any, params: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
