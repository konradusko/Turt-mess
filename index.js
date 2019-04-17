const containerMessPage = document.getElementById("container-mess-page_id");
const logOutButton = document.getElementById("logOut_id");
const channel_container = document.getElementById("channel-container_id");
const user_profile_container = document.getElementById("user-profile-container_id");
const messenger = document.getElementById("messenger_id");
let imageUrl = document.getElementById("input-file").value;

let register_number = "undefined";
let photoVal;
let publicChannelNumber = 1;
let channelphotoVal = 0;
/* sciezka do kanałow--->>> */
let pathChannel = "undefined";

//testy

// logowanie
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    document.getElementById("header").style.display = "none";
    document.getElementById("mess-page").style.display = "block";
  
    
  //  let userIdFromDatabase = "undefined";
   
    let userId = firebase.auth().currentUser.uid;
    let user = firebase.auth().currentUser;
    // uztkownik dopiero sie zarejestrowal, dodawanie go do bazy danych
    if (register_number === "czx9DJSAD5jncya9D8da934N2") {
      let randomValue = Math.random().toString(36).substring(5);

      // dodawanie uzytkownika do bazy danych
      firebase.database().ref('users/' + userId).set({
        username: document.getElementById("nickname_id").value,
        email: document.getElementById("register_email").value,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/no-avatar.jpg?alt=media&token=d8878bd7-c518-48fb-9f82-52b299fa4b3a",
        Number_of_messages_sent: 0,
        status: "Online",
        id : randomValue
      })
      //dodawanie obrazka
      if (photoVal === 1) {
        console.log("zaczyna sie dziac");
        var file = document.getElementById("input-file").files[0];
        var reader = new FileReader();
        reader.onloadend = function (evt) {
          var blob = new Blob([evt.target.result], {
            type: "image/jpeg"
          });

          const storageRef = firebase.storage().ref("Usuarios/" + user.uid + "/avatar.jpg");
          console.warn(file);

          storageRef.put(blob).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {
              // update obrazka
              firebase.database().ref("users/" + userId).update({
                photoURL: url // <- URL from uploaded photo.  
              });
            });
          });
        }
        reader.onerror = function (e) {
          console.log("Failed file read: " + e.toString());
        };
        reader.readAsArrayBuffer(file);

        console.log("zadzialo sie");
      } else {
      }
      rtn();
      function rtn(){
        let strIng = register_number = "undefined";
        return strIng;
      }

    } else {
      console.log("nothing");
    }



    //

    // tworzenie kanalu

    let create_channel = document.getElementById("button-New-channel");
    create_channel.addEventListener("click", () => {
      let channel_name = document.getElementById("channel_name_id").value;
      let channel_password = document.getElementById("channel_password_id").value;
      let error_message = document.getElementById("newChannel-error");
      let randomValue = Math.random().toString(36).substring(5);

      function randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
      }
      var randomString = randomString(35);
      //valid photo

      if (channel_name.length > 1 && channel_password.length > 1) {
        // dodawanie kanalu do bazy danych
       firebase.database().ref("Channels/" + randomString).set({
          ChannelName: channel_name,
          ChannelPassword: channel_password,
          unique_id: randomString,
          Channel_Id: randomValue,
          founder: userId,
          ChannelPhoto: "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/No-Photo-Available.jpg?alt=media&token=e7d6e25d-eb5b-4262-8287-c6b976791840"


        });


        console.log(channelphotoVal);
        if (channelphotoVal === 1) {
          let file = document.getElementById("channel-photo").files[0];
          var reader = new FileReader();
          reader.onloadend = function (evt) {
            var blob = new Blob([evt.target.result], {
              type: "image/jpeg"
            });
            var storageRef = firebase.storage().ref("Channels/" + randomString + "/Channel_photo.jpg");
            storageRef.put(blob).then(function (snapshot) {
              snapshot.ref.getDownloadURL().then(function (url) {
                let ur = url;
                firebase.database().ref("Channels/" + randomString).update({
                  ChannelPhoto: ur // <- URL from uploaded photo.

                }).then(function () {

                });
                console.log("update");
              });
            });
          }
          reader.onerror = function (e) {
            console.log("Failed file read: " + e.toString());

          };
          reader.readAsArrayBuffer(file);


        } else {

        }


        error_message.style.color = "green";
        error_message.innerHTML = "The channel was created."


        setTimeout(() => {
          document.getElementById("create-channel-form").style.opacity = 0;
          document.getElementById("create-channel-form").style.display = "none";
        }, 2000);

      } else {
        error_message.style.color = "crimson";
        error_message.innerHTML = "Please complete the fields."
      }




    })

    let passAndUniqId = new Array;
    let btnJoin = document.getElementById("login-to-channel-join");
    let btnCancel = document.getElementById("login-to-channel-cancel");
    let form = document.getElementById("login-to-channel_id");
    let joinError = document.getElementById("login-to-channel-span-error");

    let login_photo = document.getElementById("channel-login-photo");
    let login_name = document.getElementById("channel-login-name");
    let indexOne = 0;
    let indexTwo = 0;
    // wyswietlanie kanałów
    const channelsRef = firebase.database().ref('Channels/');
    channelsRef.on('child_added', function (snapshot) {
      let channelsname = snapshot.child("ChannelName").val();
      let channels_id = snapshot.child("Channel_Id").val();
      let channels_img = snapshot.child("ChannelPhoto").val();
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
      const joinChannel = document.getElementById(channels_id);
      joinChannel.addEventListener("click", (e) => {
        document.getElementById("channel-ul-container").classList.add("block-click");
        let targetClick = joinChannel.contains(e.target);

        if (targetClick === true) {
          let password_datbase = snapshot.child("ChannelPassword").val();
          let uniquieID = snapshot.child("unique_id").val();
          form.style.display = "flex";
          login_photo.src = channels_img;
          login_name.innerHTML = channelsname;
          setTimeout(() => {
            form.style.opacity = 1;
          }, 500);

          let rtnIndOne = indexOne = 0;
          let rtnIndTwo = indexTwo = 1;
          clickEvent();
          // nr0 haslo, nr 1 unikalne id, nr 2 obrazek, nr 3 nazwa kanalu
          return passAndUniqId.push(password_datbase, uniquieID, channels_img, channelsname), rtnIndOne, rtnIndTwo;
        } else {

        }


      })
    })
    // po dodaniu kanalu automatycznie zmienia obrazek na obrazek dodany przez uzytkownika
    channelsRef.on("child_changed", function (snapshot) {
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
    //logowanie do channelu
    btnJoin.addEventListener("click", () => {
      console.log(passAndUniqId)
      let login_channelPassword = document.getElementById("login-to-channel-password").value;
      console.log(passAndUniqId[0]);
      if (login_channelPassword === passAndUniqId[0]) {
        console.log(passAndUniqId[1])
        joinError.innerHTML = "The password provided is good."
        joinError.style.color = "white";
        console.log(login_channelPassword + " " + "true");
        textx22();
        let xd = 'Channels/' + passAndUniqId[1] + '/messages';
       // console.log(passAndUniqId);
        document.getElementById("channel_photo").src = passAndUniqId[2];
        document.getElementById("channel_name").innerHTML = passAndUniqId[3];
        //onChannel();
cancelForm();

return pathChannel = xd,snapMessages(),  joinPrivateAndPubChan();
      } else {
        joinError.innerHTML = "The password provided is wrong."
        joinError.style.color = "red";
        console.log(login_channelPassword + " " + "false");
        console.log(login_channelPassword.length)
      }
    });
    //anulacja
    btnCancel.addEventListener("click", cancelForm)

    function cancelForm() {
      form.style.opacity = 0;
      setTimeout(() => {
        form.style.display = "none";
        login_photo.src = "";
        login_name.innerHTML = "";
        document.getElementById("channel-ul-container").classList.remove("block-click");
      }, 1000);
      //  document.getElementById("login-to-channel-password").value = "";
      let rtnIndOne1 = indexOne = 3;
      let rtnIndTw2 = indexTwo = 0;
      clickEvent();
      return rtnIndOne1, rtnIndTw2, passAndUniqId = [];
    }

    function textx22() {
      //console.log(uniquieID);
      console.log("xddddd");
      window.alert("no i dziala jak powinno");
    }



    // klikniecie poza form do logowania = zamkniecie go, i wylaczenie eventu
    function clickEvent() {

      if (indexTwo === 1) {
        window.addEventListener("click", function clickEventList(event) {
          let clickInSide = document.getElementById("login-to-channel_id").contains(event.target);
          if (indexOne === 1) {
            if (clickInSide) {

            } else {
              window.removeEventListener("click", clickEventList, false);
              form.style.opacity = 0;
              setTimeout(() => {
                form.style.display = "none";
                login_photo.src = "";
                login_name.innerHTML = "";
                document.getElementById("channel-ul-container").classList.remove("block-click");
              }, 1000);
              //  document.getElementById("login-to-channel-password").value = "";

              let rtnInOne = indexOne = 0;
              return rtnInOne, passAndUniqId = [];
            }
          } else if (indexOne === 0) {
            let returnIndOne = indexOne = 1;
            return returnIndOne;
          } else if (indexOne === 3) {
            window.removeEventListener("click", clickEventList, false);

          }

        })
      } else {

      }
    }


    // wysiwetlanie zalogowanego uzytkownika
    let userArray = new Array;
//let userloginId;
   const loginUserRef = firebase.database().ref('users/' + userId);
    loginUserRef.on("value", function(snap){
    let userId  = snap.child("id").val();
    let userImg = snap.child("photoURL").val();
    let userNickName = snap.child("username").val();
    let userEmail = snap.child("email").val();
    let userStatus = snap.child("status").val();
         document.getElementById("channel-user-profile").src = userImg;
         document.getElementById("user-photo").src = userImg;
         document.getElementById("userNick").innerHTML = userNickName;
         document.getElementById("user-email").innerHTML = userEmail;

    return userArray.push(userImg, userNickName, userEmail, userId);
    // 0 = userImg, 1 = userNickName, 2 = user-mail, 3 = userID
    })
 
    loginUserRef.on("child_changed", function (snap) {
      console.log(snap.val());
     // let userId  = snap.child("id").val();
      let userImg = snap.child("photoURL").val();
      let userNickName = snap.child("username").val();
      let userEmail = snap.child("email").val();
      let userStatus = snap.child("status").val();
      document.getElementById("channel-user-profile").src = userImg;
      document.getElementById("user-photo").src = userImg;
      document.getElementById("userNick").innerHTML = userNickName;
      document.getElementById("user-email").innerHTML = userEmail;
  
    })



    //zmiana statusu
    const UsStatus = document.getElementById("select_status_Id");
    UsStatus.addEventListener('change', () =>{
      let stat = "★ Online";
    let  val = document.getElementById("select_status_Id").value;
      switch(val){
        case "0":
        stat = "★ Online";
        break;
        case "1":
         stat = "☆ Idle";
        break;
        case "2":
        stat = "☆ Away";
        break;
        case "3":
        stat = "☆ Offline"
        break;
      }
    
     firebase.database().ref("users/" + userId).update({
        status : stat
      });
    })
   

// wyswietlanie uzytkownikow

const usersRef = firebase.database().ref('users');
usersRef.on('child_added', function (snapshot) {
// console.log(snapshot.key());
/*
if(snapshot.val()){
  loginUserRef.on("child_added", function(snapshot){
    usersRef.onDisconnect().set('☆ offline');
    usersRef.set('★ online');
  })

}
*/
let xd = snapshot.key;

// console.log(userloginId);
  let userImg = snapshot.child("photoURL").val();
  let userNickName = snapshot.child("username").val();
  let userStatus = snapshot.child("status").val();
  let userDatabaseId = snapshot.child("id").val();
if(userArray[3] === userDatabaseId ){
  console.log("i cyk dziala i nie wyswietla")
  
}else{

  let createLi = document.createElement("li");
  //createLi.id =userDatabaseId;
  let createImg = document.createElement("img");
  createImg.src = userImg;
  let createDiv = document.createElement("div");
  createDiv.className = "user-name-status";
  let createSpanOne = document.createElement("span");
  let createB = document.createElement("b");
  createB.append(userNickName);
  createSpanOne.append(createB);
  let createDivTwo = document.createElement("div");
  createDivTwo.className = "user-status";
  let createSpanTwo = document.createElement("span");
  createSpanTwo.innerHTML = "Status:";
  let createSpanThree = document.createElement("span");
  createSpanThree.className ="span-status";
  createSpanThree.append(userStatus);
  createDivTwo.append(createSpanTwo,createSpanThree)
  createDiv.append(createSpanOne,createDivTwo);
  let createDivThree = document.createElement("div");
  createDivThree.className = "button-container";
  let createButton = document.createElement("button");
  createButton.id = userDatabaseId;
  createButton.className = "add_firend_button";
  createButton.innerHTML = '<i class="fa fa-plus"></i>' + "Add friend";
  createDivThree.append(createButton);
createLi.append(createImg,createDiv,createDivThree);
document.getElementById("usersOnlineId").append(createLi);

const addFriendTarget = document.getElementById(userDatabaseId);
addFriendTarget.addEventListener("click", (event) =>{
  let xdd = event.target;

  console.log( xdd)
})
}
//let clickInSide = document.querySelectorAll(".add_firend_button").contains(event.target);
//console.log(clickInSide);
//let referencjaDoEventTarget =  event.target.classList.contains("add_firend_button");


 // console.log(xd);

})
// do poprawy
/*
usersRef.on("child_changed", function (snapshot) {
  let userStatus = snapshot.child("status").val();
  let userDatabaseId = snapshot.child("id").val();
  console.log(userDatabaseId + userStatus);
  let test = document.getElementById(userDatabaseId);
  console.log(userDatabaseId)
})
// dodawanie do znajomych
addFriend()
function addFriend(){
  console.log("dzieje sie to ?")
let testbutton = document.querySelectorAll(".add_firend_button");

for (i = 0; i < testbutton.length; i++) {
  console.log("a to sie dzieje ?")
  testbutton[i].addEventListener("click", function() {
  alert("you clicked"); });
}

}    
*/
let testbutton = document.querySelectorAll(".add_firend_button");

function testxd(){
console.log("we dzialaj")


for (i = 0; i < testbutton.length; i++) {
  console.log("a to sie dzieje ?")
  testbutton[i].addEventListener("click", function() {
  alert("you clicked"); });
}

}
/////
for(var i = 0; i < testbutton.length; i++) {
  console.log("xxxxxx")
  testbutton[i].addEventListener("click", bindClick(i));
}

function bindClick(i) {
return function() {
   console.log("you clicked region number " + i);
};
}
/*
window.addEventListener("click", function(event){
  let referencjaDoEventTarget =  event.target.classList.contains("add_firend_button");
  let xdd = event.target;
 
  if(referencjaDoEventTarget === true){
    console.log( xdd)
   // console.log(xd);
  }else{
    console.log("to chyba nie jest button add heheheheh")
  }
   
  })
  */
    //test

   
    // wysylanie public na wysylanie wiadomosci

  

    //mechanika
    //wylogowanie

logOutButton.addEventListener("click", () =>{
  logOutThinks();
  firebase.auth().signOut();
  location.reload();
})


    function logOutThinks() {

      messenger.style.opacity = 0;
      setTimeout(() => {
        messenger.style.display = "none";
        containerMessPage.style.width = 200 + "%";
        channel_container.style.transform = "initial";
        messenger.style.transform = "initial";
        user_profile_container.style.transform = "initial";
        messenger.style.width = 0 + "%";
      }, 1000);
     // document.getElementById("usersOnlineId").innerHTML = "";
      //messenger.classList.remove("blur");

      publicChannelNumber = 1;
      return publicChannelNumber;
    }


    // join to channel
    let publicChannel = document.getElementById("public_id");
    publicChannel.addEventListener("click", () => {
      document.getElementById("channel_photo").src = "img/public-background.jpg";
      document.getElementById("channel_name").innerHTML = "Public";
      return pathChannel = 'PublicChannel/',  snapMessages(),  joinPrivateAndPubChan();
    })

    function joinPrivateAndPubChan() {
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

    }
// channel setting
//function onChannel(){
const channelSetting = document.getElementById("channel-setting-join");
channelSetting.addEventListener("click", () =>{
  console.log("working")
 const settingMain = document.getElementById("setting-main");
 settingMain.style.display = "flex";
 setTimeout(() =>{
   settingMain.style.opacity = 1;
 })
})
//}

    //wyswietlenie profilu uzytkownika
    let user_button = document.getElementById("user_id");
    user_button.addEventListener("click", () => {
      user_profile_container.style.transform = ("translate", "translate3d(-" + 200 + "%,0,0)");
      //messenger.classList.add("blur");
      console.log("xd");
    })
    //powrot do kanałow kanalow
    let channel_button = document.getElementById("channel_id");
    channel_button.addEventListener("click", () => {
document.getElementById("list").innerHTML ="";
      logOutThinks();
      //  messenger.classList.add("blur");
      console.log("xd");
    })

    // nowe
    let userProfile = document.getElementById("user-menu");
    userProfile.addEventListener('click', () => {
      channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
      user_profile_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
    })
    let arrowBackToChannels = document.getElementById("arrow-back-to-channel");
    arrowBackToChannels.addEventListener("click", () => {
      {
        if (publicChannelNumber === 1) {
          channel_container.style.transform = "initial";
        }
        user_profile_container.style.transform = "initial";
      }
    })
    //create channel
    let createChannel_form = document.getElementById("create-channel_id");
    createChannel_form.addEventListener("click", () => {
      let createForm = document.getElementById("create-channel-form");
      createForm.style.display = "block";
      setTimeout(() => {
        createForm.style.opacity = 1;
      }, 1000);
    })
    let cancelCreate_form = document.getElementById("button-cancel_id");
    cancelCreate_form.addEventListener("click", () => {
      let createForm = document.getElementById("create-channel-form");
      createForm.style.opacity = 0;
      setTimeout(() => {
        createForm.style.display = "none";
      }, 1500);
    })
    // wyswietlanie wiadomosci kanalu glownego
    function snapMessages() {
    
      console.log(pathChannel);
      var messageRef = firebase.database().ref(pathChannel);
      messageRef.on('child_added', function (snapshot) {
        let message_value = snapshot.child("Message").val();
        let nickName_value = snapshot.child("Nickname").val();
        let photo_value = snapshot.child("Photo").val();
        let time = snapshot.child("time").val();
        let date = snapshot.child("date").val();
                console.log(photo_value);
        let createLi = document.createElement("li");
        let createSpan = document.createElement("span");
        let createDiv = document.createElement("div");
        let createImg = document.createElement("img");
        let createThirdDiv = document.createElement("div");
       // let createP = document.createElement("p");
     //   createP.append(message_value);
        //let createB2 = document.createElement("b");
        let createB3 = document.createElement("b");

     
     createThirdDiv.className = "date_hours"
     createThirdDiv.append("Date: " + date +" " + "Time: " + time);
     let createDivSecont = document.createElement("div");
     createDivSecont.className = "li_div_message-text"
     createDivSecont.append(message_value);
        createDiv.className = "li_div";
        createDiv.append(createImg, createDivSecont);
        createB3.append(nickName_value);
        createSpan.append(createB3);
        createImg.src = photo_value;
        createLi.append(createSpan, createDiv,createThirdDiv);
        document.getElementById("list").append(createLi);
      });
    }
// wysylanie wiadomosci
let send_message = document.getElementById("send-message");
send_message.addEventListener("click", () => {
  let today = new Date();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let text_area = document.getElementById("messenger_text_area").value;
  firebase.database().ref().child(pathChannel).push({
    Message: text_area,
    Nickname: userArray[1],
    Photo: userArray[0],
    email: userArray[2],
    time: time,
    date: date

  });

   // 0 = userImg, 1 = userNickName, 2 = user-mail, 3 = userID
})


// testowanie uzytkownikow online





  } else {
    // No user is signed in.
    document.getElementById("header").style.display = "flex";
    document.getElementById("mess-page").style.display = "none";

  }



});
//login eventlistener
document.getElementById("input_login").addEventListener("click", login)

