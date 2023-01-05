import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Object = {
    id: number,
    name: string,
    profit: number,
    description: string,
    rate: number,
}

export type TabParamList = {
    Home: { id?: number, screen?: string, receive?: Object },
    Store: undefined,
    Chart: undefined,
    Input: undefined,
}

export type StackParamList = {
    Tabs: TabParamList,
    Detail: { id: number, reFresh: () => Promise<void> },
    AddProduct: { reFresh: () => Promise<void> },
    ChartDay: undefined,
    PickFile: undefined,
}

export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Home'>,
    NativeStackScreenProps<StackParamList>
>;

export type DetailScreenProps = NativeStackScreenProps<StackParamList, 'Detail'>;

export type AddProductScreenProps = NativeStackScreenProps<StackParamList, 'AddProduct'>;

