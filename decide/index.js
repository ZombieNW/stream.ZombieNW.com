//Get WatchID URL Query
var watchId = getParameterByName('watch');
if(!watchId || isNaN(parseFloat(watchId))){ //If Invalid, Fricking Die
	window.location.replace("../404/");
}
else{
    readTextFile("../data.json", function(text){
        //Take Data
                //Detect If Link Is Valid, If Not: 404
                var data = JSON.parse(text);
                try{
                    var type = JSON.stringify(data.movies[parseInt(watchId)].type)
                }
                catch(err) {
                    window.location.replace("../404/");
                }
                //Get Info About Item Based On URL Query
                var id = JSON.stringify(data.movies[parseInt(watchId)].id);
                var title = JSON.stringify(data.movies[parseInt(watchId)].title);
                title = title.replace(/"/g,"");
                var desc = JSON.stringify(data.movies[parseInt(watchId)].description);
                desc = desc.replace(/"/g,"");
                var poster = JSON.stringify(data.movies[parseInt(watchId)].poster);
                poster = poster.replace(/"/g,"");
                var thumb = JSON.stringify(data.movies[parseInt(watchId)].thumb);
                thumb = thumb.replace(/"/g,"");
                var type = JSON.stringify(data.movies[parseInt(watchId)].type);
                type = type.replace(/"/g,"");
                
                //Display Information
                document.getElementById('title').innerHTML = title;
                document.getElementById('desc').innerHTML = desc;
                document.getElementById('bg').innerHTML = `<img src="${thumb}"></img>`;
                //If type is show:
                if(type == "Show"){
                    for(var k in data.movies[parseInt(watchId)].episodes){
                        //Make Episode Button For Each Episode
                        var ep = JSON.stringify(data.movies[parseInt(watchId)].episodes[k].ep);
                        ep = ep.replace(/"/g,"");
                        var s = JSON.stringify(data.movies[parseInt(watchId)].episodes[k].s);
                        s = s.replace(/"/g,"");
                        var title = JSON.stringify(data.movies[parseInt(watchId)].episodes[k].title);
                        title = title.replace(/"/g,"");
                        var desc = JSON.stringify(data.movies[parseInt(watchId)].episodes[k].description);
                        desc = desc.replace(/"/g,"");
                        document.body.innerHTML += `<a class="button" href="../watch/?watch=${id}&e=${ep}&s=${s}">Season: ${s}, Episode: ${ep}, \"${title}\"</a><br><br>`;
                    }
                }
                //If type is movie:
                else{
                    //Make Watch Button
                    document.body.innerHTML += `<a class="button" href="../watch/?watch=${id}">Play</a>`;
                }
    
    
    });
}

//JSON Read Work
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

//URL Query Work
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
