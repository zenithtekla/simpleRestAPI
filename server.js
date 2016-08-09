var express = require('express'),
	restful = require('node-restful'),
	mongoose = restful.mongoose;
 var app = express(),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override');

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

mongoose.connect('mongodb://localhost:27017/restful');

var ProductSchema = mongoose.Schema({
	name: String,
	sku: String,
	price: Number
});

var Products = restful.model('products', ProductSchema);
Products.methods(['get', 'put', 'post', 'delete']);

Products.register(app, '/api/products');

app.listen(3099);
console.log('Server is running at port 3099');

