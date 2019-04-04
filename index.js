
let containerMessPage = document.getElementById("container-mess-page_id");
 
let channel_container = document.getElementById("channel-container_id");
let user_profile_container = document.getElementById("user-profile-container_id");
let messenger = document.getElementById("messenger_id");
let imageUrl = document.getElementById("input-file").value;

let register_number = "undefined";
let photoVal;
let publicChannelNumber = 1;
let channelphotoVal = 0;

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

//update user profilu o jego nick i id(email juz posiada)
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
  
    storageRef.put(blob).then(function(snapshot){
      snapshot.ref.getDownloadURL().then(function(url){
       
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
  
});
  }

 let strIng = register_number = "undefined";

return strIng;
}else{
  //nothing
  
  console.log("nothing");
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
  firebase.database().ref().child("PublicChannel").push({
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

let create_channel = document.getElementById("button-New-channel");
create_channel.addEventListener("click", () =>{
  let channel_name = document.getElementById("channel_name_id").value;
  let channel_password = document.getElementById("channel_password_id").value;
  let error_message = document.getElementById("newChannel-error");
  let randomValue = Math.random().toString(36).substring(5);
  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
var randomString = randomString(35);
  //valid photo
 
  if(channel_name.length > 1 && channel_password.length > 1){
  // dodawanie kanalu do bazy danych
let tescik = firebase.database().ref("Channels/" + randomString).set({
    ChannelName: channel_name,
   ChannelPassword: channel_password,
   unique_id : randomString,
   Channel_Id : randomValue,
   ChannelPhoto: "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/No-Photo-Available.jpg?alt=media&token=e7d6e25d-eb5b-4262-8287-c6b976791840" 

     
  });


console.log(channelphotoVal);
   if(channelphotoVal === 1){
    let file = document.getElementById("channel-photo").files[0];
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      var blob = new Blob([evt.target.result], { type: "image/jpeg" });
      var storageRef = firebase.storage().ref("Channels/" + randomString + "/Channel_photo.jpg");
      storageRef.put(blob).then(function(snapshot){
        snapshot.ref.getDownloadURL().then(function(url){
          let ur = url;
          firebase.database().ref("Channels/" + randomString).update({
            ChannelPhoto: ur   // <- URL from uploaded photo.
          
          }).then(function(){
      
          });
          console.log("update");
        });
    });
    }
    reader.onerror = function (e) {
        console.log("Failed file read: " + e.toString());
  
    };
    reader.readAsArrayBuffer(file);
  
 
   }else{

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
 
   


})

CreateChannelsOnLoad();
function CreateChannelsOnLoad(){
  let channelsRef = firebase.database().ref('Channels/');
  channelsRef.on('child_added', function(snapshot) {
    let channelsname = snapshot.child("ChannelName").val();
    let channels_id = snapshot.child("Channel_Id").val();
    let channels_img = snapshot.child("ChannelPhoto").val();
    let uniquieID = snapshot.child("unique_id").val();
    let channel_li = document.createElement("li");
  let create_div = document.createElement("div");
  let create_span = document.createElement("span");
  let create_img = document.createElement("img");
  channel_li.id = channels_id;
  channel_li.className = "container-channel";
  create_div.className = "wheel-channel created";
  create_span.classList = "create-chanel-span";
  create_div.append(create_img);
  create_img.src = channels_img;
  create_span.append(channelsname);
  channel_li.append(create_div, create_span);
  document.getElementById("channel-ul-container").append(channel_li);
 

 let indexOne = 0;
 let indexTwo = 0;
 let login_photo = document.getElementById("channel-login-photo");
let login_name = document.getElementById("channel-login-name");
let form = document.getElementById("login-to-channel_id");
let btnCancel = document.getElementById("login-to-channel-cancel");
let btnJoin = document.getElementById("login-to-channel-join");
let joinError = document.getElementById("login-to-channel-span-error");





  let joinChannel = document.getElementById(channels_id);
  joinChannel.addEventListener("click", () =>{
 
    document.getElementById("channel-ul-container").classList.add("block-click");

  
    

   


form.style.display = "flex";
login_photo.src = channels_img;
login_name.innerHTML = channelsname;
setTimeout(() => {
 form.style.opacity = 1;
 }, 500);

 

 
// sprawdzanie hasla podanego przez uzytkowniak (if pass === pass){pobierz wiadomosci z bazy danych}

//snapAndCheckPasswords();
//function snapAndCheckPasswords(){
 // 

 btnJoin.addEventListener("click", () =>{
 // snapAndCheckPasswords();
  //function snapAndCheckPasswords(){

    var ref = firebase.database().ref('Channels/' + uniquieID);
ref.orderByChild("Channel_Id").once("value", function(snapshot) {
    let passwordFromDatabase = snapshot.child("ChannelPassword").val();
    console.log(uniquieID);
    console.log(snapshot.val());

   


    let login_channelPassword = document.getElementById("login-to-channel-password").value;
    console.log(passwordFromDatabase + "  "+ "baza danych");
    console.log(login_channelPassword)
    if(passwordFromDatabase === login_channelPassword){
 
      joinError.innerHTML = "The password provided is good."
      joinError.style.color = "white";
      console.log(login_channelPassword+" "+ "true");
      textx22();

    }else{
      joinError.innerHTML = "The password provided is wrong."
      joinError.style.color = "red";
      console.log(login_channelPassword +" "+ "false");
      console.log(login_channelPassword.length)
    }
    //console.log(passwordFromDatabase + ""+ "haslo z bazy danych");

  });  
   //console.log(passwordFromDatabase);
  
  
   // console.log(login_channelPassword);
  
    
  


  
 //}
})
      




  btnCancel.addEventListener("click", cancelForm)
 //anulacja
 function cancelForm(){
  form.style.opacity = 0;
  setTimeout(() => {
    form.style.display = "none";
    login_photo.src = "";
    login_name.innerHTML = "";
    document.getElementById("channel-ul-container").classList.remove("block-click");
    }, 1000);
  //  document.getElementById("login-to-channel-password").value = "";
    let rtnIndOne1 = indexOne = 3;
    let rtnIndTw2 = indexTwo =0;

    console.log("czy to sie dziejej x1");
 
    
  clickEvent();
    return rtnIndOne1, rtnIndTw2;
 }
  
 
/* nie dziala */
 
  function textx22(){
  console.log(uniquieID);
  console.log("xddddd");
  window.alert("no i dziala jak powinno");
  }


  let rtnIndOne = indexOne=0;
let rtnIndTwo = indexTwo = 1;
console.log(indexTwo);

clickEvent();


 return rtnIndOne,rtnIndTwo;

 
 
  })
  // klikniecie poza form do logowania = zamkniecie go, i wylaczenie eventu
  function clickEvent(){

     //console.log(indexTwo + "indx two");
  //console.log(indexOne + "to jest indexOne 222samo powinien miec 0");
if(indexTwo === 1){
  window.addEventListener("click", function clickEventList(event){
    let clickInSide = document.getElementById("login-to-channel_id").contains(event.target);
   // console.log(indexOne + "to jest indexOne samo ");
// console.log(indexTwo);
    if(indexOne === 1){
   //  console.log("xd equal indexOne")
    if(clickInSide){
    //  console.log("click in side")
  
    }else{
      window.removeEventListener("click", clickEventList, false);
       // console.log("not in side")
        form.style.opacity = 0;
        setTimeout(() => {
          form.style.display = "none";
          login_photo.src = "";
          login_name.innerHTML = "";
        //  console.log("czy to sie dziejej x2");
        document.getElementById("channel-ul-container").classList.remove("block-click");
          }, 1000);
        //  document.getElementById("login-to-channel-password").value = "";
  
       
     
   
        let rtnInOne = indexOne =0;
       // let indx3 = indexThree =1;
       console.log("wylacza sie ");
  
    return rtnInOne;
  
      
     
     
   
  
    }
  
  
  }else if(indexOne === 0){
  //console.log("indexOne equal zero")
  
   let returnIndOne = indexOne = 1;
   
  
  
   return returnIndOne;
  }else if(indexOne === 3){
    window.removeEventListener("click", clickEventList, false);
   
  }
  
  })
}else{
//console.log("00");


}

  

 
 

  }

});

// po dodaniu kanalu automatycznie zmienia obrazek na obrazek dodany przez uzytkownika
  channelsRef.on("child_changed", function(snapshot){
    console.log(snapshot.val());
   let channel_img = snapshot.child("ChannelPhoto").val();
   let channels_id = snapshot.child("Channel_Id").val();
 let img_container = document.getElementById(channels_id).firstElementChild;
 console.log(img_container);
 console.log(channels_id);
 console.log(channel_img);
 let img_container2 = img_container.firstElementChild;
 img_container2.src = channel_img;

  })
}





//wyswietlanie listy kanałow ^ wyzej




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

// sprawdzenie czy zdj uzytkownika jest ok
// w przyszlosci dodac maksymalny rozmiar zdj
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
// sprawdzenie czy zdj kanału jest ok
// w przyszlosci dodac maksymalny rozmiar zdj
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
  let numb = channelphotoVal = 0;
  return numb;
}
}