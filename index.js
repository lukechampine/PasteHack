// API KEY: 0b6ec26f1d74dc65399691fcda219676
// USER KEY: e20b48a53479ac2634b7e25ecc9baff8

function processXML(XMLstring) {
    console.log(XMLstring);
    var parser = new DOMParser();
    var XML = parser.parseFromString(XMLstring, "text/xml");
}

function main() {
    XMLHttpRequest({
        method: "POST",
        url: "http://pastebin.com/api/api_post.php",
        data: "api_dev_key=0b6ec26f1d74dc65399691fcda219676&api_option=trends",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: function(response) {
            processXML("<html>" + response.responseText + "</html>"); // avoid parsing errors
        }
    });
}