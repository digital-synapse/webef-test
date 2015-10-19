import {DBContext} from './dbcontext';
import * as Entity from '../entities';
import {is} from '../util/is';
import {JSON2} from '../util/json2';
import * as WebEFEvent from './webef-event';
import {filter} from './filter';

// hack: fix typescript def
declare function postMessage(message: any): void;

const ENVIRONMENT_IS_WORKER = (typeof importScripts === 'function') && (window.document === undefined);

if (!ENVIRONMENT_IS_WORKER)
    throw new Error('Error: webef-worker must be loaded in a web worker!');
    
const WebEFSearchPageSize = 25;
var db: DBContext =new DBContext();	 
db.ready.then(()=> {   
    postMessage(WebEFEvent.READY);    
});

self.onmessage = function(e) {
    
    //console.log('message received!');
    
    var args = JSON2.parse(e['data']);    
	db.ready.then(()=> {       
        
        var entity: WebEF.DBEntity<any,any,any> = db[args.entity] ;
        switch (args.cmd) {	
            
            case WebEFEvent.EntityOp.GET:
                entity.get(args.id).then(response);
                break;
                
            case WebEFEvent.EntityOp.PUT:
                entity.put(args.data).then(response);
                break;
                
            case WebEFEvent.EntityOp.DELETE:
                entity.delete(args.id).then(response);
                break;
            
            case WebEFEvent.EntityOp.COUNT:
                entity.count((c,q)=>{
                    q = filter(q, c, args.filters);
                    return q.exec();
                }).then(response);
                break;
                
            case WebEFEvent.EntityOp.QUERY:
                entity.query((c,q)=>{
                    q = filter(q, c, args.filters);
                    return q.exec();
                }).then(response);
                break;                

            case WebEFEvent.EntityOp.SELECT:
                entity.select((c,q)=>{
                    q = filter(q, c, args.filters);
                    return q.exec();
                }).then(response);
                break; 
                                
            case WebEFEvent.EntityOp.SEARCH:
                entity.query((c,q)=>{
                    q = filter(q, c, args.filters);
                    return q.skip(WebEFSearchPageSize * args.page).limit(WebEFSearchPageSize).exec();
                }).then(response);
                break;
        }		
	});
	
	function response(data:any){
		var r= { 
			response: data,
            originId: args.originId
		}
		postMessage(r);
	}
}

