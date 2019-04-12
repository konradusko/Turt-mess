const containerMessPage = document.getElementById("container-mess-page_id");
const logOutButton = document.getElementById("logOut_id");
const channel_container = document.getElementById("channel-container_id");
const user_profile_container = document.getElementById("user-profile-container_id");
let messenger = document.getElementById("messenger_id");
let imageUrl = document.getElementById("input-file").value;

let register_number = "undefined";
let photoVal;
let publicChannelNumber = 1;
let channelphotoVal = 0;
/* sciezka do kanałow--->>> */
let pathChannel = "undefined";

// logowanie
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    document.getElementById("header").style.display = "none";
    document.getElementById("mess-page").style.display = "block";

    // testy nadal 
    let userIdFromDatabase = "undefined";
    // dodawania uzytkownika do bazy danych oraz uzupelnianie jego profilu zaraz po rejestracji
    let userId = firebase.auth().currentUser.uid;
    let user = firebase.auth().currentUser;
    if (register_number === "czx9DJSAD5jncya9D8da934N2") {
      console.log("lul");
      let randomValue = Math.random().toString(36).substring(5);
      //update user profilu o jego nick i id(email juz posiada)
    
      user.updateProfile({
        displayName: document.getElementById("nickname_id").value,
        uid: userId
      }).then(function () {
        console.log("udalo sie zmienic a raczej dodac" + randomValue)
        //aby odrazu po rejestracji pokazywal sie obrazek

        document.getElementById("userNick").innerHTML = user.displayName;
        document.getElementById("user-email").innerHTML = user.email;
      }).catch(function (error) {
        // An error happened.c
      });
      // dodawanie uzytkownika do bazy danych
      firebase.database().ref('users/' + userId).set({
        username: document.getElementById("nickname_id").value,
        email: document.getElementById("register_email").value,
        photoURL: "undefined",
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


          var storageRef = firebase.storage().ref("Usuarios/" + user.uid + "/avatar.jpg");
          console.warn(file);

          storageRef.put(blob).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {

              let test = url;
              document.getElementById("user-photo").src = test;
              user.updateProfile({
                photoURL: url // <- URL from uploaded photo.
                
              }).then(function () {
                //aby odrazu po rejestracji pokazywal sie obrazek
                document.getElementById("channel-user-profile").src = url;
                firebase.database().ref("users/" + userId).update({
                  photoURL: url // <- URL from uploaded photo.
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
      } else {
        let userNophoto = "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/no-avatar.jpg?alt=media&token=d8878bd7-c518-48fb-9f82-52b299fa4b3a";
        user.updateProfile({
        
          photoURL: userNophoto // <- URL from uploaded photo.
        }).then(function () {
          console.log("dodało");
          //aby odrazu po rejestracji pokazywal sie obrazek
          document.getElementById("user-photo").src = userNophoto;
          document.getElementById("channel-user-profile").src = userNophoto;
          firebase.database().ref("users/" + userId).update({
            photoURL: userNophoto // <- URL from uploaded photo.
          });

        });
        rtn();
        function rtn(){
          let strIng = register_number = "undefined";

          return strIng;
        }
        
      }


    } else {
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
       console.log("  Provider-specific UID: " + user.testid);
      // console.log("  Photo URL: " + profile.photoURL);
      // });
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
        let tescik = firebase.database().ref("Channels/" + randomString).set({
          ChannelName: channel_name,
          ChannelPassword: channel_password,
          unique_id: randomString,
          Channel_Id: randomValue,
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
      let login_channelPassword = document.getElementById("login-to-channel-password").value;
      console.log(passAndUniqId[0]);
      if (login_channelPassword === passAndUniqId[0]) {
        console.log(passAndUniqId[1])
        joinError.innerHTML = "The password provided is good."
        joinError.style.color = "white";
        console.log(login_channelPassword + " " + "true");
        textx22();
        let xd = 'Channels/' + passAndUniqId[1] + '/messages';
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
let userloginId;
   const loginUserRef = firebase.database().ref('users/' + userId);
    loginUserRef.once("value", function(snap){
    let userId  = snap.child("id").val();
    return userloginId = userId;
    })

const usersRef = firebase.database().ref('users');
usersRef.on('child_added', function (snapshot) {
 //console.log(snapshot.val());
 console.log(userloginId);
  let userImg = snapshot.child("photoURL").val();
  let userNickName = snapshot.child("username").val();
  let userStatus = snapshot.child("status").val();
  let userDatabaseId = snapshot.child("id").val();
if(userloginId === userDatabaseId ){
  console.log("i cyk dziala i nie wyswietla")
}else{

  let createLi = document.createElement("li");
  createLi.id =userDatabaseId;
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
  createButton.innerHTML = '<i class="fa fa-plus"></i>' + "Add friend";
  createDivThree.append(createButton);
createLi.append(createImg,createDiv,createDivThree);
document.getElementById("usersOnlineId").append(createLi);
}
})




    //test
    // wysylanie public na wysylanie wiadomosci

  

    //mechanika
    //wylogowanie

logOutButton.addEventListener("click", () =>{
  logOutThinks();
  firebase.auth().signOut();
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

      //messenger.classList.remove("blur");

      publicChannelNumber = 1;
      return publicChannelNumber;
    }


    // join to channel
    let publicChannel = document.getElementById("public_id");
    publicChannel.addEventListener("click", () => {
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
        console.log(message_value);
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
        createLi.append(createSpan, createDiv);
        document.getElementById("list").append(createLi);
      });
    }
// wysylanie wiadomosci
let send_message = document.getElementById("send-message");
send_message.addEventListener("click", () => {
  let text_area = document.getElementById("messenger_text_area").value;
  firebase.database().ref().child(pathChannel).push({
    Message: text_area,
    Nickname: user.displayName,
    Photo: user.photoURL,
    email: user.email
  });


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