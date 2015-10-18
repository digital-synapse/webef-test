import * as WebEFEvent from './worker/webef-event';
import {JSON2} from './util/json2';

export class DataDomain {
	/*** Singleton pattern ***/
	private static _instance:DataDomain = new DataDomain();	
	constructor() {
		if (DataDomain._instance) 
			throw new Error("Error: Instantiation failed: Use .getInstance() instead of new")
		DataDomain._instance = this;
		this.init();
	}
	public static getInstance(): DataDomain {
		return DataDomain._instance;
	}
	
	/* Init web worker */
	private worker:Worker;
	private callCounter:number;
	private readyState:boolean;
	public ready: Promise<any>;
	private readyResolve;
	private init(){
		this.ready = new Promise((resolve,reject)=>{
			this.readyResolve = resolve;
		});
		this.readyState = false;
		this.worker = new Worker('worker.js');
		this.callCounter = 0;
		this.worker.onmessage =(e) => {	
			
			if (e.data === WebEFEvent.READY){
				this.readyState = true;
				this.readyResolve();
								
				// fire messages from queue
				for (var i=0; i<this.messageQueue.length; i++){
					this.messageQueue[i][0](this.messageQueue[i][1])
				}	
				this.messageQueue=null;
			}
								
			var event = <WebEFEvent.Response>e.data;
			var promise = this.promiseQueue[event.originId];
			if (promise) {
				promise.resolve(event.response);
				delete this.promiseQueue[event.originId];
			}			
		}		
	}
	private newID(){		
		this.callCounter++;
		if (this.callCounter>9007199254740990) 
			this.callCounter=0;
		return this.callCounter;
	}
	private promiseQueue = {};
	private messageQueue = [];
	
	public call(entityOpCmd: string, entity:string, args: any) : Promise<any> {
		
		return new Promise<any>((resolve,reject)=>{
				
			var request = {
				entity: entity,
				originId: this.newID(),
				cmd: entityOpCmd,
				data: args
			};	
						
			// store for use later when we receive a response from the worker
			this.promiseQueue[request.originId]={
				resolve: resolve,
				reject: reject
			};	
			
			
			// if the worker is not yet ready queue up the message
			if (!this.readyState){
				this.messageQueue.push([
					(request)=>{this.worker.postMessage(JSON2.stringify(request));},
					request
				]);
			}
			// send request to worker
			else
				this.worker.postMessage(JSON2.stringify(request));
			
		});		
	}
}

export class Entity {
	
	private db: DataDomain;
	constructor(private entityName:string) {
		this.db = DataDomain.getInstance();
	}
	
	public put(entity) {
		return this.db.call('put',this.entityName, entity);
	};

	public get(id) {
		return this.db.call('get',this.entityName, {id: id});
	}
	
	public delete(id){
		return this.db.call('delete', this.entityName, {id: id});
	}
	
	public query(filters) {
		return this.db.call('query', this.entityName, {filters: filters});
	}

	public count(filters) {
		return this.db.call('count', this.entityName, {filters: filters});
	}

	public select(filters) {
		return this.db.call('select', this.entityName, {filters: filters});
	}
	
	public search(filters) {
		return this.db.call('filters', this.entityName, {filters: filters});
	}
}