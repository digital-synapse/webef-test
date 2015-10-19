
// import system.js to allow module loading system in web worker
console.log('worker loading...');
importScripts('jspm_packages/system.js');
importScripts('config.js');
System.import('./data/worker/webef-worker');

/* couldnt get systemjs to work correctly unless worker.js
   was placed in the app root folder. 
*/