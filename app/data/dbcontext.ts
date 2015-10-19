
import {DataDomain, Entity} from './worker/data-domain';
import * as EntityType from './entities';

export interface map {}
export interface IEntity<T> {
	put(entity: T): Promise<T>;
	put(entities: T[]): Promise<T[]>;
	get(id: number): Promise<T>;
	get(id?: number[]): Promise<T[]>;
	delete(id: number): Promise<T>;
	delete(id?: number[]): Promise<T[]>;
	query(filters: map): Promise<T[]>;
	count(filters: map): Promise<number>;
	select(filters: map): Promise<T[]>;
	search(filters: map): Promise<T[]>;
}

export class DBContext {
	/*** Singleton pattern ***/
	private static _instance:DBContext = new DBContext();	
	constructor() {
		if (DBContext._instance) 
			throw new Error("Error: Instantiation failed: Use .getInstance() instead of new")
		DBContext._instance = this;
		this.init();
	}
	public static getInstance(): DBContext {
		return DBContext._instance;
	}	
	
	public ready: Promise<any>;
	public item: IEntity<EntityType.Item>;
	public user: IEntity<EntityType.User>;
	public task: IEntity<EntityType.Task>;
	
	private init() {
		var db = DataDomain.getInstance();
		this.ready = db.ready;
		 
		this.item = new Entity('item');
		this.user = new Entity('user');
		this.task = new Entity('task');
	}
}