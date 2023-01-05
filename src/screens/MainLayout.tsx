import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Props } from '../models';

type State = NetInfoState | null;

const MainLayout = ({ children }: Props) => {
    const [network, setNetwork] = React.useState<State>();

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setNetwork(state);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={network?.isConnected ? COLORS.lightGray : COLORS.red} />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
});

export default MainLayout;
