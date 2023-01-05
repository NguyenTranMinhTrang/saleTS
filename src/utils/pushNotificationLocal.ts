import PushNotification, { Importance } from 'react-native-push-notification';
import { navigate } from '../RootNavigation';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { PushNotificationObject } from 'react-native-push-notification';

PushNotification.configure({
    onNotification: function (notification) {
        console.log('Press on a new notification', notification);
        if (notification.userInteraction) {
            if (notification.data && notification.data.type === 'Detail') {
                navigate('Home', { id: Number(notification.data.id), screen: 'Detail' });
            }
        }
    },
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.createChannel(
    {
        channelId: 'channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

type PushNotificationObjectCustom = {
    channelId: PushNotificationObject['channelId'],
    playSound: PushNotificationObject['playSound'],
    soundName: PushNotificationObject['soundName'],
    importance: PushNotificationObject['importance'],
    vibrate: PushNotificationObject['vibrate'],
    vibration: PushNotificationObject['vibration'],
    autoCancel: PushNotificationObject['autoCancel'],
    message: PushNotificationObject['message'],
    title: PushNotificationObject['title'],
    bigPictureUrl: PushNotificationObject['bigPictureUrl'],
    smallIcon: PushNotificationObject['smallIcon'],
    data: any,
}

export const sendNotificationLocal = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    if (remoteMessage.notification && remoteMessage.notification.android) {

        const config: PushNotificationObjectCustom = {
            channelId: 'channel-id',
            playSound: true,
            soundName: 'default',
            importance: 'high',
            vibrate: true,
            vibration: 1000,
            autoCancel: true,
            message: remoteMessage.notification.body as string,
            title: remoteMessage.notification.title,
            bigPictureUrl: remoteMessage.notification.android.imageUrl,
            smallIcon: remoteMessage.notification.android.imageUrl,
            data: remoteMessage.data,
        };

        PushNotification.localNotification(config);
    }
};



