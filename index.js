firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("log-page").style.display = "none";
      document.getElementById("mess-page").style.display = "flex";
      window.alert("udalo sie zalogowac");
    } else {
      // No user is signed in.
      document.getElementById("log-page").style.display = "flex";
      document.getElementById("mess-page").style.display = "none";
  
    }
  });

  function login(){
      let userEmail = document.getElementById("login-mail").value;
      let userPassword = document.getElementById("login_password").value;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error :" + errorMessage)
      });
  }
  function logOut(){
    firebase.auth().signOut()
  }