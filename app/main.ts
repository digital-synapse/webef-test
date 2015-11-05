

import {DBContext} from './data/dbcontext';
import {speedTest} from './test/speed-test';


var db = new DBContext();

db.ready.then(()=>{
		
	// empty all tables before starting tests
	db.purge().then(()=>{
		
		return speedTest(db);
	});
		
});

