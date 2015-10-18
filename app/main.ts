
import './data/all';
import {DBContext} from './data/dbcontext';
import * as Entity from './data/interfaces/entities';


var db: DBContext= DBContext.getInstance();
doTests(db);

function doTests(db:DBContext){

	var entities = getItems();	
	var debug={};
	var starttime;
	var elapsed;
	
	/* here we wait for the worker to be ready before starting the
	   tests in order to get accurate start times. Otherwise we would
	   not need to wait for db.ready.
	*/
	db.ready.then(()=>{
		starttime = Date.now();
		return db.item.put(entities);
	})	
	.then(entities=>{		
		elapsed = Date.now() - starttime;
		debug['put (cascade insert)'] = {'Entities Returned': entities.length, 'Test Time (ms)': elapsed};

		for (var i=0; i<entities.length; i++){
			entities[i].description = 'Drink coffee';
		}		
		starttime = Date.now();
		return db.item.put(entities);
	})
	.then((entities)=>{		
		elapsed = Date.now() - starttime;
		debug['put (cascade update)'] = {'Entities Returned':entities.length, 'Test Time (ms)': elapsed};						
		starttime = Date.now();
		return db.item.get();
	})
	.then((result)=>{			
		elapsed = Date.now() - starttime;
		debug['get (cascade select)'] = {'Entities Returned':result.length, 'Test Time (ms)':elapsed};	
		console.log(result[0]);
		starttime = Date.now();
		return db.item.query({'item.done.eq':false});
	})
	.then(results=>{
		elapsed = Date.now() - starttime;
		debug['query (cascade select)'] = {'Entities Returned':results.length, 'Test Time (ms)':elapsed};			
		starttime = Date.now();
		return db.item.delete();
	})
	.then((results)=>{
		elapsed = Date.now() - starttime;
		debug['delete (cascade update)'] = {'Entities Returned':NaN, 'Test Time (ms)':elapsed};	
		console['table'](debug);
		/*
		db.item.get(1).then(results=>{
			console.log(results);
		});
		*/
	});		
}

function getItems() : Entity.Item[] {
	var MAX_ITEMS = 1000;
	var entities: Entity.Item[] = [];
	for (var i=0; i<MAX_ITEMS; i++) entities.push({
		description: 'Get a cup of coffee',
		deadline: new Date(),
		done: false,
		tasks: [{
			description: 'Make coffee',
			done: false
		},{
			description: 'Fill cup',
			done: false		
		},{
			description: 'Drink coffee',
			done: false		
		}],
		user: {
			name: 'Bob'
		}
	});
	return entities;
}
