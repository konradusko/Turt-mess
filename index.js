firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("log-page").style.display = "none";
      document.getElementById("mess-page").style.display = "flex";
      window.alert("udalo sie zalogowac");
      let user =  firebase.auth().currentUser;
      let name, email, photoUrl;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
}

    } else {
      // No user is signed in.
      document.getElementById("log-page").style.display = "flex";
      document.getElementById("mess-page").style.display = "none";
  
    }
  });
document.getElementById("input_login").addEventListener("click", login)
  function login(){
      let userEmail = document.getElementById("login-mail").value;
      let userPassword = document.getElementById("login_password").value;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

     document.getElementById("span_login").innerHTML = errorMessage;
      });
  }
  function logOut(){
    firebase.auth().signOut()
  }
  document.getElementById("input_register").addEventListener("click", register);
  function register(){
 let userRegisterEmail = document.getElementById("register_email").value;
 let userRegisterPassOne = document.getElementById("register_password_one").value;
 let userRegisterPasstwo = document.getElementById("register_password_two").value;
 if(userRegisterPassOne === userRegisterPasstwo){
    firebase.auth().createUserWithEmailAndPassword(userRegisterEmail, userRegisterPassOne).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
           document.getElementById("span_register").innerHTML = errorMessage;
      });
 }else{
    document.getElementById("span_register").innerHTML = "Hasła nie są takie same."
 }
    
  }