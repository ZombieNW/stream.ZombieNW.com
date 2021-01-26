function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var watchId = getParameterByName('watch');
if(!watchId || isNaN(parseFloat(watchId))){
	window.location.replace("../404/");
}
else{
	document.write("Watch ID = " + watchId);
}
var seasonId = getParameterByName('s');
if(!seasonId){
	document.write("Error, Season ID Undefined");
}
else{
	document.write("Season ID = " + seasonId);
}
var episodeId = getParameterByName('e');
if(!episodeId){
	document.write("Error, Episode ID Undefined");
}
else{
	document.write("Episode ID = " + episodeId);
}



function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("../data.json", function(text){
    var data = JSON.parse(text);
            //Detect If Link Is Valid, If Not: 404
            try{
                var type = JSON.stringify(data.movies[parseInt(watchId)].type)
            }
            catch(err) {
                window.location.replace("../404/");
            }
            var type = JSON.stringify(data.movies[parseInt(watchId)].type)
            type = type.replace(/"/g,"");
            var poster = JSON.stringify(data.movies[parseInt(watchId)].poster)
            poster = poster.replace(/"/g,"");
            var title = JSON.stringify(data.movies[parseInt(watchId)].title)
            document.title = `Watching ${title} on StreamNW`;
            if(type == "Movie"){
                var video = JSON.stringify(data.movies[parseInt(watchId)].source)
                video = video.replace(/"/g,"");
        
                document.getElementById('div_video').innerHTML = '<video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls controlsList="nodownload" oncontextmenu="return false;" preload="auto" style="width: 100%; height: 100%" data-setup="{}"><source src="'+ video +'" type="video/mp4"></video>';

            }
            if(type == "Show"){
                //Detect If Link Is Valid, If Not: 404
                try{
                    var video = data.movies[parseInt(watchId)].episodes.find(item=>item.ep==episodeId && item.s==seasonId).source;
                }
                catch(err) {
                    window.location.replace("../404/");
                }
                var video = data.movies[parseInt(watchId)].episodes.find(item=>item.ep==episodeId && item.s==seasonId).source;
                video = video.replace(/"/g,"");
                document.getElementById('div_video').innerHTML = '<video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls controlsList="nodownload" oncontextmenu="return false;" preload="auto" style="width: 100%; height: 100%" data-setup="{}"><source src="'+ video +'" type="video/mp4"></video>';
            }
            (function() {
                var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = poster;
                document.getElementsByTagName('head')[0].appendChild(link);
            })();
			});