function login() {
  let userEmail = document.getElementById("login-mail").value;
  let userPassword = document.getElementById("login_password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    // Handle Errors here.

    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    document.getElementById("login-error").innerHTML = errorMessage;
  });
}

//register listenerevent
document.getElementById("input_register").addEventListener("click", register);

function register() {
  let userRegisterEmail = document.getElementById("register_email").value;
  let userRegisterPassOne = document.getElementById("register_password_one").value;
  let userRegisterPasstwo = document.getElementById("register_password_two").value;
  let userRegisterNickName = document.getElementById("nickname_id").value;
  if (userRegisterPassOne === userRegisterPasstwo && userRegisterNickName.length >= 4) {
    firebase.auth().createUserWithEmailAndPassword(userRegisterEmail, userRegisterPassOne).catch(function (error) {
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

  } else if (userRegisterEmail.length === 0) {
    document.getElementById("register-error").innerHTML = "Please write your email.";
  } else if (userRegisterPassOne.length === 0) {
    document.getElementById("register-error").innerHTML = "Please write your password.";
  } else if (userRegisterPassOne != userRegisterPasstwo) {
    document.getElementById("register-error").innerHTML = "Passwords are not the same.";
  } else if (userRegisterNickName.length <= 4) {
    document.getElementById("register-error").innerHTML = "Your Nickname must contain at least 4 characters.";
  }
}





// sprawdzenie czy zdj uzytkownika jest ok
// w przyszlosci dodac maksymalny rozmiar zdj
function validateFileType() {
  let error_message = document.getElementById("error-file");
  let fileName = document.getElementById("input-file").value;
  let idxDot = fileName.lastIndexOf(".") + 1;
  let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO
    error_message.innerHTML = "The picture has a good format.";
    error_message.style.color = "green";
    console.log("xd");
    let test = photoVal = 1;
    return test;
  } else {
    error_message.innerHTML = "The picture has a bad format.";
    error_message.style.color = "crimson";
  }
}
// sprawdzenie czy zdj kanału jest ok
// w przyszlosci dodac maksymalny rozmiar zdj
function channelP() {
  let channel_photo = document.getElementById("channel-photo").value;
  let error_message = document.getElementById("newChannel-error");
  let idxDot = channel_photo.lastIndexOf(".") + 1;
  let extFile = channel_photo.substr(idxDot, channel_photo.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO

    error_message.innerHTML = "The picture has a good format.";
    error_message.style.color = "green";
    let numb = channelphotoVal = 1;
    return numb;
  } else {

    error_message.innerHTML = "The picture has a bad format.";
    error_message.style.color = "crimson";
    let numb = channelphotoVal = 0;
    return numb;
  }
}