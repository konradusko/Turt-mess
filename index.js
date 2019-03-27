
let containerMessPage = document.getElementById("container-mess-page_id");
 
let channel_container = document.getElementById("channel-container_id");
let user_profile_container = document.getElementById("user-profile-container_id");
let messenger = document.getElementById("messenger_id");
let imageUrl = document.getElementById("input-file").value;

let register_number = "undefined";
let photoVal;
let publicChannelNumber = 1;


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
 
 document.getElementById("userNick").innerHTML = user.displayName;
 document.getElementById("user-email").innerHTML = user.email;
}).catch(function(error) {
  // An error happened.
});
// dodawanie uzytkownika do bazy danych
 firebase.database().ref('users/' + userId).set({
   username: document.getElementById("nickname_id").value,
   email: document.getElementById("register_email").value,
  photoURL : "undefined",
  Number_of_messages_sent:0
 });
 //dodawanie obrazka
 if(photoVal === 1){
  console.log("zaczyna sie dziac");
  var file = document.getElementById("input-file").files[0];
  var reader = new FileReader();
  reader.onloadend = function (evt) {
    var blob = new Blob([evt.target.result], { type: "image/jpeg" });
  
   
    var storageRef = firebase.storage().ref("Usuarios/" + user.uid + "/avatar.jpg");
    console.warn(file); 
    // Watch Screenshot
   // var uploadTask = storageRef.put(blob);
    storageRef.put(blob).then(function(snapshot){
      snapshot.ref.getDownloadURL().then(function(url){
          // Now I can use url
          let test = url;
          document.getElementById("user-photo").src = test;
          user.updateProfile({
              photoURL: url       // <- URL from uploaded photo.
          }).then(function(){
            //aby odrazu po rejestracji pokazywal sie obrazek
              document.getElementById("channel-user-profile").src = url;
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
    let userNophoto = "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/no-avatar.jpg?alt=media&token=d8878bd7-c518-48fb-9f82-52b299fa4b3a";
    user.updateProfile({
      photoURL: userNophoto      // <- URL from uploaded photo.
  }).then(function(){
    //aby odrazu po rejestracji pokazywal sie obrazek
    document.getElementById("user-photo").src = userNophoto;
      document.getElementById("channel-user-profile").src = userNophoto;
      firebase.database().ref("users/" + userId).update({
        photoURL: userNophoto   // <- URL from uploaded photo.
      });
    console.log("jednak nie dzialasz ?");
});
  }

 let strIng = register_number = "undefined";

return strIng;
}else{
  //nothing
  
  console.log("nothing");
}
test();
function test(){
//testyyy to jest pobieranie wartosci
var starCountRef = firebase.database().ref('users');
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
  document.getElementById("channel-user-profile").src = user.photoURL;
  document.getElementById("user-photo").src = user.photoURL;
    document.getElementById("userNick").innerHTML = user.displayName;
    document.getElementById("user-email").innerHTML = user.email;
  //  console.log("Sign-in provider: " + profile.providerId);
   // console.log("  Provider-specific UID: " + profile.uid);
   // console.log("  Name: " + profile.displayName);
   // console.log("  Email: " + profile.email);
   // console.log("  Photo URL: " + profile.photoURL);
 // });
}


// wysylanie public na wysylanie wiadomosci

let send_message = document.getElementById("send-message");
send_message.addEventListener("click", () =>{
  let text_area = document.getElementById("messenger_text_area").value;
  var database = firebase.database().ref().child("PublicChannel").push({
    Message : text_area,
    Nickname : user.displayName,
    Photo : user.photoURL,
    email : user.email
  });

  
})
// wyswietlanie wiadomosci kanalu glownego
  var messageRef = firebase.database().ref('PublicChannel/');
  messageRef.on('child_added', function(snapshot) {
    let message_value = snapshot.child("Message").val();
    let nickName_value = snapshot.child("Nickname").val();
    let photo_value = snapshot.child("Photo").val();
    console.log(message_value);
  // 
  let createLi = document.createElement("li");
  let createSpan = document.createElement("span");
  let createDiv = document.createElement("div");
  let createImg = document.createElement("img");
  let createP = document.createElement("p");
  createP.append(message_value);
  createDiv.className = "li_div";
  createDiv.append(createImg, createP);
  createSpan.append(nickName_value);
  createImg.src = photo_value;
  createLi.append(createSpan,createDiv);
  document.getElementById("list").append(createLi);
  });
  
// tworzenie kanalu
let channelphotoVal;
let create_channel = document.getElementById("button-New-channel");
create_channel.addEventListener("click", () =>{
  let channel_name = document.getElementById("channel_name_id").value;
  let channel_password = document.getElementById("channel_password_id").value;
  let error_message = document.getElementById("newChannel-error");
  let randomString = Math.random().toString(36).substring(5);
  //valid photo
 
  if(channel_name.length > 1 && channel_password.length > 1){
  // dodawanie kanalu do bazy danych
  firebase.database().ref("Channels/" + randomString).set({
    ChannelName: channel_name,
   ChannelPassword: channel_password,
   Channel_Id : randomString
     
  });

   if(channelphotoVal === 1){
    let file = document.getElementById("channel-photo").files[0];
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      var blob = new Blob([evt.target.result], { type: "image/jpeg" });
      var storageRef = firebase.storage().ref("Channels/" + randomString + "/Channel_photo.jpg");
      storageRef.put(blob).then(function(snapshot){
        snapshot.ref.getDownloadURL().then(function(url){
          firebase.database().ref("Channels/" + randomString).update({
            ChannelPhoto: url   // <- URL from uploaded photo.
          });
        });
    });
    }
    reader.onerror = function (e) {
        console.log("Failed file read: " + e.toString());
    };
    reader.readAsArrayBuffer(file);
   }else{
    firebase.database().ref("Channels/" + randomString).update({
      ChannelPhoto: "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/No-Photo-Available.jpg?alt=media&token=e7d6e25d-eb5b-4262-8287-c6b976791840"  // <- URL from uploaded photo.
    });
   }
    

  error_message.style.color = "green";
  error_message.innerHTML = "The channel was created."


  setTimeout(() => {
    document.getElementById("create-channel-form").style.opacity = 0;
      document.getElementById("create-channel-form").style.display = "none";
  }, 2000);

  }else{
    error_message.style.color = "crimson";
    error_message.innerHTML = "Please complete the fields."
  }
 
   
  //end valid photo

})


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
  
    messenger.style.opacity = 0;
    setTimeout(() => {
      messenger.style.display = "none";
      containerMessPage.style.width = 200 + "%";
      channel_container.style.transform = "initial";
      messenger.style.transform = "initial";
      user_profile_container.style.transform = "initial";
      messenger.style.width = 0 + "%";
    }, 1000);
  
    //messenger.classList.remove("blur");
  
    publicChannelNumber = 1;
    return publicChannelNumber;
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
  containerMessPage.style.width = 300 + "%";
  channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  messenger.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  user_profile_container.style.transform = ("translate", "translate3d(+" + 100 + "%,0,0)");
  messenger.style.width = 100 + "%";
  messenger.style.display = "flex";
 publicChannelNumber = 2;
  setTimeout(() => {
  messenger.style.opacity = 1;
  }, 1000);
 return publicChannelNumber;
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

  logOutThinks();
//  messenger.classList.add("blur");
  console.log("xd");
  })

// nowe
let userProfile = document.getElementById("user-menu");
userProfile.addEventListener('click', () =>{
  channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
  user_profile_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
})
let arrowBackToChannels = document.getElementById("arrow-back-to-channel");
arrowBackToChannels.addEventListener("click", () =>{{
  if(publicChannelNumber === 1){
    channel_container.style.transform =  "initial";
  }
  user_profile_container.style.transform = "initial";
}})
//create channel
let createChannel_form = document.getElementById("create-channel_id");
createChannel_form.addEventListener("click", () =>{
  let createForm = document.getElementById("create-channel-form");
  createForm.style.display = "block";
  setTimeout(() => {
    createForm.style.opacity = 1;
  }, 1000);
})
let cancelCreate_form = document.getElementById("button-cancel_id");
cancelCreate_form.addEventListener("click", () =>{
  let createForm = document.getElementById("create-channel-form");
  createForm.style.opacity = 0;
  setTimeout(() => {
    createForm.style.display = "none";
  }, 1500);
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

function channelP(){
  let channel_photo = document.getElementById("channel-photo").value;
  let error_message = document.getElementById("newChannel-error");
  let idxDot = channel_photo.lastIndexOf(".") + 1;
  let extFile = channel_photo.substr(idxDot, channel_photo.length).toLowerCase();
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
    //TO DO
 
    error_message.innerHTML = "The picture has a good format.";
    error_message.style.color = "green";
    let numb = channelphotoVal = 1;
    return numb;
}else {
  error_message.innerHTML = "The picture has a bad format.";
  error_message.style.color = "crimson";
}
}