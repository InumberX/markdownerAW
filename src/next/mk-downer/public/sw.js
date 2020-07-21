if (typeof window !== 'undefined') {
 register();
}

function register(config) {
 let flgSwLocalhost = false;

 if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
   /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
 ) {
  flgSwLocalhost = true;
 }

 if ('serviceWorker' in navigator) {
  if ('https://afterworks.jp' !== window.location.origin) {
   return;
  }

  window.addEventListener('load', () => {
   const swUrl = 'https://afterworks.jp/tools/mkd/sw.js';

   if (flgSwLocalhost) {
    checkValidServiceWorker(swUrl, config);

    navigator.serviceWorker.ready.then(() => {
     console.log(
      'This web app is being served cache-first by a service ' +
       'worker. To learn more, visit https://bit.ly/CRA-PWA'
     );
    });
   } else {
    registerValidSW(swUrl, config);
   }
  });
 }
}

function registerValidSW(swUrl, config) {
 navigator.serviceWorker
  .register(swUrl)
  .then((registration) => {
   registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (installingWorker == null) {
     return;
    }
    installingWorker.onstatechange = () => {
     if (installingWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
       console.log(
        'New content is available and will be used when all ' +
         'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
       );

       if (config && config.onUpdate) {
        config.onUpdate(registration);
       }
      } else {
       console.log('Content is cached for offline use.');

       if (config && config.onSuccess) {
        config.onSuccess(registration);
       }
      }
     }
    };
   };
  })
  .catch((error) => {
   console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl, config) {
 fetch(swUrl, {
  headers: { 'Service-Worker': 'script' },
 })
  .then((response) => {
   const contentType = response.headers.get('content-type');
   if (
    response.status === 404 ||
    (contentType != null && contentType.indexOf('javascript') === -1)
   ) {
    navigator.serviceWorker.ready.then((registration) => {
     registration.unregister().then(() => {
      window.location.reload();
     });
    });
   } else {
    registerValidSW(swUrl, config);
   }
  })
  .catch(() => {
   console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
   .then((registration) => {
    registration.unregister();
   })
   .catch((error) => {
    console.error(error.message);
   });
 }
}
