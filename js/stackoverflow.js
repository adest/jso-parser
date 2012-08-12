jQuery.ajax({
	type: 'GET',
	url: 'https://api.stackexchange.com/2.0/me/questions',
	dataType: 'json',
	data: {
		site: 'stackoverflow',
		access_token: 'dkS64IIEpGJ2F6Gp3QAUbw))'
	},
	success: function(data, textStatus, jqXHR){
	alert(JSON.stringify(data));
	}
})