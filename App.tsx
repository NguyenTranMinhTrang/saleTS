import React from 'react';
import Route from './src/navigation/Route';
import { Provider } from 'react-redux';
import store from './src/redux/stores';
import { LogBox, AppState, AppStateStatus } from 'react-native';
import { requestUserPermission, getToken } from './src/utils/pushNotifycation';
import messaging from '@react-native-firebase/messaging';
import { sendNotificationLocal } from './src/utils/pushNotificationLocal';
import BackgroundTimer from 'react-native-background-timer';
import RNRestart from 'react-native-restart';
import codePush from 'react-native-code-push';

LogBox.ignoreLogs(['Non-serializable']);
LogBox.ignoreLogs(['new NativeEventEmitter']);
const TIME: number = 5;
const options = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: {
    appendReleaseDescription: true,
    descriptionPrefix: ' Description: ',
  },
};

const App = () => {

  const appState = React.useRef<AppStateStatus>(AppState.currentState);
  const timeRef = React.useRef<number>(TIME);
  let id: number;

  React.useEffect(() => {

    const checkPermission = async () => {
      requestUserPermission();
      await getToken();
    };

    checkPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async (remoteMessage) => {
      sendNotificationLocal(remoteMessage);
    });

    return () => {
      foreground();
    };
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/active/) &&
        nextAppState === 'background'
      ) {
        id = BackgroundTimer.setInterval(() => {
          timeRef.current = timeRef.current - 1;
          console.log('Begin countdown: ', timeRef.current);
          if (timeRef.current < 0) {
            BackgroundTimer.clearInterval(id);
            console.log('Start check package');
            codePush.sync({
              installMode: codePush.InstallMode.IMMEDIATE,
            },
              async (status) => {
                switch (status) {
                  case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                    console.log('Dowload package');
                    break;
                  case codePush.SyncStatus.INSTALLING_UPDATE:
                    console.log('Install package');
                    break;
                  case codePush.SyncStatus.UPDATE_INSTALLED:
                    console.log('Update installed ');
                    break;
                  case codePush.SyncStatus.UNKNOWN_ERROR:
                    console.log('error  ');
                    break;
                  default:
                    break;
                }
              }
            );
            console.log('Done');

          }
        }, 1000);
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Return to the foreground');

        if (timeRef.current < 0) {
          RNRestart.Restart();
        }
        else {
          BackgroundTimer.clearInterval(id);
        }
        timeRef.current = TIME;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      BackgroundTimer.clearInterval(id);
    };
  }, []);

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default codePush(options)(App);
