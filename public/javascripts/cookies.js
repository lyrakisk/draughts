function getCookie(cname){
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

(function updateCookies(){
	let times = getCookie("times");
	if (times == ""){
		document.cookie = "times=1";
	}
	else{
		let intTimes = parseInt(times);
		intTimes += 1;
		document.cookie = "times=" + intTimes;
    document.getElementById("times").innerHTML= intTimes;
	}
})();