var express        = require("express"),
    mysql          = require('mysql'),
    app            = express(),
    connectionPool = mysql.createPool({
        connectionLimit : 100, //important
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'food_diary',
        debug    :  false
    });

// Get all data
app.get('/recipes',function(request,response){
    require('./routes/recipes')(request,response,connectionPool);
});
app.get('/ingredients',function(request,response){
    require('./routes/ingredients')(request,response,connectionPool);
});
app.get('/nutrients',function(request,response){
    require('./routes/nutrients')(request,response,connectionPool);
});
app.get('/recipe_ingredients',function(request,response){
    require('./routes/recipe_ingredients')(request,response,connectionPool);
});
app.get('/recipe_nutrients',function(request,response){
    require('./routes/recipe_nutrients')(request,response,connectionPool);
});
app.get('/recipe_instructions',function(request,response){
    require('./routes/recipe_instructions')(request,response,connectionPool);
});

app.listen(3000);