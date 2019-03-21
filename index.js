
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("header").style.display = "none";
      document.getElementById("mess-page").style.display = "flex";
      window.alert("udalo sie zalogowac");


      let user =  firebase.auth().currentUser;
      let name, email, photoUrl;
// dodac do uzytkownika : jego nazwa itd itd
if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
}
//
    } else {
      // No user is signed in.
      document.getElementById("header").style.display = "flex";
      document.getElementById("mess-page").style.display = "none";
  
    }
  });
  //login eventlistener
document.getElementById("input_login").addEventListener("click", login)
  function login(){
      let userEmail = document.getElementById("login-mail").value;
      let userPassword = document.getElementById("login_password").value;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

     document.getElementById("login-error").innerHTML = errorMessage;
      });
  }
  function logOut(){
    firebase.auth().signOut()
  }
  
  //register listenerevent
  document.getElementById("input_register").addEventListener("click", register);
  function register(){
 let userRegisterEmail = document.getElementById("register_email").value;
 let userRegisterPassOne = document.getElementById("register_password_one").value;
 let userRegisterPasstwo = document.getElementById("register_password_two").value;
 let userRegisterNickName = document.getElementById("nickname_id").value;
 if(userRegisterPassOne === userRegisterPasstwo && userRegisterNickName.length >= 4){
    firebase.auth().createUserWithEmailAndPassword(userRegisterEmail, userRegisterPassOne).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
           document.getElementById("register-error").innerHTML = errorMessage;
        
      });
      writeUserData();
      console.log("to dziala");
    
 }else if(userRegisterEmail.length === 0){
  document.getElementById("register-error").innerHTML = "Please write your email.";
 }else if(userRegisterPassOne.length === 0){
  document.getElementById("register-error").innerHTML = "Please write your password.";
 }else if(userRegisterPassOne != userRegisterPasstwo){
    document.getElementById("register-error").innerHTML = "Passwords are not the same.";
   }else if(userRegisterNickName.length <= 4){
    document.getElementById("register-error").innerHTML = "Your Nickname must contain at least 4 characters.";
   }
 }
// adding new chanel
let buttonNewChannel = document.getElementById("new-channel");
buttonNewChannel.addEventListener("click", () =>{
  document.getElementById("adding-channel-form").style.display = "flex";
  document.getElementById("channel-container_id").classList.add("blur");
  document.getElementById("user-profile-container_id").classList.add("blur");
  setTimeout(() => {
    document.getElementById("adding-channel-form").style.opacity = 1;
  }, 1000);
})

let createChannel = document.getElementById("button-New-channel");
//create channel
createChannel.addEventListener("click", () =>{
  let channelName = document.getElementById("channel_name_id").value;
  let channelPassword = document.getElementById("channel_password_id").value;
  if(channelName.length >= 6 && channelPassword.length >= 6){
    console.log("xd")
    writeNewPost();
  }else{
    document.getElementById("newChannel-error").innerHTML = "The password and name must contain 6 characters."
console.log(channelName.length + channelPassword.length)
  }
})
let buttonCancelNewChannel = document.getElementById("button-cancel_id");
buttonCancelNewChannel.addEventListener("click", cancleChannel)
function cancleChannel(){
  document.getElementById("adding-channel-form").style.opacity = 0;
  document.getElementById("channel-container_id").classList.remove("blur");
  document.getElementById("user-profile-container_id").classList.remove("blur");
  setTimeout(() => {
    document.getElementById("adding-channel-form").style.display = "none";
  }, 1000);
 // pamietac o czyszczeniu inputów po anulacji
  
}

//testuje dodawanie kanalu do bazy danych
function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
 
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture,
    chanelName: document.getElementById("channel_name_id").value,
    chanelpassword : document.getElementById("channel_password_id").value
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('Kanały').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Kanały/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

///// tworzenie uzytkownika
function writeUserData(userIdNumber, userRegisterNickName, userRegisterEmail, imageUrl) {
  
  userIdNumber = "user" + " "  + test;

  firebase.database().ref('users/' + userIdNumber).set({
    username:document.getElementById("nickname_id").value,
    email: document.getElementById("register_email").value,
    id:test
    //profile_picture : imageUrl
  });

}