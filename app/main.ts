

import {DBContext} from './data/dbcontext';
import {speedTest} from './test/speed-test';
import {entityCompositionTest} from './test/entity-composition-test';

(function(){
	
	// empty all tables before starting tests
	var db = new DBContext();
	db.ready.then(()=>{		
		return db.purge();
	
	}).then(()=>{
		return speedTest(db);
	
	}).then(()=>{
		return entityCompositionTest(db);
	});
		
})();	

