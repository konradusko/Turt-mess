
let containerMessPage = document.getElementById("container-mess-page_id");
 
let channel_container = document.getElementById("channel-container_id");
let user_profile_container = document.getElementById("user-profile-container_id");
let messenger = document.getElementById("messenger_id");
let imageUrl = document.getElementById("input-file").value;

let register_number = "undefined";
let photoVal;



// logowanie
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("header").style.display = "none";
      document.getElementById("mess-page").style.display = "block";

// testy nadal 
// dodawania uzytkownika do bazy danych oraz uzupelnianie jego profilu zaraz po rejestracji
let userId = firebase.auth().currentUser.uid;
let user =  firebase.auth().currentUser;
if(register_number === "czx9DJSAD5jncya9D8da934N2"){
console.log("lul");


user.updateProfile({
  displayName: document.getElementById("nickname_id").value,
 // photoURL: document.getElementById("input-file").value,
  uid: userId
}).then(function() {
 console.log("udalo sie zmienic a raczej dodac")
 //aby odrazu po rejestracji pokazywal sie obrazek
 document.getElementById("usNick").innerHTML = user.displayName;
}).catch(function(error) {
  // An error happened.
});
// dodawanie uzytkownika do bazy danych
 firebase.database().ref('users/' + userId).set({
   username: document.getElementById("nickname_id").value,
   email: document.getElementById("register_email").value,
  photoURL : "undefined"
 });
 //dodawanie obrazka
 if(photoVal === 1){
  console.log("zaczyna sie dziac");
  var file = document.getElementById("input-file").files[0];
  var reader = new FileReader();
  reader.onloadend = function (evt) {
    var blob = new Blob([evt.target.result], { type: "image/jpeg" });
  
   
    var storageRef = firebase.storage().ref("Usuarios/" + user.uid + "/avatar.jpg");
    console.warn(file); // Watch Screenshot
   // var uploadTask = storageRef.put(blob);
    storageRef.put(blob).then(function(snapshot){
      snapshot.ref.getDownloadURL().then(function(url){  // Now I can use url
          user.updateProfile({
              photoURL: url       // <- URL from uploaded photo.
          }).then(function(){
            //aby odrazu po rejestracji pokazywal sie obrazek
            document.querySelector('img').src = user.photoURL;
              firebase.database().ref("users/" + userId).update({
                photoURL: url   // <- URL from uploaded photo.
              });
          });
      });
  });
  
  }
  
  reader.onerror = function (e) {
      console.log("Failed file read: " + e.toString());
  };
  reader.readAsArrayBuffer(file);
  
  console.log("zadzialo sie");
  }else{
   
    console.log("jednak nie dzialasz ?");
  }

 let strIng = register_number = "undefined";
 test();
return strIng;
}else{
  //nothing
  
  console.log("nothing");
}
  
function test(){
//testyyy to jest pobieranie wartosci
var starCountRef = firebase.database().ref('users/' + userId);
starCountRef.on('value', function(snapshot) {
  let test = snapshot.val();
  console.log(test);
// 

});
}


// wyswietlanie uzytkownika po zalogowaniu
if (user != null) {
 // user.providerData.forEach(function (profile) {
  //  document.getElementById("usPhoto").innerHTML = profile.photoURL;
    document.querySelector('img').src = user.photoURL;
    document.getElementById("usNick").innerHTML = user.displayName;
  //  console.log("Sign-in provider: " + profile.providerId);
   // console.log("  Provider-specific UID: " + profile.uid);
   // console.log("  Name: " + profile.displayName);
   // console.log("  Email: " + profile.email);
   // console.log("  Photo URL: " + profile.photoURL);
 // });
}

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
    logOutThinks();
    firebase.auth().signOut();
  }
  function logOutThinks(){
    containerMessPage.style.width = 100 + "%";
    messenger.style.width = 0 + "%";
    messenger.style.display = "none";
    messenger.style.opacity = 0;
    //messenger.classList.remove("blur");
    channel_container.style.transform = "initial";
    messenger.style.transform = "initial";
    user_profile_container.style.transform = "initial";
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
      //wielki test


     let strIng = register_number = "czx9DJSAD5jncya9D8da934N2";
    
      console.log("rejestracja");
      return strIng;
    
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





// public channel
let publicChannel = document.getElementById("public_id");
publicChannel.addEventListener("click", () =>{
  containerMessPage.style.width = 200 + "%";
  channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  messenger.style.transform = ("translate", "translate3d(-" + 50 + "%,0,0)");
  user_profile_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  messenger.style.width = 100 + "%";
  messenger.style.display = "flex";
 
  setTimeout(() => {
  messenger.style.opacity = 1;
  }, 1000);

})
//wyswietlenie profilu uzytkownika
let user_button = document.getElementById("user_id");
user_button.addEventListener("click", () =>{
user_profile_container.style.transform = ("translate", "translate3d(-" + 200 + "%,0,0)");
//messenger.classList.add("blur");
console.log("xd");
})
//wyswietlenie kanalow
let channel_button = document.getElementById("channel_id");
channel_button.addEventListener("click", () =>{
  channel_container.style.transform = "initial";
//  messenger.classList.add("blur");
  console.log("xd");
  })
// zamykanie profilu i kanalow
let user_close_button = document.getElementById("test-profil");
user_close_button.addEventListener("click", () =>{
  user_profile_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
 // messenger.classList.remove("blur");
})
let channel_close_button = document.getElementById("test-channel");
channel_close_button.addEventListener("click", () =>{
  channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
 // messenger.classList.remove("blur");
})



//testuje dodawanie kanalu do bazy danych
 //testuje dodawanie uzytkownika
 //create reference

 


 /*
  //updates['/posts/' + writeUserDataKey] = postData;
  adduserData();
 
  
  // dodac do uzytkownika : jego nazwa itd itd
 
if (user != null) {
  user.providerData.forEach(function (user) {
    console.log("  Name: " + user.username);
    console.log("  Email: " + user.email);
    console.log("  Photo URL: " + user.photoURL);
  });
}



function adduserData(){
userRef.on('child_added', snap => console.log(snap.val()));
}
*/
// valid image
function validateFileType(){
  let error_message = document.getElementById("error-file");
  let fileName = document.getElementById("input-file").value;
  let idxDot = fileName.lastIndexOf(".") + 1;
  let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      //TO DO
     error_message.innerHTML = "The picture has a good format.";
    error_message.style.color = "green";
    console.log("xd");
    let test = photoVal = 1;
    return test;
  }else{
      error_message.innerHTML = "The picture has a bad format.";
      error_message.style.color = "crimson";
  }   
}
