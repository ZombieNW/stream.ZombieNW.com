// https://drive.google.com/uc?id=1bGI1-kfTppn2YqQntIsnAja0VcJjA5Er Is The Pulled Vid Link

//Main Garbage
readTextFile("data.json", function(text){
    //Data Is data.json
    var data = JSON.parse(text);
    //For Every Object Under Movies
    for(var k in data.movies){
        //Get ID
        var id = JSON.stringify(data.movies[k].id);
        //Get Title
        var title = JSON.stringify(data.movies[k].title);
        title = title.replace(/"/g,"");
        //Get Description
        var desc = JSON.stringify(data.movies[k].description);
        desc = desc.replace(/"/g,"");
        //Get Poster
        var poster = JSON.stringify(data.movies[k].poster);
        poster = poster.replace(/"/g,"");
        //Get Thumbnail
        var thumb = JSON.stringify(data.movies[k].thumb);
        thumb = thumb.replace(/"/g,"");
        //Get Type
        var type = JSON.stringify(data.movies[k].type);
        type = type.replace(/"/g,"");
        //Take Object, And Make An Item Panel With The Poster Image, And Title, And If CLicked Goes To Decide Page With URL Query Of ID
        document.getElementById("myUL").innerHTML += `<li><a href="decide/?watch=${id}"><div class="item"><img src="${poster}" alt="${title}" style="width:100%"><div class="container"><p>${title}</p></div></div></a></li>`;
    }
    
});

//Search Bar Working
function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Dark Mode Working
function toggle_light_mode() {
    var app = document.getElementsByTagName("BODY")[0];
    if (localStorage.lightMode == "dark") {
	localStorage.lightMode = "light";
	app.setAttribute("data-light-mode", "light");
    } else {
	localStorage.lightMode = "dark";
	app.setAttribute("data-light-mode", "dark");
    }		
}

// Read Json Working
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
