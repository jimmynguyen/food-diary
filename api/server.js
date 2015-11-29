var express        = require("express"),
    mysql          = require('mysql'),
    cors           = require('cors'),
    body_parser    = require('body-parser'),
    md5            = require('md5'),
    app            = express(),
    connectionPool = mysql.createPool({
        connectionLimit : 100, //important
        host     : 'us-cdbr-iron-east-03.cleardb.net',
        user     : 'b64ce794da8e13',
        password : '7412bd36',
        database : 'heroku_017696c102bfc24',
        debug    :  false
    });

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({
  extended: true
}));

// parse application/json
app.use(body_parser.json());

// GET
app.get('/recipes',function(request,response){
    var recipes = require('./routes/recipes');
    recipes.getRecipes(request,response,connectionPool);
});
app.get('/ingredients',function(request,response){
    var ingredients = require('./routes/ingredients');
    ingredients.getIngredients(request,response,connectionPool);
});
app.get('/nutrients',function(request,response){
    var nutrients = require('./routes/nutrients');
    nutrients.getNutrients(request,response,connectionPool);
});
app.get('/recipe_ingredients',function(request,response){
    var recipe_ingredients = require('./routes/recipe_ingredients');
    recipe_ingredients.getRecipeIngredients(request,response,connectionPool);
});
app.get('/recipe_nutrients',function(request,response){
    var recipe_nutrients = require('./routes/recipe_nutrients');
    recipe_nutrients.getRecipeNutrients(request,response,connectionPool);
});
app.get('/recipe_instructions',function(request,response){
    var recipe_instructions = require('./routes/recipe_instructions');
    recipe_instructions.getRecipeInstructions(request,response,connectionPool);
});
app.get('/users/getEmails',function(request,response) {
    var users = require('./routes/users');
    users.getEmails(request,response,connectionPool);
});

// POST
app.post('/users/login',function(request,response){
    var users = require('./routes/users');
    users.login(request,response,connectionPool,md5);
});
app.post('/users/create',function(request,response){
    var users = require('./routes/users');
    users.create(request,response,connectionPool,md5);
});

// port number
app.listen(process.env.PORT || 3000);