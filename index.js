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
let channelPhotoValChange = 0;
/* sciezka do kanałow--->>> */
let pathChannel = "undefined";
let pathUsers = "undefined";
let pathNumbersOfPost = "undefined";
let pathEmoji = "undefined";
//media
const mq = window.matchMedia("(min-width:800px)");
if(mq){
  console.log("xdddddddddd");
}
//testy

// logowanie
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    document.getElementById("header").style.display = "none";
    document.getElementById("mess-page").style.display = "block";
    const createForm = document.getElementById("create-channel-form"); //tworzenie nowego kanału form
    const loginToChannelPasswordForm = document.getElementById("channel-loginPasswordInputContainer"); // logowanie do kanalu:: form do wpisania hasla
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
        id: randomValue
      })
      //dodawanie obrazka
      if (photoVal === 1) {
        console.log("zaczyna sie dziac");
        let file = document.getElementById("input-file").files[0];
        let reader = new FileReader();
        reader.onloadend = function (evt) {
          let blob = new Blob([evt.target.result], {
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
      } else {}
      rtn();

      function rtn() {
        let strIng = register_number = "undefined";
        return strIng;
      }

    }


    //

    // tworzenie kanalu

    const create_channel = document.getElementById("button-New-channel");
    create_channel.addEventListener("click", () => {
      const channel_name = document.getElementById("channel_name_id").value;
      const channel_password = document.getElementById("channel_password_id").value;
      const error_message = document.getElementById("newChannel-error");
      let randomValue = Math.random().toString(36).substring(5);


      function randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < len; i++) {
          let randomPoz = Math.floor(Math.random() * charSet.length);
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
          number_of_messages_sent: 0,
          icon: "👍",
          ChannelPhoto: "https://firebasestorage.googleapis.com/v0/b/messenger-6923c.appspot.com/o/No-Photo-Available.jpg?alt=media&token=e7d6e25d-eb5b-4262-8287-c6b976791840"
        });
        firebase.database().ref("Channels/" + randomString + "/Users_on_channel").push({
          userId
        });


        //  console.log(channelphotoVal);
        if (channelphotoVal === 1) {
          let file = document.getElementById("channel-photo").files[0];
          let reader = new FileReader();
          reader.onloadend = function (evt) {
            let blob = new Blob([evt.target.result], {
              type: "image/jpeg"
            });
            let storageRef = firebase.storage().ref("Channels/" + randomString + "/Channel_photo.jpg");
            storageRef.put(blob).then(function (snapshot) {
              snapshot.ref.getDownloadURL().then(function (url) {
                let ur = url;
                firebase.database().ref("Channels/" + randomString).update({
                  ChannelPhoto: ur // <- URL from uploaded photo.

                })
              });
            });
          }
          reader.onerror = function (e) {
            console.log("Failed file read: " + e.toString());

          };
          reader.readAsArrayBuffer(file);
        }
        error_message.style.color = "green";
        error_message.innerHTML = "The channel was created."
        setTimeout(() => {
          createForm.style.opacity = 0;
          createForm.style.display = "none";
        }, 2000);

      } else {
        error_message.style.color = "crimson";
        error_message.innerHTML = "Please complete the fields."
      }




    })

    let passAndUniqId = new Array;
    let chan_icon = new Array;
    let publicuniquieId = new Array;
    const btnJoin = document.getElementById("login-to-channel-join");
    const btnCancel = document.getElementById("login-to-channel-cancel");
    const form = document.getElementById("login-to-channel_id");
    const joinError = document.getElementById("login-to-channel-span-error");

    const login_photo = document.getElementById("channel-login-photo");
    const login_name = document.getElementById("channel-login-name");
    let indexOne = 0;
    let indexTwo = 0;
    // wyswietlanie kanałów
    const channelsRef = firebase.database().ref('Channels/');
    channelsRef.on('child_added', function (snapshot) {

      //pobieranie informacji z bazych danych o kanale
      let channels_id = snapshot.child("Channel_Id").val();
      let channelsname = snapshot.child("ChannelName").val();
      let channels_img = snapshot.child("ChannelPhoto").val();
      let channel_boss = snapshot.child("founder").val();
      let channel_icon = snapshot.child("icon").val();

      let channel_li = document.createElement("li");
      let create_div = document.createElement("div");
      let create_span = document.createElement("span");
      let create_img = document.createElement("img");
      let createB = document.createElement("b");

      channel_li.id = channels_id;
      channel_li.className = "container-channel";
      create_div.className = "wheel-channel created";
      create_span.classList = "create-chanel-span";
      create_div.append(create_img);
      create_img.src = channels_img;
      createB.append(channelsname);
      create_span.append(createB);
      channel_li.append(create_div, create_span);
      if (channels_id === "Public") {

        document.getElementById("publicChannel").append(create_div, create_span);
        document.getElementById("publicChannel").id = channels_id;
        let publicUnicId = snapshot.child("unique_id").val();
        publicuniquieId.push(publicUnicId);
      } else {
        document.getElementById("channel-ul-container").append(channel_li); //container na kanały
      }




      // dolaczenie do kanau 
      const joinChannel = document.getElementById(channels_id);
      joinChannel.addEventListener("click", (e) => {
        document.getElementById("channels-container-id").classList.add("block-click");
        let targetClick = joinChannel.contains(e.target);

        if (targetClick === true) {
          let password_datbase = snapshot.child("ChannelPassword").val();
          let uniquieID = snapshot.child("unique_id").val();
          if (uniquieID === publicuniquieId[0]) {
            console.log("xd");
            loginToChannelPasswordForm.style.display = "none";
            joinError.style.display = "none";
          }
          form.style.display = "flex";
          login_photo.src = channels_img;
          login_name.innerHTML = channelsname;
          setTimeout(() => {
            form.style.opacity = 1;
          }, 500);

          let rtnIndOne = indexOne = 0;
          let rtnIndTwo = indexTwo = 1;
          clickEvent();

          // nr0 haslo, nr 1 unikalne id, nr 2 obrazek, nr 3 nazwa kanalu 4 channel boss 
          return passAndUniqId.push(password_datbase, uniquieID, channels_img, channelsname, channel_boss), rtnIndOne, rtnIndTwo, chan_icon.push(channel_icon);
        }


      })
    })
    //...
    // po dodaniu kanalu automatycznie zmienia obrazek na obrazek dodany przez uzytkownika
    channelsRef.on("child_changed", function (snapshot) {
      //  console.log(snapshot.val());

      let channel_img = snapshot.child("ChannelPhoto").val();
      let channels_id = snapshot.child("Channel_Id").val();
      let img_container = document.getElementById(channels_id).firstElementChild;
      // console.log(img_container);
      //  console.log(channels_id);
      //console.log(channel_img);
      let img_container2 = img_container.firstElementChild;
      img_container2.src = channel_img;
      //console.log(snapshot.val());



    })
    //logowanie do channelu
    btnJoin.addEventListener("click", () => {
      // console.log(passAndUniqId)
      let login_channelPassword = document.getElementById("login-to-channel-password").value;
      // console.log(passAndUniqId[0]);
      if (login_channelPassword === passAndUniqId[0]) {
        //   console.log(passAndUniqId[1])
        joinError.innerHTML = "The password provided is good."
        joinError.style.color = "white";
        let xd = 'Channels/' + passAndUniqId[1] + '/messages';
        let channel_online_users = 'Channels/' + passAndUniqId[1] + '/Users_on_channel';
        let channel_Number_Of_Post = 'Channels/' + passAndUniqId[1] + '/number_of_messages_sent';
        let channel_emoji = 'Channels/' + passAndUniqId[1];
        //dodanie uzytkownika do kanalu
        firebase.database().ref(channel_online_users).orderByChild("userId").equalTo(userId).once('value', function (snapshot) {
          //  console.log(snapshot.val());
          if (snapshot.val() === null) {
            console.log("ale bym sobie dodal");
            firebase.database().ref(channel_online_users).push({
              userId
            });
          } else if (snapshot.val() != null) {
            console.log("to sie zateguje");
          }

        })


        document.getElementById("login-to-channel-password").value = "";

        //console.log("its happening")

        setTimeout(() => {
          document.getElementById("lel").style.opacity = 1;
        }, 500);


        return pathChannel = xd, pathUsers = channel_online_users, pathEmoji = channel_emoji, pathNumbersOfPost = channel_Number_Of_Post, innerChannelSetting(), snapMessages(), joinPrivateAndPubChan(), cancelForm();
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
        document.getElementById("channels-container-id").classList.remove("block-click");
        joinError.innerHTML = "";
        document.getElementById("login-to-channel-password").value = "";
        loginToChannelPasswordForm.style.display = "block";
        joinError.style.display = "block";
        joinError.innerHTML = "";
      }, 1000);

      let rtnIndOne1 = indexOne = 3;
      let rtnIndTw2 = indexTwo = 0;
      clickEvent();
      return rtnIndOne1, rtnIndTw2, passAndUniqId = [];
    }


    // zamykanie ustawien kanalu

    const exitSettingChannel = document.getElementById("exit-button");
    exitSettingChannel.addEventListener("click", () => {
      console.log("working")
      const settingMain = document.getElementById("setting-main");
      settingMain.style.opacity = 0;
      setTimeout(() => {
        settingMain.style.display = "none";
      }, 1000)
    })

  

    // channel setting
    // otwieranie ustawien kanalu
    const channelSetting = document.getElementById("channel-setting-join");
    channelSetting.addEventListener("click", () => {
      console.log("working")
      const settingMain = document.getElementById("setting-main");
      settingMain.style.display = "flex";
      setTimeout(() => {
        settingMain.style.opacity = 1;
      }, 500)
    })
    // wyswietlanie informacji w setting kanalu oraz sprawdzanie czy jestes adminkiem zlotym kanału
    let idFromDatabaseswitch; // id bossa 
    let channelPassword_switch;
    let channeluniqIdSwitch;
    let whatWasChangeSwitch;
    let emojiSwitch;
    const buttonShowUserOnChannel = document.getElementById("btn-show-user-on-channel"); // btn pokazuje uzytkownikow na kanale
    const userOnChannelContainer = document.getElementById("userOnChannel_container"); //lista uzytkownikow na kanale
    function innerChannelSetting() {
      console.log(passAndUniqId);
      // console.log(xd);
      idFromDatabaseswitch = passAndUniqId[4];
      channelPassword_switch = passAndUniqId[0];
      channeluniqIdSwitch = passAndUniqId[1];
      console.log('xd');
      const emojiEventListener = document.getElementById("change-emoji");
      if (userId === passAndUniqId[4]) {
       //wysiwetlanie emotek
    firebase.database().ref('Emoji/').on("child_added", function (snapshot) {
      //  console.log(snapshot.val());
      let create_li = document.createElement("li");
      create_li.className = "li_emoji";
      create_li.append(snapshot.val());
      document.getElementById("emoji_list").append(create_li);
    })
        //testy
        console.log(passAndUniqId[4] + "bazadanych");

    
        let executed = false;
        const emoji_container = document.getElementById("choose-emoji");

        emojiEventListener.addEventListener("click", () => {
          console.log("test ile razy wyswietli");
          if (userId === idFromDatabaseswitch) {
       
            let theAbilityToThangeTheEmoticon = (function() {
          
              return function() {
                  if (!executed) {
                      executed = true;
                      // do something
                      let emoji = document.querySelectorAll(".li_emoji");
                      console.log(emoji.length);
                      for (let i = 0; i < emoji.length; i++) {
                        emoji[i].addEventListener("click", (event) => {
                          let emojiTarget = event.target;
                           console.log("test dwa ile razy");
                          let emojiContent = emojiTarget.innerText;
                          firebase.database().ref(pathEmoji).update({
                            icon: emojiContent
                          }).then(function () {
                            setTimeout(() => {
                              emoji_container.style.opacity = 0;
                            }, 500);
                            emoji_container.style.display = "none";
                          
                            return whatWasChangeSwitch = 0, emojiSwitch = emojiContent,  bot_BartekGivesInformation();
                          })
                        })
              
                      }
                  }
              };
          })();
         theAbilityToThangeTheEmoticon();



          
          
            emoji_container.style.display = "flex";
            setTimeout(() => {
              emoji_container.style.opacity = 1;
            }, 500);

            window.addEventListener("click", function (event) {
              let isClickInside = emojiEventListener.contains(event.target);
              if (isClickInside) {

              } else {
                emoji_container.style.display = "none";
                emoji_container.style.opacity = 0;

              }
            })
          }
        })
        //...

       
        
        //....
        const editChannelForm = document.getElementById("change-password-show-form");
        document.getElementById("change-password-buton-id").addEventListener("click", () => {
          editChannelForm.style.display = "flex";
          setTimeout(() => {
            buttonShowUserOnChannel.style.display = "none";
            userOnChannelContainer.style.display = "none";
            editChannelForm.style.opacity = 1;
          }, 500);
        });
        const buttonCancelEditPassword = document.getElementById("cancel-button-edit-password");
        buttonCancelEditPassword.addEventListener("click", () => {
          buttonShowUserOnChannel.style.display = "block";
          editChannelForm.style.opacity = 0;
          document.getElementById("old_password_input").value = "";
          document.getElementById("new_password_input").value = "";
          document.getElementById("repeat_new_password_input").value = "";
          infoAboutChangePassword.innerHTML = "";
          setTimeout(() => {
            editChannelForm.style.display = "none";
          }, 500);
        });
        const infoAboutChangePassword = document.getElementById("change_password_span");
        const changePasswordButton = document.getElementById("change-button-edit-password");
        changePasswordButton.addEventListener("click", () => {
          let oldPasswordFromDatabase = channelPassword_switch;
          console.log(oldPasswordFromDatabase);
          let oldPassword = document.getElementById("old_password_input").value;
          let newPassword = document.getElementById("new_password_input").value;
          let repeatNewPassword = document.getElementById("repeat_new_password_input").value;
          if (newPassword != repeatNewPassword) {
            infoAboutChangePassword.innerHTML = "The passwords are not the same.";
          } else if (oldPasswordFromDatabase != oldPassword) {
            infoAboutChangePassword.innerHTML = "The old password is incorrect.";
          } else if (newPassword < 1) {
            infoAboutChangePassword.innerHTML = "Enter the new password."
          } else if (newPassword === oldPasswordFromDatabase) {
            infoAboutChangePassword.innerHTML = "The old and new password is the same."
          } else {

            firebase.database().ref("Channels/" + channeluniqIdSwitch).update({
              ChannelPassword: newPassword
            }).then(() => {
              infoAboutChangePassword.innerHTML = "Password has been changed.";
              setTimeout(() => {
                editChannelForm.style.display = "none";
                buttonShowUserOnChannel.opacity = 0;
                buttonShowUserOnChannel.style.display = "block";
                infoAboutChangePassword.innerHTML = "";
                document.getElementById("old_password_input").value = "";
                document.getElementById("new_password_input").value = "";
                document.getElementById("repeat_new_password_input").value = "";

              }, 1000);
              return whatWasChangeSwitch = 1, bot_BartekGivesInformation();
            }).catch((error) => {
              infoAboutChangePassword.innerHTML = error.code;
            })
          }
        });
        // edycja obrazka kanału
        const imgChannel = document.getElementById("setting-picture"); // obrazek klikalny
        const buttonChangeImg = document.getElementById("change-picture-edit");
        const buttonChangeImgCancel = document.getElementById("cancel-picture-edit");
        // imgChannel.classList.add("edit_imageChannel");
        imgChannel.addEventListener("click", () => {
          if (userId === idFromDatabaseswitch) {
            document.getElementById("edit-container").style.display = "flex";
            document.getElementById("edit-container").style.opacity = 1;
          }
        });
        buttonChangeImgCancel.addEventListener("click", () => {
          document.getElementById("edit-container").style.display = "none";
          document.getElementById("edit-container").style.opacity = 0;
          document.getElementById("error-change-photo-on-channel").innerHTML = "";
          document.getElementById("input-change-photo-on-channel").value = "";
        });
        buttonChangeImg.addEventListener("click", () => {
          if (channelPhotoValChange === 1) {
            let file = document.getElementById("input-change-photo-on-channel").files[0];
            let reader = new FileReader();
            reader.onloadend = function (evt) {
              let blob = new Blob([evt.target.result], {
                type: "image/jpeg"
              });
              let storageRef = firebase.storage().ref("Channels/" + channeluniqIdSwitch + "/Channel_photo.jpg");
              storageRef.put(blob).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (url) {
                  let ur = url;
                  firebase.database().ref("Channels/" + channeluniqIdSwitch).update({
                    ChannelPhoto: ur // <- URL from uploaded photo.
                  }).then(function () {
                    document.getElementById("error-change-photo-on-channel").innerHTML = "Photo has been changed.";
                    setTimeout(() => {
                      document.getElementById("edit-container").style.display = "none";
                      document.getElementById("edit-container").style.opacity = 0;
                      document.getElementById("error-change-photo-on-channel").innerHTML = "";
                      document.getElementById("input-change-photo-on-channel").value = "";
                    }, 1000);
                    return whatWasChangeSwitch = 2, bot_BartekGivesInformation();
                  }).catch((err) => {
                    document.getElementById("error-change-photo-on-channel").innerHTML = err.code;
                  })
                  console.log("update");
                });
              });
            }
            reader.onerror = function (e) {
              console.log("Failed file read: " + e.toString());
            };
            reader.readAsArrayBuffer(file);
          } else {
            document.getElementById("error-change-photo-on-channel").innerHTML = "Choose a photo!";
          }
        });


        //ukrywanie szefa kanału
        document.getElementById("boss-container").style.display = "none";
        document.getElementById("change-password-container").style.display = "flex"; // 
        console.log("admin królu złoty :) ");
        document.getElementById("edit_button_setting").style.display = "block";

        
        ///wysyłanie informacji o zmianie
        
        function bot_BartekGivesInformation() {
          let infoWhatWasChange = whatWasChangeSwitch;
          let messages = "undefined";
          // 0emoji, 1password,2picture
          switch (infoWhatWasChange) {
            case 0:
              messages = "The administrator changed the emoji" + "  " + emojiSwitch + ".";
              break;
            case 1:
              messages = "The administrator changed the password.";
              break;
            case 2:
              messages = "The administrator changed the channel image.";
              break;

          }
          const today = new Date();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          firebase.database().ref().child("Channels/" + channeluniqIdSwitch + '/messages').push({
            Message: messages,
            user: "botBartek",
            time: time,
            date: date
          });
          console.log("added");
        };




      } else {
        document.getElementById("edit_button_setting").style.display = "none";
        document.getElementById("change-password-container").style.display = "none";
        document.getElementById("boss-container").style.display = "flex";



      }
      // wyswietlanie zdj kanalu i nazwy 
      document.getElementById("channel_photo").src = passAndUniqId[2];
      document.getElementById("setting-picture").src = passAndUniqId[2];
      document.getElementById("channel_name").innerHTML = passAndUniqId[3];
      document.getElementById("setting-channel-name").innerHTML = passAndUniqId[3];
      document.getElementById("send-icon").innerHTML = chan_icon[0]; // wyswietlanie iconki(domyslnie kciuka)
      document.getElementById("emoji_from_database").innerHTML = chan_icon[0];

      //szef kanalu
      const usersRef = firebase.database().ref('users/' + passAndUniqId[4]);
      usersRef.once('value', function (snapshot) {
        //let userId = snapshot.child("id").val();
        let userImg = snapshot.child("photoURL").val();
        let userNickName = snapshot.child("username").val();
        // let userEmail = snapshot.child("email").val();
        let userStatus = snapshot.child("status").val();
        document.getElementById("boss-picture").src = userImg;
        document.getElementById("boss-NickName").innerHTML = userNickName;
        document.getElementById("boss-status").innerHTML = userStatus;
      })
      /*  Wyswietlanie uzytkownikow na kanale */
      //console.log("czy to dziala wogole ?");

      firebase.database().ref(pathUsers).on("child_added", function (snapshot) {
        console.log(snapshot.val());
        let userOnChannel = snapshot.child("userId").val();

        let userImg = "undefined";
        let userNickName = "undefined";
        let userStatus = "undefined";
        let userDatabaseId = "undefined";

        firebase.database().ref("users/" + userOnChannel).on("value", function (snapshot) {
          let userImgUser = snapshot.child("photoURL").val();
          let userNickNameUser = snapshot.child("username").val();
          let userStatusUser = snapshot.child("status").val();
          let userDatabaseIdUser = snapshot.child("id").val();
          return userImg = userImgUser, userNickName = userNickNameUser, userStatus = userStatusUser, userDatabaseId = userDatabaseIdUser;
        })


        if (userArray[3] === userDatabaseId) {
          //  console.log("i cyk dziala i nie wyswietla")

        } else {
          // console.log(userImg);
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
          createSpanThree.className = "span-status";
          createSpanThree.append(userStatus);
          createDivTwo.append(createSpanTwo, createSpanThree)
          createDiv.append(createSpanOne, createDivTwo);
          let createDivThree = document.createElement("div");
          createDivThree.className = "button-container";
          let createButton = document.createElement("button");
          createButton.id = userDatabaseId;
          createButton.className = "add_firend_button";
          createButton.innerHTML = '<i class="fa fa-plus"></i>' + "Add friend";
          createDivThree.append(createButton);
          createLi.append(createImg, createDiv, createDivThree);
          document.getElementById("ul-listOf-userOnChannel").append(createLi);

        }

      })
      //zmiana w czasie rzeczywistym danych  o kanale

      console.log(channeluniqIdSwitch);
      firebase.database().ref("Channels/").orderByChild("unique_id").equalTo(channeluniqIdSwitch).on("child_changed", function (snapshot) {

        let emojiChange = snapshot.child("icon").val();
        let imgChange = snapshot.child("ChannelPhoto").val();
        //  console.log(emojiChange);
        document.getElementById("channel_photo").src = imgChange;
        document.getElementById("setting-picture").src = imgChange;
        document.getElementById("send-icon").innerHTML = emojiChange;
        document.getElementById("emoji_from_database").innerHTML = emojiChange;
      });
    }

 //wysyłanie informacji o zmianie






 




    // pokazywanie uzytkownikow na kanale 

    let switchShowUserOnChannel = 1;
    buttonShowUserOnChannel.addEventListener("click", () => {
      if (switchShowUserOnChannel === 1) {
        userOnChannelContainer.style.display = "block";
        return switchShowUserOnChannel = 2;
      } else if (switchShowUserOnChannel === 2) {
        userOnChannelContainer.style.display = "none";
        return switchShowUserOnChannel = 1;
      }



    })



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
                document.getElementById("channels-container-id").classList.remove("block-click");
                loginToChannelPasswordForm.style.display = "block";
                joinError.style.display = "block";
                joinError.innerHTML = "";
              }, 1000);


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
    loginUserRef.on("value", function (snap) {
      let userId = snap.child("id").val();
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
    UsStatus.addEventListener('change', () => {
      let stat = "★ Online";
      let val = document.getElementById("select_status_Id").value;
      switch (val) {
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
        status: stat
      });
    })

    
    // wyswietlanie uzytkownikow na na glownej
    const usersRef = firebase.database().ref('users');
  usersRef.on('child_added', function (snapshot) {
      let userImg = snapshot.child("photoURL").val();
      let userNickName = snapshot.child("username").val();
      let userStatus = snapshot.child("status").val();
      let userDatabaseId = snapshot.child("id").val();
      if (userArray[3] === userDatabaseId) {
      } else if(userDatabaseId === "bot") {
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
        createSpanThree.className = "span-status";
        createSpanThree.append(userStatus);
        createDivTwo.append(createSpanTwo, createSpanThree)
        createDiv.append(createSpanOne, createDivTwo);
        let createDivThree = document.createElement("div");
        createDivThree.className = "button-container";
        let createButton = document.createElement("button");
        createButton.id = userDatabaseId;
        createButton.className = "add_firend_button";
        createButton.innerHTML = '<i class="fa fa-commenting-o" aria-hidden="true"></i>' + "Priv";
        createDivThree.append(createButton);
        createLi.append(createImg, createDiv, createDivThree);
        document.getElementById("usersOnlineId").append(createLi)

      }


    })



 //wysylanie prywatnych wiadomosci
 /*
 function privateMessages(){
   
  let button_Priv = document.querySelectorAll(".button-container");
  console.log(button_Priv.length);
  for(let i = 0; i < button_Priv.length; i++){
    button_Priv[i].addEventListener("click", () =>{
console.log("działa");
    })
  }
 }
 */
let arrayPrivateMessage = new Array;
window.addEventListener("click", (e) =>{
  arrayPrivateMessage = [];
  let isClickInside = event.target.classList.contains("add_firend_button");
  if(isClickInside){
    let idUser = e.target.id;
    console.log(idUser);
  
// dodawanie nowego

    firebase.database().ref("users/").orderByChild("id").equalTo(idUser).once('value', function (snapshot) {
       console.log(snapshot.val());
       let key = Object.keys(snapshot.val())[0];
       console.log(key);
       firebase.database().ref("usersPrivateMessages/"+ key + userId).once("value", function(snapshot){
     //   console.log(snapshot.val())
        if(snapshot.val() === null){
          //zero nie ma czegos takiego
          firebase.database().ref("usersPrivateMessages/"+ userId + key).once("value", function(snapshot){
            // console.log(snapshot.val());
             if(snapshot.val() === null){
               //znow nie ma, tym razem informuje nas o tym
               console.log("zero2");
               const notfound = false;
               return arrayPrivateMessage.push(notfound, key),  addingUsersPrivate();
             }else if(snapshot.val() != null){
               // no i jest 
               console.log("coś jest2");
               const userKey = userId + key;
               return arrayPrivateMessage.push(userKey),  joinPrivateAndPubChan(),snapPrivateMessages();
             }
            
           })
        }else if(snapshot.val() != null){
          //jest elegancko podaje 
          console.log("coś jest");
         const userKey = key + userId;
          return arrayPrivateMessage.push(userKey),  joinPrivateAndPubChan(),snapPrivateMessages();
        }
  
      })
  }) 

  }
  console.log(isClickInside);
})
function addingUsersPrivate(){
  //false dodaje do bazy danych
  // w przeciwnym razie pobiera wiadomosci z juz istniejacej
  if(arrayPrivateMessage[0] === false){
  console.log(arrayPrivateMessage);
  let users = userId + arrayPrivateMessage[1]
  firebase.database().ref('usersPrivateMessages/'+ users  ).set({
    userOne: arrayPrivateMessage[1],
    userTwo: userId,
    icon: "👍"
   }).then( () =>{
     console.log("added");
     arrayPrivateMessage = [];
   return arrayPrivateMessage.push(users),  joinPrivateAndPubChan(), snapPrivateMessages();
   }).catch( (err) =>{
     console.log(err);
   })

  }
}
// prywatne wiadomosci 
function snapPrivateMessages(){
  chan_icon = [];
  firebase.database().ref("usersPrivateMessages/" + arrayPrivateMessage[0]).once("value", function(snapshot){
    console.log(snapshot.val());
    let userOne = snapshot.child("userOne").val();
    let userTwo = snapshot.child("userTwo").val();
    let usersIcon = snapshot.child("icon").val();
    document.getElementById("send-icon").innerHTML = usersIcon;
    let whichUser;
    if(userOne != userId){
      whichUser = userOne;
    }else if(userTwo != userId){
        whichUser = userTwo;
    }
    firebase.database().ref("users/" + whichUser).once("value", function(snapshot){
      console.log(snapshot.val());
      let userImgPrivate = snapshot.child("photoURL").val();
      let userNamePrivate = snapshot.child("username").val();
      let userStatusPrivate = snapshot.child("status").val();
      document.getElementById("channel_photo").src = userImgPrivate;
      document.getElementById("channel_name").innerHTML = userNamePrivate;
    })
    console.log("czy xd ?");
    setTimeout(() => {
      document.getElementById("lel").style.opacity = 1;
    }, 500);
    return pathChannel = "usersPrivateMessages/" + arrayPrivateMessage[0] + '/messages' , chan_icon.push(usersIcon), snapMessages();
  })
      
}


    //mechanika
    //wylogowanie

    logOutButton.addEventListener("click", () => {
      logOutThinks();
      firebase.auth().signOut();
      location.reload();
    })


    function logOutThinks() {
      channel_container.style.transform = "initial";
      messenger.style.transform = "initial";
      user_profile_container.style.transform = "initial";
      setTimeout(() => {
        messenger.style.display = "none";
        messenger.style.opacity = 0;
        containerMessPage.style.width = 200 + "%";
        messenger.style.width = 0 + "%";
      }, 1000);
      publicChannelNumber = 1;
      return publicChannelNumber;
    }

    function joinPrivateAndPubChan() {
 
      containerMessPage.style.width = 300 + "%";
      channel_container.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
      messenger.style.transform = ("translate", "translate3d(-" + 100 + "%,0,0)");
      user_profile_container.style.transform = ("translate", "translate3d(+" + 100 + "%,0,0)");
      messenger.style.width = 100 + "%";
      messenger.style.display = "flex";
      publicChannelNumber = 2;
      messenger.style.opacity = 1;
      setTimeout(() => {
        document.getElementById('list').scrollIntoView({
          //  behavior: 'smooth',
          block: 'end'
        });
      }, 500);
      console.log("tes");

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
      document.getElementById("list").innerHTML = "";
      document.getElementById("ul-listOf-userOnChannel").innerHTML = "";
      document.getElementById("userOnChannel_container").style.display = "none";
      document.getElementById("emoji_list").innerHTML = "";
      logOutThinks();
      console.log("xd");
      document.getElementById("lel").style.opacity = 0;
      document.getElementById("change-password-show-form").style.display = "none"; //
      document.getElementById("change-password-show-form").style.opacity = 0; // tu i wyzej zamyka form do zmiany hasla
      document.getElementById("btn-show-user-on-channel").style.display = "block"; // po powrocie pokazuje znow przycisk
      return firebase.database().ref(pathChannel).off("child_added"),  firebase.database().ref('Emoji/').off("child_added"), pathChannel = "undefined", pathEmoji = "undefined", pathUsers = "undefined", pathNumbersOfPost = "undefined", switchShowUserOnChannel = 1, passAndUniqId = [], chan_icon = [];
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
    const createChannel_form = document.getElementById("create-channel_id"); //przycisk do  tworzenia kanału
    createChannel_form.addEventListener("click", () => {

      createForm.style.display = "block";
      setTimeout(() => {
        createForm.style.opacity = 1;
      }, 1000);
    })
    const cancelCreate_form = document.getElementById("button-cancel_id"); // przycisk anulacji tworzenia kanału
    cancelCreate_form.addEventListener("click", () => {
      createForm.style.opacity = 0;
      setTimeout(() => {
        createForm.style.display = "none";
      }, 1500);
    })
    // wyswietlanie wiadomosci kanalu


    function snapMessages() {
      let messageRef = firebase.database().ref(pathChannel);
      messageRef.on('child_added', function (snapshot) {
        //    console.log(snapshot.val());
        let userInfo_photo = "undefined";
        let userInfo_NickName = "undefined";
        let user = snapshot.child("user").val();
        // console.log(user);
        let message_value = snapshot.child("Message").val();
        let time = snapshot.child("time").val();
        let date = snapshot.child("date").val();
        firebase.database().ref("users/" + user).once("value", function (snapshot) {
          let photo_value = snapshot.child("photoURL").val();
          let nickName_value = snapshot.child("username").val();
          //    console.log(snapshot.val())
          return userInfo_NickName = nickName_value, userInfo_photo = photo_value;
        })
        let createLi = document.createElement("li");
        createLi.className = "Message-list";
        let createSpan = document.createElement("span");
        let createDiv = document.createElement("div");
        let createImg = document.createElement("img");
        let createThirdDiv = document.createElement("div");
        let createB3 = document.createElement("b");
        createThirdDiv.className = "date_hours"
        createThirdDiv.append("Date: " + date + " " + "Time: " + time);
        let createDivSecont = document.createElement("div");
        createDivSecont.className = "li_div_message-text"
        createDivSecont.innerHTML = message_value;
        createDiv.className = "li_div";
        createDiv.append(createImg, createDivSecont);
        createB3.append(userInfo_NickName);
        createSpan.append(createB3);
        createImg.src = userInfo_photo;
        createLi.append(createSpan, createDiv, createThirdDiv);
        if (user === "botBartek") {
          createB3.className = "botName";
          createDivSecont.className = "li_div_message-text botMessage";
        }
        document.getElementById("list").append(createLi);
        scrollBottomArrow();
        //   console.log(snapshot.val());

        // let nickName_value = snapshot.child("Nickname").val();
        //  let photo_value = snapshot.child("Photo").val();

        // console.log(photo_value);


      });



      //  let user = snapshot.child("user").val();
      // console.log(user);
      //   let message_value = snapshot.child("Message").val();
      //  let time = snapshot.child("time").val();
      //  let date = snapshot.child("date").val();
      // firebase.database().ref("users/" + user).once("value", function (snapshot) {
      // let photo_value = snapshot.child("photoURL").val();
      // let nickName_value = snapshot.child("username").val();
      //    console.log(snapshot.val())
      // return userInfo_NickName = nickName_value, userInfo_photo = photo_value;
      // })

      //  messageRefa.off("value");




    }







    //testy

    let switchSendMessage = "undefined";


    const send_icon = document.getElementById("send-icon");
    send_icon.addEventListener("click", () => {
      console.log(chan_icon[0]);
      return switchSendMessage = chan_icon[0], sendMessageOrIcon();

    })

    const send_message = document.getElementById("send-message");
    send_message.addEventListener("click", () => {
      const text_area = document.getElementById("messenger_text_area").value;
      return switchSendMessage = text_area, sendMessageOrIcon();
    })


    function sendMessageOrIcon() {
      //czyszczenie pola do wysylania
      document.getElementById("messenger_text_area").value = ""
      clearMessagefield();

      // wysylanie wiadomosci
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      firebase.database().ref().child(pathChannel).push({
        Message: switchSendMessage,
        user: userId,
        time: time,
        date: date
      });
      // 0 = userImg, 1 = userNickName, 2 = user-mail, 3 = userID
      numbersOfMessagesCount();

    }
    // liczenie postow na kanale
    function numbersOfMessagesCount() {
      const numbersRef = firebase.database().ref(pathNumbersOfPost);
      numbersRef.once("value", function (snapshot) {
        let numberPost = snapshot.child("numberSend").val();
        numberPost++;
        numbersRef.update({
          numberSend: numberPost
        });
      })
    }

    window.addEventListener("keyup", clearMessagefield);

    function clearMessagefield() {
      const area_text = document.getElementById("messenger_text_area").value;
      if (area_text == "" || area_text.length == 0) {
        // icon
        document.getElementById("send-icon").style.display = "block";
        document.getElementById("send-message").style.display = "none";

      } else {
        // send
        document.getElementById("send-icon").style.display = "none";
        document.getElementById("send-message").style.display = "block";
      }
      scrollbottom();
    }

    //scroll testy
    //szczaleczka nie chcemy zeby podczas przegladania ciagle nam scrollowalo
    const arrScroll = document.getElementById("arrowScroll");
    arrScroll.addEventListener("click", () => {
      scrollbottom();
      document.getElementById("newMessagesAlertId").style.display = "none";
    })
    let testswitch = 0;

    let containerUlList = document.getElementById("lel");
    containerUlList.addEventListener("scroll", function (event) {
      let scroll = this.scrollTop;
      let listUlWithAllMessages = document.getElementById("list");
      let listUlWithAllMessagesHeight = listUlWithAllMessages.offsetHeight; //wysokosc calej listy
      let containerOfListUlHeight = containerUlList.offsetHeight; // wysokosc jednego okna
      if (listUlWithAllMessagesHeight - containerOfListUlHeight > scroll + containerOfListUlHeight) {
        arrScroll.style.display = "flex";
      } else if (listUlWithAllMessagesHeight === scroll + containerOfListUlHeight) {
        document.getElementById("newMessagesAlertId").style.display = "none";
      } else {
        arrScroll.style.display = "none";

      }

      return testswitch = scroll;

    });

    function scrollBottomArrow() {
      let listUlWithAllMessages = document.getElementById("list");
      let listUlWithAllMessagesHeight = listUlWithAllMessages.offsetHeight; //wysokosc calej listy
      let containerOfListUlHeight = containerUlList.offsetHeight; // wysokosc jednego okna
      let positionOfScroll = testswitch; // wysokosc scrolla
      if (listUlWithAllMessagesHeight - containerOfListUlHeight < positionOfScroll + containerOfListUlHeight) {
        console.log("jestes na dole i dostaniesz scrolla do nastepnej wiadomosci");
        scrollbottom();
      } else if (containerOfListUlHeight < listUlWithAllMessagesHeight) {
        console.log("new message");
        console.log(containerOfListUlHeight);
        console.log(listUlWithAllMessagesHeight);
        document.getElementById("newMessagesAlertId").style.display = "flex";
      }
    }
    // scrollowanie do ostatniej wiadomosci 
    function scrollbottom() {
      document.getElementById('list').scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
    // po klikniecie w inputa scrolluje
    document.getElementById("messenger_text_area").addEventListener("focus", () => {
      setTimeout(() => {
        scrollbottom();
      }, 500);

      console.log("dziala");

    });






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

    let errorCode = error.code;
    let errorMessage = error.message;
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
      let errorCode = error.code;
      let errorMessage = error.message;
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
//zmiana zdj na kanale
function channelPChange() {
  let channel_photo = document.getElementById("input-change-photo-on-channel").value;
  let error_message = document.getElementById("error-change-photo-on-channel");
  let idxDot = channel_photo.lastIndexOf(".") + 1;
  let extFile = channel_photo.substr(idxDot, channel_photo.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO

    error_message.innerHTML = "The picture has a good format.";
    error_message.style.color = "white";
    let numbChange = channelPhotoValChange = 1;
    return numbChange;
  } else {

    error_message.innerHTML = "The picture has a bad format.";
    error_message.style.color = "crimson";
    let numbChange = channelPhotoValChange = 0;
    return numbChange;
  }
}