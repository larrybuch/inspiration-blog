(function(){

	var client = new Dropbox.Client({ key: "wxwn00o3ik1zz7m" });

	
	var authComplete = function(){
		client.getAccountInfo(function(error, result) {
		  if (error) {
		    return showError(error);  // Something went wrong.
		  }

		  console.log(result);
		});

		client.metadata('/inspiration', { 'readDir': 10000 }, function(error, result) {

		  if (error) {
		  	console.log(error);

		  	// bail
		    return false;
		  }

		  readDir(result);
		});
	}

	var readDir = function(metadata){
		var contents = metadata._json.contents, i;

		for(i = 0; i < contents.length; i++){
			var item = contents[i];
			var img = document.createElement('img');
				img.src = 'https://api-content.dropbox.com/1/thumbnails/dropbox' + item.path + '?size=l&access_token=' + client._credentials.token;

			document.body.appendChild(img);
		}
	}

	client.authenticate(function(error, client) {
		if (error) {
		   	console.log(error.status);

		   	// bail
		   	return false;
		}

		authComplete();
	});

	this.getClient = function(){
		return client;
	}

}).call(window.dropblog = window.dropblog || {});