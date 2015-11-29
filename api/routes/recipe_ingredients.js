module.exports.getRecipeIngredients = function(request,response,connectionpool) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    connectionpool.getConnection(function(error,connection){
        if (error) {
            connection.release();
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }
        
        connection.query("select * from recipe_ingredients order by id",function(error,rows){
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