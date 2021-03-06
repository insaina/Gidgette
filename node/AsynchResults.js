module.exports = AsyncResults;

/*
Asynchronously use a function to process an array of work returning the results once completed.
[] AsyncResults(function process(AsyncResults,workElement,callback),[],callback(error,results));
Example:
	AsyncResults(
		paths,
		function(path,cb){
			fs.exists(path,function(exist){
				cb(null,exist);
			});
		},
		function(err,results){
			for(var i=0;i<results.length;i++){
				if(results[i].exists){console.log(results[i].path+" exists");}
				else{console.log(results[i].path+" does not exist");}
			}
		}));
*/

function AsyncResults(work,worker,cb){
        (function(){
		var index = 0;
                var results = [];
                var current = null;
        
                var finishWork = function(err, result){
                        if(err){cb(err,results);return;}
                        results.push({work: current, result: result});
			index++;
                        next();
                }
        
                var next = function(){
                        if(index < work.length && worker != null){
                                current = work[index];
                                worker(current,finishWork);
                        }else{
                                cb(null,results);
                        }
                }
                next();
        })(work,worker,cb);
}
