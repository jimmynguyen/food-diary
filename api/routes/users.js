module.exports.login = function(request,response,connectionpool,md5) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    connectionpool.getConnection(function(error,connection){
        if (error) {
            connection.release();
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }

        var query  = "select * from users where email = ? and password =?",
            email    = request.body.email,
            password = md5(request.body.password);

        connection.query(query,[email,password],function(error,rows){
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

module.exports.create = function(request,response,connectionpool,md5) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    connectionpool.getConnection(function(error,connection){
        if (error) {
            connection.release();
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }

        var query  = "insert into users (email,password) values (?,?)",
            email    = request.body.email,
            password = md5(request.body.password);

        connection.query(query,[email,password],function(error,rows){
            connection.release();
            if(!error) {
                response.json({ "error" : false });
            } else {
                response.json({ "error" : true });
            }
        });

        connection.on('error', function(error) {      
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;     
        });
    });
}

module.exports.getEmails = function(request,response,connectionpool) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    connectionpool.getConnection(function(error,connection){
        if (error) {
            connection.release();
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }

        var query  = "select email from users";

        connection.query(query,function(error,rows){
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