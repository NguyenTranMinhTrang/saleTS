import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { Detail, AddProduct, ChartDay, PickFile } from '../screens';
import { navigationRef } from '../RootNavigation';
import { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

/* const linking = {
    prefixes: ['sale://'],
    config: {
        initialRouteName: 'Tabs',
        screens: {
            Tabs: {
                screens: {
                    Home: {
                        path: 'home/:id/:name/:profit/:description/:rate',
                    },
                },
            },
        },
    },
    getStateFromPath: (path, options) => {
        console.log('Call');
        const state = getStateFromPath(path, options);
        console.log('Call 2');
        const newState = {
            ...state,
            routes: state.routes.map(route => {
                if (route.name === 'Tabs' && route.state.routes[0].name === 'Home') {
                    const { id, name, profit, description, rate } = route.state.routes[0].params;
                    const receiveData = {
                        id,
                        name,
                        profit,
                        description,
                        rate,
                    };
                    console.log('Route state before: ', route.state.routes[0]);
                    const newRoute = {
                        ...route.state.routes[0],
                        params: { receive: receiveData },
                    };
                    route.state.routes[0] = newRoute;
                    console.log('Route state after: ', route.state.routes[0]);

                    return {
                        ...route,
                    };
                } else {
                    return route;
                }
            }),
        };
        console.log('Call 3');
        return newState;
    },
}; */

const Route = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />

                <Stack.Screen
                    name="Detail"
                    component={Detail}
                />

                <Stack.Screen
                    name="AddProduct"
                    component={AddProduct}
                />

                <Stack.Screen
                    name="ChartDay"
                    component={ChartDay}
                />

                <Stack.Screen
                    name="PickFile"
                    component={PickFile}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Route;
