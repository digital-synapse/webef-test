
import {DataDomain, Entity} from './data-domain';
import {IEntity} from './interfaces/database';
import * as EntityType from './interfaces/entities';

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
	
	public item: IEntity<EntityType.Item>;
	public user: IEntity<EntityType.User>;
	public task: IEntity<EntityType.Task>;
	
	private init() {
		this.item = new Entity('item');
		this.user = new Entity('user');
		this.task = new Entity('task');
	}
}