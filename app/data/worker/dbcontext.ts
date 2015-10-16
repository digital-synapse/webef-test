// WARNING: This file was generated by webef-cli

///<reference path="../../../jspm_packages/github/opsuite/webef@master/dist/ef.d.ts" />
import "opsuite/webef";
WebEF.DBSchema.create('db',1, {"item":{"id":"pkey","description":"string, null","deadline":"date","done":"boolean","userId":"fkey: user.id","user":"nav->user: item.userId","tasks":"nav->task: task.itemId","_ix":"dbtimestamp, index","_rm":"isdeleted, index"},"task":{"id":"pkey","itemId":"fkey:item.id","description":"string","done":"boolean","_ix":"dbtimestamp, index","_rm":"isdeleted, index"},"user":{"id":"pkey","name":"string","_ix":"dbtimestamp, index","_rm":"isdeleted, index"}});

import * as Entity from '../interfaces/entities';

export interface ItemTable extends lf.schema.Table {
	id?: lf.schema.Column;
	description?: lf.schema.Column;
	deadline: lf.schema.Column;
	done: lf.schema.Column;
	userId?: lf.schema.Column;
	_ix?: lf.schema.Column;
	_rm?: lf.schema.Column;
}

export interface ItemContext {
	item?: ItemTable;
	user?: UserTable;
	task?: TaskTable;
}



export interface TaskTable extends lf.schema.Table {
	id?: lf.schema.Column;
	itemId?: lf.schema.Column;
	description: lf.schema.Column;
	done: lf.schema.Column;
	_ix?: lf.schema.Column;
	_rm?: lf.schema.Column;
}

export interface TaskContext {
	task?: TaskTable;
}


export interface UserTable extends lf.schema.Table {
	id?: lf.schema.Column;
	name: lf.schema.Column;
	_ix?: lf.schema.Column;
	_rm?: lf.schema.Column;
}

export interface UserContext {
	user?: UserTable;
}

export interface DBMasterContext {
	item?: ItemTable;
	user?: UserTable;
	task?: TaskTable;
}

export class DBContext extends WebEF.DBContext<DBMasterContext> {
	constructor(){super('db', lf.schema.DataStoreType.INDEXED_DB)}
	public item = this.DBEntity<Entity.Item, ItemContext, ItemTable>('item', ["user","task"]);
	public task = this.DBEntity<Entity.Task, TaskContext, TaskTable>('task', []);
	public user = this.DBEntity<Entity.User, UserContext, UserTable>('user', []);
}

