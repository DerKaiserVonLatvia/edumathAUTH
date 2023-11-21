function loadvideo(videoId){


    document.body.innerHTML += `<iframe src="${videoId}" width="960" height="540" allow="autoplay"></iframe>
    `
}

function videoId(callback){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    callback(urlParams.get("id"));
}



function getVideoFromGoogleDocs(vidId, callback){

    var url;
    if (vidId=="001")
    {
         url="https://1drv.ms/v/s!AhiuDj8VzD-wgexLrKZDWHL3NC7GTQ?e=EEhUMz";   
    }else if (vidId=="002"){
         url="https://1drv.ms/v/s!AhiuDj8VzD-wgexKNHsxLyiIIcwaIQ?e=rpzT5P";
    } else if(vidId=="003")
    {
         url="https://1drv.ms/v/s!AhiuDj8VzD-wgexJUYhbvFgq_ukqaw?e=ubUmlf";
    }
    callback(url);
}


videoId((id)=>{
    getVideoFromGoogleDocs(id, (url)=>{
        loadvideo(url)
    })
})
