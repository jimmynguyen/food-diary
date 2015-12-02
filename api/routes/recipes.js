module.exports.getRecipes = function(request,response,connectionpool) {
    connectionpool.getConnection(function(error,connection){
        if (error) {
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }
        
        connection.query("select * from recipes order by id",function(error,rows){
            connection.release();
            if(!error) {
                response.json(rows);
                return;
            }           
        });

        // connection.on('error', function(error) {      
        //     response.json({"code" : 100, "status" : "Error in database connection"});
        //     return;     
        // });
    });
}

module.exports.getRecipesByUserId = function(request,response,connectionpool) {
    connectionpool.getConnection(function(error,connection){
        if (error) {
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }
        
        var query = "select r.* from recipes r join recipe_user ru on r.id = ru.recipe_id where ru.user_id = ? order by r.name",
            user_id = request.params.user_id;

        connection.query(query,[user_id],function(error,rows){
            connection.release();
            if(!error) {
                response.json(rows);
                return;
            }           
        });

        // connection.on('error', function(error) {      
        //     response.json({"code" : 100, "status" : "Error in database connection"});
        //     return;     
        // });
    });
}

module.exports.linkRecipeToUser = function(request,response,connectionpool) {
    connectionpool.getConnection(function(error,connection){
        if (error) {
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }

        var query = "insert into recipe_user (recipe_id,user_id) values (?,?)",
            recipe_id = request.body.recipe_id,
            user_id = request.body.user_id;

        connection.query(query,[recipe_id,user_id],function(error,results){
            connection.release();
            if(!error) {
                response.json({ "error" : false });
            } else {
                response.json({ "error" : true });
            }
            return;
        });

        // connection.on('error', function(error) {
        //     response.json({"code" : 100, "status" : "Error in database connection"});
        //     return;     
        // });
    });
}

module.exports.createRecipe = function(request,response,connectionpool) {
    connectionpool.getConnection(function(error,connection){
        if (error) {
            response.json({"code" : 100, "status" : "Error in database connection"});
            return;
        }
        
        var user_id      = request.body.user,
            recipe       = request.body.recipe,
            ingredients  = request.body.ingredients,
            nutrients    = request.body.nutrients,
            instructions = request.body.instructions;

        try {
            // insert recipe
            connection.query("insert into recipes (name,time,cost,created_by) values (?,?,?,?)",[recipe.name,recipe.time,recipe.cost,user_id],function(error,result) {
                if (error) throw error;
                var recipe_id = result.insertId,
                    i;

                // insert ingredients
                for (i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].id === null) {
                        connection.query("insert into ingredients (name) values (?)",[ingredients[i].name],function(error,result) {
                            if (error) throw error;
                            ingredients[i].id = result.insertId;
                        });
                    }

                    // insert recipe_ingredients
                    connection.query("insert into recipe_ingredients (recipe_id,ingredient_id,quantity,units) values (?,?,?,?)",
                        [recipe_id,ingredients[i].id,ingredients[i].quantity,ingredients[i].units],
                        function(error,result) {
                            if (error) throw error;
                        }
                    );
                }

                // insert nutrients
                for (i = 0; i < nutrients.length; i++) {
                    if (nutrients[i].id === null) {
                        connection.query("insert into nutrients (name) values (?)",[nutrients[i].name],function(error,result) {
                            if (error) throw error;
                            nutrients[i].id = result.insertId;
                        });
                    }

                    // insert recipe_nutrients
                    connection.query("insert into recipe_nutrients (recipe_id,nutrient_id,quantity,units) values (?,?,?,?)",
                        [recipe_id,nutrients[i].id,nutrients[i].quantity,nutrients[i].units],
                        function(error,result) {
                            if (error) throw error;
                        }
                    );
                }

                // insert recipe_instructions
                for (i = 0; i < instructions.length; i++) {
                    connection.query("insert into recipe_instructions (recipe_id,step_number,description) values (?,?,?)",
                        [recipe_id,instructions[i].step_number,instructions[i].description],
                        function(error,result) {
                            if (error) throw error;
                        }
                    );
                }

                // insert recipe_user
                connection.query("insert into recipe_user (recipe_id,user_id) values (?,?)",
                    [recipe_id,user_id],
                    function(error,result) {
                        if (error) throw error;
                    }
                );
            });

            response.json({ "error" : false });
        } catch (error) {
            response.json({ "error" : true });
        } finally {
            connection.release();
            return;
        }

        // connection.on('error', function(error) {      
        //     response.json({"code" : 100, "status" : "Error in database connection"});
        //     return;     
        // });
    });
}