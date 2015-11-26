var recipes = function(request,response,connectionpool) {
    connectionpool.getConnection(function(error,connection){
        if (error) {
            connection.release();
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }
        
        connection.query("select * from recipes order by id",function(error,rows){
            connection.release();
            if(!error) {
                response.json(rows);
            }           
        });

        connection.on('error', function(error) {      
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;     
        });
    });
}

module.exports = recipes;