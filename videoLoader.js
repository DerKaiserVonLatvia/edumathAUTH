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
         url="https://drive.google.com/file/d/1Loi3Szql-BmLr6YjuTsTlDOB0VA24y1x/view?usp=drive_link";   
    }else if (vidId=="002"){
         url="https://drive.google.com/file/d/1Loi3Szql-BmLr6YjuTsTlDOB0VA24y1x/view?usp=drive_link";
    } else if(vidId=="003")
    {
         url="https://drive.google.com/file/d/1Loi3Szql-BmLr6YjuTsTlDOB0VA24y1x/view?usp=drive_link";

    }
    callback(url);
}
videoId((id)=>{
    getVideoFromGoogleDocs(id, (url)=>{
        loadvideo(url)
    })
})
