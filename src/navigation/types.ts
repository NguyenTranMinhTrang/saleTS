import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

type Object = {
    id: number,
    name: string,
    profit: number,
    description: string,
    rate: number,
}

export type TabParamList = {
    Home: { id?: number, screen?: string, receive?: Object } | undefined,
    Store: undefined,
    Chart: undefined,
    Input: undefined,
}

export type StackParamList = {
    Tabs: NavigatorScreenParams<TabParamList>,
    Detail: { id: number, reFresh: () => Promise<void> },
    AddProduct: { reFresh: () => Promise<void> },
    ChartDay: { state: string, formatDate: string, initialState: { start: Date, end: Date } },
    PickFile: undefined,
}

export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Home'>,
    NativeStackScreenProps<StackParamList>
>;

export type DetailScreenProps = NativeStackScreenProps<StackParamList, 'Detail'>;

export type AddProductScreenProps = NativeStackScreenProps<StackParamList, 'AddProduct'>;

export type ChartDayScreenProps = NativeStackScreenProps<StackParamList, 'ChartDay'>;

export type PickFileScreenProps = NativeStackScreenProps<StackParamList, 'PickFile'>;

export type ChartScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Chart'>,
    NativeStackScreenProps<StackParamList>
>;

export type InputScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Input'>,
    NativeStackScreenProps<StackParamList>
>;
