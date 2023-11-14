function loadvideo(videoId){


    document.body.innerHTML += `    <video width="960" height="540" controls>
    <source id="playerSource" src="assets/${videoId}.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>`
}

function videoId(callback){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    callback(urlParams.get("id"));
}

videoId((id)=>{
    loadvideo(id)
})
