const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());
// 
mongoose.connect('mongodb://localhost/eat_DB');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
    name: {type: String, minlength: [3, "Your name must be at least 3 characters"]},
    review: {type: String, minlength: [3, "Your review must be at least 5 characters"]},
    stars: {type: Number, min: [1,"must be between 1 to 5"], max: [5, "must be between 1 to 5"], required: [true, "Stars must be between 1 to 5"]}
})

const RestSchema = new mongoose.Schema({
    name: {type: String, minlength: [3, "Restaurant must be at least 3 characters"]},
    cuisine: {type: String, minlength: [3, "Cuisine must be at least 3 characters"]},
    reviews: [ReviewSchema]
},{timestamps: true});


const rest = mongoose.model('Rest', RestSchema);
const review = mongoose.model('Review', ReviewSchema);

// routes

app.get('/rests', function(request, response){
    rest.find({}, function(err, data){
        if(err){
            console.log('get error1');
            console.log(err);
        } else {
            response.json({data: data});
        }
    })
});

app.post('/newRest', function(request, response){
    let newRest = new rest(request.body);
    console.log("This is newRest" + newRest);
    newRest.save(function(err){
        if(err){
            console.log('new error3');
            console.log(err);
            // console.log(err);
            response.json({message: "error", errors: newRest.errors});
        }else{
            response.json({status: 'restaurant created!'});
        }
    }); 
});

app.get('/rest/:id', function(request, response){
    var id = new mongoose.Types.ObjectId(request.params.id);
    console.log(id);
    rest.findById(id, function(err, data){
        if(err){
            console.log('get id error2');
            console.log(err);
        }else{
            console.log(data);
            response.json(data);
        }
    })
});

app.get('/reviews/:id', function (request, response){
    rest.findOne({_id: request.params.id})
    .populate('reviews')
    .exec(function(err, post) {
        response.json({message: "success", rest: rest});
    });
});

// add review
app.post('/rest/:id', function (req, res){
    console.log(req.body);
    var id = new mongoose.Types.ObjectId(req.params.id);
    rest.findById(id, function(err, data){
        var review = req.body;
        data.reviews.push(review);
        console.log(data.reviews);
        data.save(function(err){
            if(err) {
                console.log('error4');
                console.log(err)
                res.json({message: "error", errors: data.errors})
                // res.json({message: "error", errors:rest.errors});
            } else {
                res.json({status: 'ok'});
            }
        });
    });
});

app.put('/rest/:id', function(request, response){
    console.log(request.body);
    rest.update({_id: mongoose.Types.ObjectId(request.params.id)},request.body, { runValidators: true}, function(err, data){
        if(err){
            console.log('error');
            console.log(err);
            response.json({status: 'error', errors: err.errors});
        }else{
            console.log('updated');
            console.log(data);
            response.json({status: 'ok'});
        }
    })
});

app.delete('/rest/:id', function(request, response){
    var id = mongoose.Types.ObjectId(request.params.id);
    rest.remove({_id: id}, function(err){
        if(err){
            console.log(err);
            response.json({status: 'error'});
        } else {
            response.json({status: 'remove ok'});
        }
    });
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// listen
app.listen(8000, function(){
    console.log("Listening on port 8000")
});