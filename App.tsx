import React from 'react';
import Route from './src/navigation/Route';
import { Provider } from 'react-redux';
import store from './src/redux/stores';
import { requestUserPermission, getToken } from './src/utils/pushNotifycation';
import messaging from '@react-native-firebase/messaging';
import { sendNotificationLocal } from './src/utils/pushNotificationLocal';

const App = () => {

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

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
