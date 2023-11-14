
const usernameInput=document.getElementById("loginInput");
//const passwordInput=document.getElementById("passwordInput");




function sendLoginInfo() {
  var xmlhttp = new XMLHttpRequest;
  const now = new Date();
  var payload = {
    action: "login",
    key: usernameInput.value,
    loginTick: now.getTime().toString(16),
    docCookie:document.cookie
  };
  xmlhttp.open("POST", "accountPage.html", true);
  xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "localhost");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  //xmlhttp.setRequestHeader("Cookie", document.cookie);
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) { 
      console.log(this.responseText);
      if (this.responseText=="verified")
      {
        console.log("verification successfull")
        window.location.href=('http://172.17.105.116:8080/home');
      }

    }
  };

  payload = JSON.stringify(payload);
  xmlhttp.send(payload);
}


function flashRed(element){

  console.warn("flashing")
  var col = element.style.backgroundColor;
  element.style.backgroundColor = "red";
  setInterval(function(){element.style.backgroundColor=col;}, 100);
}



