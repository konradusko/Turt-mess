let register_form = document.getElementById("register_form");
let login_form = document.getElementById("login_form");
let register_container =  document.getElementById("register_form_id");
let login_container = document.getElementById("login_form_id");
let number_of_container;
register_form.addEventListener("click", () =>{

  register_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  login_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  document.getElementById("login-container").style.width = 200 + "%";
  register_container.style.display = "block";
  document.getElementById("login_background").classList.add("login-background-register");
  login_container.style.opacity = 0;
  number_of_container=1;
  headerTime()
});
login_form.addEventListener("click", () =>{
  register_container.style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
  login_container.style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
  register_container.style.opacity = 0;
  number_of_container = 0;
  headerTime();

});
function headerTime(){
  if(number_of_container === 1){
    setTimeout(() => {
      register_container.style.opacity = 1;
    }, 1000);
  }else if (number_of_container === 0){
    setTimeout(() => {
      login_container.style.opacity = 1;
      document.getElementById("login-container").style.width = 100 + "%";
      register_container.style.display = "none";
      document.getElementById("login_background").classList.remove("login-background-register");
    }, 1000);
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