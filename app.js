let register_form = document.getElementById("register_form");
let login_form = document.getElementById("login_form");
register_form.addEventListener("click", () =>{
  document.getElementById("register_form_id").style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  document.getElementById("login_form_id").style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  document.getElementById("header").classList.add("header-register");
  document.getElementById("header").classList.remove("header-login");
});
login_form.addEventListener("click", () =>{
  document.getElementById("register_form_id").style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
  document.getElementById("login_form_id").style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
  document.getElementById("header").classList.remove("header-register");
  document.getElementById("header").classList.add("header-login");
});
// valid image
function validateFileType(){
  var fileName = document.getElementById("input-file").value;
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      //TO DO
  }else{
      document.getElementById("error-file").innerHTML = "The picture has a bad format."
  }   
}



/*
// TEST
let test1 = document.getElementById("teest");
// to wyzej to tekst
let test2Button = document.getElementById("but");



test2Button.addEventListener("click", () =>{

 let messText = test1.value;

  var database = firebase.database().ref().child("Messenger").push();
  database.child("Messenger").set(messText);
  database.on('child_added', snap =>{
    
  
  let name = snap.child("Messenger").val();
  document.getElementById("list").append(name + " " +"<br>");
  });

  
  

  window.alert("working");
})
*/