// API KEY: 0b6ec26f1d74dc65399691fcda219676
// USER KEY: e20b48a53479ac2634b7e25ecc9baff8

function processXML(XMLstring) {
    var parser = new DOMParser();
    return parser.parseFromString(XMLstring, "text/xml");
}

function readPaste(pasteURL) {
    XMLHttpRequest({
        method: "GET",
        url: pasteURL,
        onload: function(response) {
            console.log(response.responseText);
        }
    });
}

function main() {
    XMLHttpRequest({
        method: "POST",
        url: "http://pastebin.com/api/api_post.php",
        data: "api_dev_key=0b6ec26f1d74dc65399691fcda219676&api_option=trends",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: function(response) {
            var XML = processXML("<html>" + response.responseText + "</html>"); // avoid parsing errors
            var pasteURL = 'http://pastebin.com/raw.php?i=' + XML.getElementsByTagName('paste_key')[0].childNodes[0].nodeValue;
            readPaste(pasteURL);
        }
    });
}