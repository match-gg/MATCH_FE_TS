/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyD9i__VfSTi45f2D285rrd-wHp3_AcO0Fk',
  projectId: 'matchgg-storage',
  messagingSenderId: '978591881674',
  appId: '1:978591881674:web:2bd5789052326c8455d733',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const games = {
  lol: '리그오브레전드',
  overwatch: '오버워치',
  pubg: '배틀그라운드',
  valorant: '발로란트',
};

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = `${payload.data.createdBy}의 방(${
    games[payload.data.game]
  })`;
  const notificationOptions = {
    body: payload.data.content,
    icon: './logo192.png',
    content: payload.data.content,
    timestamp: payload.data.timestamp,
    user_nickname: payload.data.user_nickname,
    roomId: payload.data.roomId,
    createdBy: payload.data.createdBy,
    game: payload.data.game,
    badge: './logo512.png',
  };

  self.addEventListener('notificationclick', (event) => {
    let clickResponsePromise = Promise.resolve();

    event.notification.close();

    clickResponsePromise = clients.openWindow(
      `https://match-gg.kr/${payload.data.game}/${payload.data.roomId}`,
    );

    event.waitUntil(Promise.all([clickResponsePromise]));
  });

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
