var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twit = require('twit');
var config = require('./config');
var myBot = new twit(config);
/*
app.get('/', function(req, res){
 // res.sendFile('index.html');
 res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(process.env.PORT||5000, function(){
  console.log('listening on *:3000');
});
*/


var searchFilter = function() {
    var params = {
        q: 'paypal+hack',  
        result_type: 'recent',
        lang: 'en'
    }



    var searchDarkTechie = {
        q: 'from:@darktechie',  
        result_type: 'recent',
        lang: 'en'
    }




myBot.get('search/tweets',params,function(err,data){

if(!err){
	console.log(data.statuses.length);

 for(i=0;i<data.statuses.length;i++)
	{
	 var tweet = data.statuses[i];
	// console.log(data.statuses[0]);
	// console.log(tweet.id_str+"::"+tweet.text +"::"+tweet.user.screen_name+"("+tweet.user.url+")"+"::"+tweet.created_at+"::"+tweet.user.time_zone);
	
	if(tweet.favorited!="false")
		{
	//	console.log('in if');
	     myBot.post('favorites/create', {id: tweet.id_str}, function(error, response){
        // if there was an error while 'favorite'
        if(error){
        //  console.log('CANNOT BE FAVORITE... Error'+error);
        }
        else{
     //     console.log('FAVORITED... Success!!!');
        }
	
	});
		}
	}
}
else{
 console.log('Error');
}

});



myBot.get('search/tweets',searchDarkTechie,function(darktechieErr,darktechieData){

if(!darktechieErr){
	console.log(darktechieData.statuses.length);

 for(i=0;i<darktechieData.statuses.length;i++)
	{
	 var darkTweet = darktechieData.statuses[i];
	// console.log(data.statuses[0]);
	// console.log(darkTweet.text);
	
	if(darkTweet.favorited!="false")
		{
		//console.log('in if');
	     myBot.post('favorites/create', {id: darkTweet.id_str}, function(error, response){
        // if there was an error while 'favorite'
        if(error){
        // console.log('CANNOT BE FAVORITE... Error'+error);
        }
        else{
    //      console.log('FAVORITED... Success!!!');
        }
	
	});
	

 /* myBot.post('statuses/update', {in_reply_to_status_id: darkTweet.id_str,status:'@darktechie is watching this tweet @darktechie'}, function(error, response){
        // if there was an error while 'favorite'
        if(error){
       console.log('CANNOT BE replied... Error'+error);
        }
        else{
        //  console.log('replied... Success!!!');
        }
	
	});*/


		}
	}
}
else{
 console.log('Error');
}

});






}

var postFilter = function() {
    var params = {
        status: 'S Sample Twitt for @darktechie'
    }

myBot.post('statuses/update',params,function(err,data){

if(!err){
	console.log('posted');
 }
else{
 console.log(err);
}

});
}
//postFilter();
searchFilter();
setInterval(searchFilter, 30000);