(function(){

	var client = new Dropbox.Client({ key: "wxwn00o3ik1zz7m" }),
		colCount = 3,
		dropbox_dirname = 'inspiration';
	
	var authComplete = function(){
		client.metadata('/' + dropbox_dirname, { 'readDir': 10000 }, function(error, result) {

		  if (error) {
		  	console.log(error);

		  	// bail
		    return false;
		  }

		  readDir(result);
		});
	}

	var readDir = function(metadata){
		var contents = metadata._json.contents, 
			wrapper = document.createElement('div'),
			cols = [],
			i;

		wrapper.className = "columns_wrapper";
		document.body.appendChild(wrapper);

		for(i = 0; i < colCount; i++){
			var colEl = document.createElement('div');

			colEl.className = 'column';
			colEl.style.width = Math.floor(100.0 / colCount) + '%';

			wrapper.appendChild(colEl);

			cols.push(colEl);
		}

		for(i = 0; i < contents.length; i++){
			var item = contents[i],
				col = i % colCount,
				img = document.createElement('img'),
				imgWrapper = document.createElement('div');

			imgWrapper.className = 'colitem_wrapper';

			img.src = 'https://api-content.dropbox.com/1/thumbnails/dropbox' + item.path + '?size=l&access_token=' + client._credentials.token;

			imgWrapper.appendChild(img);
			cols[col].appendChild(imgWrapper);
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