let register_form = document.getElementById("register_form");
let login_form = document.getElementById("login_form");
register_form.addEventListener("click", () =>{
  document.getElementById("register_form_id").style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  document.getElementById("login_form_id").style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
});
login_form.addEventListener("click", () =>{
  document.getElementById("register_form_id").style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
  document.getElementById("login_form_id").style.transform = ("translate", "translate3d(+" + 0 + "%,0,0)");
});