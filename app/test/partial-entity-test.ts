import {DBContext, Item, User, Task} from '../data/dbcontext';

export function  partialEntityTest(db: DBContext) : Promise<any> {
	var done, promise = new Promise<any>((resolve,reject)=>{ done = resolve });
	
	
	// start test
	var MAX_ITEMS = 1000;
	
	var full_entity : Item = {
		description: 'full_entity',
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
	};	
	var partial_entity1 : Item = {
		description: 'empty tasks list',
		deadline: new Date(),
		done: false,
		tasks: [],
		user: {
			name: 'Bob'
		}
	};	
	var partial_entity2 : Item = {
		description: 'tasks undefined',
		deadline: new Date(),
		done: false,
		user: {
			name: 'Bob'
		}
	};		
	var partial_entity3 : Item = {
		description: 'user undefined',
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
		}]
	};	
	
	Promise.all([
		db.item.put(full_entity),
		db.item.put(partial_entity1),
		db.item.put(partial_entity2),
		db.item.put(partial_entity3)
	])
	.then(r=>{
		return Promise.all([
			db.item.get(r[0].id),
			db.item.get(r[1].id),
			db.item.get(r[2].id),
			db.item.get(r[3].id)			
		]);				
	})
	.then(r=>{
		console.log('GET:');
		console.log(r);
		console.log('\n');
		return Promise.all([
			db.item.query((c,q)=>{ return q.where(c.item.id.eq(r[0].id)).exec(); }),		
			db.item.query((c,q)=>{ return q.where(c.item.id.eq(r[1].id)).exec(); }),
			db.item.query((c,q)=>{ return q.where(c.item.id.eq(r[2].id)).exec(); }),
			db.item.query((c,q)=>{ return q.where(c.item.id.eq(r[3].id)).exec(); })
		]);
	})
	.then(r=>{
		console.log('QUERY:');
		console.log(r);
		console.log('\n');
		done();
	})
	
	
	return promise;
}