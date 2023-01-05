import messaging from '@react-native-firebase/messaging';
import { addNotification, updateNotification, getNotificationById } from '../firebase/crud';
import { getItem, setItem } from '../localStorage';
import { intervalToDuration } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';

const FIREBASE_API_KEY = 'AAAAv0YTFEo:APA91bFaSDWQKIOITcMfCVFqitpDIKKNM3QbjaCe_KdqkfxudEYYmDq_FnMQw3VHMUn561JhRZDrgaNGbByBVDzb58xZtFeRtIDGmpLgzpAvlTpStrS923nqzKK2pxunhzdesC-ZXzm-';
let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + FIREBASE_API_KEY,
});

type Token = {
    id: string,
    token: string,
} | undefined;

type Response = {
    code: number,
    message?: string,
    error?: any,
    data?: DocumentData
}

let token: Token;

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

export const getToken = async () => {
    token = await getItem('fcmtoken') as Token;
    if (!token) {
        try {
            let fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                let id = (Date.now()).toString();
                token = {
                    id: id,
                    token: fcmtoken,
                };
                const result: Response = await addNotification(fcmtoken, id) as Response;
                if (result.code === 1) {
                    await setItem('fcmtoken', {
                        id: id,
                        token: fcmtoken,
                    });
                }
            }
        } catch (error) {
            console.log('Error in fcmtoken', error);
        }
    }
    else {
        const tokenFromDatabase: Response = await getNotificationById(token.id) as Response;
        if (tokenFromDatabase.code === 1 && tokenFromDatabase.data) {
            let date = (tokenFromDatabase.data.date).toDate();
            const distance = intervalToDuration({
                start: date,
                end: new Date(),
            });

            if (distance && distance.months) {
                if (distance.months >= 2) {
                    let newToken: string = await messaging().getToken() as string;
                    const result: Response = await updateNotification(token.id, {
                        token: newToken,
                        date: Timestamp.fromDate(new Date()),
                    }) as Response;
                    if (result.code === 1) {
                        await setItem('fcmtoken', {
                            id: token.id,
                            token: newToken,
                        });
                    }
                    else {
                        console.log(result.error);
                    }
                }
                else {
                    const result: Response = await updateNotification(token.id, {
                        date: Timestamp.fromDate(new Date()),
                    }) as Response;
                    if (result.code === 1) {
                        console.log(result.message);
                    }
                    else {
                        console.log(result.error);
                    }
                }
            }

        }
        else {
            console.log('Get error: ', tokenFromDatabase.error);
        }
    }

    console.log('Done token: ', token);
};

export const sendNotification = async (title: string, body: string, data: any) => {
    if (token) {
        const message = {
            registration_ids: [
                token.token,
            ],
            notification: {
                title: title,
                body: body,
                vibrate: 1,
                sound: 1,
                show_in_foreground: true,
                priority: 'high',
                content_available: true,
            },
            data: data,
        };

        let response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers,
            body: JSON.stringify(message),
        });
        response = await response.json();

        console.log('Send success: ', response);
    }
};






