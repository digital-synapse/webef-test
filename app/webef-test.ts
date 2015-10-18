

import {DBContext, Item, User, Task} from './dbcontext';

// start test
var MAX_ITEMS = 1000;
var entities: Item[] = [];
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

var db = new DBContext();

db.ready.then(()=>{
		
	// empty all tables before starting tests
	db.purge().then(doTests);
		
});

function doTests(){
	
	var debug={};
	
	var starttime = Date.now();
	db.item.put(entities).then(entities=>{
		
		var elapsed = Date.now() - starttime;
		debug['put (cascade insert)'] = {'Entities Returned': entities.length, 'Test Time (ms)': elapsed};
		//console.log(id);

		for (var i=0; i<entities.length; i++){
			entities[i].description = 'Drink coffee';
		}		
		starttime = Date.now();
		db.item.put(entities).then((entities)=>{
			
			var elapsed = Date.now() - starttime;
			debug['put (cascade update)'] = {'Entities Returned':entities.length, 'Test Time (ms)': elapsed};
			//console.log(id);
						
			starttime = Date.now();
			db.item.get().then((result)=>{
				
				var elapsed = Date.now() - starttime;
				debug['get (cascade select)'] = {'Entities Returned':result.length, 'Test Time (ms)':elapsed};	
				//console.log(result);
				
				//console.log(result);
				starttime = Date.now();
				db.item.query((x,q)=>{
					
					q.where(x.task.done.eq(false))
					//console.log(q.explain());
					//console.log(q.toSql())
					return q.exec()
				})
				.then(results=>{
					var elapsed = Date.now() - starttime;
					debug['query (cascade select)'] = {'Entities Returned':results.length, 'Test Time (ms)':elapsed};	
					//console.log(results);
					
					starttime = Date.now();
					db.item.delete().then((results)=>{

						var elapsed = Date.now() - starttime;
						debug['delete (cascade update)'] = {'Entities Returned':NaN, 'Test Time (ms)':elapsed};	
					
						console['table'](debug);

						db.item.get().then(results=>{
							//console.log(results);
						});
					});
				})
				//db.item.query().where(db.item.)
				//db.item.query().then(x=>{
					
				//})
			});
		})
		
	});
	
}