// API KEY: 0b6ec26f1d74dc65399691fcda219676
// USER KEY: e20b48a53479ac2634b7e25ecc9baff8

// load the most recent paste into the text area
function loadPaste() {
	document.getElementById('pasteArea').setAttribute('placeholder', 'Loading...');
	XMLHttpRequest({
		method: 'POST',
		url: 'http://pastebin.com/api/api_post.php',
		data: 'api_dev_key=0b6ec26f1d74dc65399691fcda219676' +
		      '&api_user_key=e20b48a53479ac2634b7e25ecc9baff8' +
		      '&api_option=list',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function(response) {
			// parse response and extract paste ID
			var parser = new DOMParser();
			var XML = parser.parseFromString('<html>' + response.responseText + '</html>', 'text/xml');
			var pasteID = XML.getElementsByTagName('paste_key')[0].childNodes[0].nodeValue;
			// fetch paste and insert into textarea
			XMLHttpRequest({
				method: 'GET',
				url: 'http://pastebin.com/raw.php?i=' + pasteID,
				onload: function(response) {
					document.getElementById('pasteArea').value = response.responseText;
					document.getElementById('pasteArea').setAttribute('placeholder', '');
				}
			});
		}
	});
}

// create new paste from contents of textarea
function submitPaste() {
	var pasteText = encodeURIComponent(document.getElementById('pasteArea').value);
	XMLHttpRequest({
		method: 'POST',
		url: 'http://pastebin.com/api/api_post.php',
		data: 'api_dev_key=0b6ec26f1d74dc65399691fcda219676' +
		      '&api_user_key=e20b48a53479ac2634b7e25ecc9baff8' +
		      '&api_option=paste&api_paste_expire_date=1M' +
		      '&api_paste_code=' + pasteText,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function() {
			loadPaste();
		}
	});
}

// replace install message with textarea + submit button
function main() {
	// remove install message
	var centerDiv = document.getElementById('centerDiv');
	centerDiv.textContent = '';
	// create text area
	var textArea = document.createElement('textarea');
	textArea.setAttribute('id', 'pasteArea');
	textArea.setAttribute('cols', '80');
	textArea.setAttribute('rows', '25');
	textArea.setAttribute('placeholder', 'Hit "Load" to fetch the most recent paste');
	centerDiv.appendChild(textArea);
	centerDiv.appendChild(document.createElement('br'));
	// create load button
	var loadButton = document.createElement('button');
	loadButton.setAttribute('onclick', 'loadPaste()');
	loadButton.textContent = 'Load';
	centerDiv.appendChild(loadButton);
	// create submit button
	var submitButton = document.createElement('button');
	submitButton.setAttribute('onclick', 'submitPaste()');
	submitButton.textContent = 'Submit';
	centerDiv.appendChild(submitButton);
}