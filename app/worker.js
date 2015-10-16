
// import system.js to allow module loading system in web worker
console.log('worker loading...');
importScripts('jspm_packages/system.js');
importScripts('config.js');
//importScripts('./webef-worker.js');
System.import('./data/worker/webef-worker');
