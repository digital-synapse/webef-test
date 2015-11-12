import {DBContext, Item, User, Task} from '../data/dbcontext';

export function entityCompositionTest(db: DBContext) : Promise<any> {
	var done, promise = new Promise<any>((resolve,reject)=>{ done = resolve });


	var full_entity : Item = {
		description: 'full_entity',
		deadline: new Date(),
		done: false,
		tasks: [{
			description: 'Make coffee',
			done: false,
			
			subTasks: [{
				description: 'subtask 1 - make coffee',
				done: false,
			},{
				description: 'subtask 2 - make coffee',
				done: false,
			}]
		},{
			description: 'Fill cup',
			done: false,

			subTasks: [{
				description: 'subtask 1 - fill cup',
				done: false,
			},{
				description: 'subtask 2 - fill cup',
				done: false,
			},{
				description: 'subtask 3 - fill cup',
				done: false,
			}]
					
		},{
			description: 'Drink coffee',
			done: false		
		}],
		user: {
			name: 'Bob'
		}
	};
	
	db.item.put(full_entity)
	.then(r=>{
		return db.item.get(r.id);
	})
	.then(r=>{
		console.log('GET:');
		console.log(r);
		console.log('\n');
		return 	db.item.query((c,q)=>{ return q.where(c.item.id.eq(r.id)).exec(); });
	})
	.then(r=>{
		console.log('QUERY:');
		console.log(r);
		console.log('\n');
		done();
	})
	
		
	return promise;	
}