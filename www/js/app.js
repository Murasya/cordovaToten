// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBida9QeFpWHZcexb8Wby3XYRMCNib-BaY",
  authDomain: "noteapp-90076.firebaseapp.com",
  databaseURL: "https://noteapp-90076.firebaseio.com",
  projectId: "noteapp-90076",
  storageBucket: "noteapp-90076.appspot.com",
  messagingSenderId: "880930415021",
  appId: "1:880930415021:web:b8b953caf0be5d7fba8124",
  measurementId: "G-7XR2D45DM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

localStorage.setItem("tutorial_finished", true);

function QAndA(
  questions=[],
  answers=[],
  tags=[],
  uid="",
  public=false,
  memo="",
  timestamp=firebase.firestore.FieldValue.serverTimestamp(),
  complete=false,
  category=[],
  success="",
  id="",
  color="",
) {
  this.questions = questions;
  this.answers = answers;
  this.tags = tags;
  this.uid = uid;
  this.public = public;
  this.memo = memo;
  this.timestamp = timestamp;
  this.complete = complete;
  this.category = category;
  this.success = success;
  this.id = id;
  this.color = color;
}

function User(
  uid="",
  email="",
  birthday=new Date(),
  sex="",
  occupation="",
) {
  this.uid = uid;
  this.email = email;
  this.birthday = birthday;
  this.sex = sex;
  this.occupation = occupation;
}

function setNewData(qAndA) {
  var id = "";
  db.collection("questionAndAnswer").add({
    questions: qAndA.questions,
    answers: qAndA.answers,
    tags: qAndA.tags,
    uid: qAndA.uid,
    public: qAndA.public,
    memo: qAndA.memo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    complete: qAndA.complete,
    category: qAndA.category,
    success: qAndA.success,
    color: qAndA.color,
  }).then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
    id = docRef.id;
    localStorage.setItem("documentID", id);
  }).catch(function(error) {
    console.log('Error adding document: ', error);
    id = error;
  });
  return id;
}

// function getQuestionAndAnswer(limit = 100) {
//   var user = firebase.auth().currentUser;
//   var array = [];
//   console.log("startQandA");
//   db.collection("questionAndAnswer")
//     .where("uid", "==", user.uid)
//     .where("complete", "==", true)
//     .orderBy("timestamp", "desc")
//     .limit(limit)
//     .get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         var qAndA = new QAndA(
//           doc.data().questions,
//           doc.data().answers,
//           doc.data().tags,
//           doc.data().uid,
//           doc.data().public,
//           doc.data().memo,
//           doc.data().timestamp.toDate(),
//           doc.data().complete,
//           doc.data().category,
//           doc.data().success,
//           doc.id,
//         );
//         array.push(qAndA);
//       });
//   });
//   console.log(array);
//   return array;
// }

// エラーハンドリングの追加（動くかはわからん...）
function getQuestionAndAnswer(limit = 100) {
  var user = firebase.auth().currentUser;
  var array = [];
  console.log("startQandA");
  db.collection("questionAndAnswer")
    .where("uid", "==", user.uid)
    .where("complete", "==", true)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = new QAndA(
          doc.data().questions,
          doc.data().answers,
          doc.data().tags,
          doc.data().uid,
          doc.data().public,
          doc.data().memo,
          doc.data().timestamp.toDate(),
          doc.data().complete,
          doc.data().category,
          doc.data().success,
          doc.id,
          doc.data().color,
        );
        array.push(qAndA);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  console.log(array);
  return array;
}

function updateData(qAndA) {
  db.collection("questionAndAnswer").doc(qAndA.id).set({
    questions: qAndA.questions,
    answers: qAndA.answers,
    tags: qAndA.tags,
    uid: qAndA.uid,
    public: qAndA.public,
    memo: qAndA.memo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    complete: qAndA.complete,
    category: qAndA.category,
    success: qAndA.success,
    color: qAndA.color,
  }).then(function() {
    console.log("Document successfully updated!");
  });
}

function getIncomplete() {
  var user = firebase.auth().currentUser;
  var array = [];
  db.collection("questionAndAnswer")
    .where("uid", "==", user.uid)
    .where("complete", "==", false)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = new QAndA(
          doc.data().questions,
          doc.data().answers,
          doc.data().tags,
          doc.data().uid,
          doc.data().public,
          doc.data().memo,
          doc.data().timestamp.toDate(),
          doc.data().complete,
          doc.data().category,
          doc.data().success,
          doc.id,
          doc.data().color,
        );
        array.push(qAndA);
      });
  });
  return array;
}

function deleteData(id) {
  db.collection("questionAndAnswer").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.log("Error removing document: ", error);
  });
}

function createFeedback(text) {
  var user = firebase.auth().currentUser;
  console.log("HOGE");
  db.collection("feedback").add({
    uid: user.uid,
    text: text,
  }).then(function(doc) {
    console.log('Document written with ID: ', doc.id);
  }).catch(function(error) {
    console.log('Error adding document: ', error);
  });
}

function setNewUser(user) {
  db.collection("user").add({
    uid: user.uid,
    email: user.email,
    sex: user.sex,
    occupation: user.occupation,
    birthday: user.birthday,
  }).then(function(doc) {
    console.log('Document written with ID: ', doc.id);
  }).catch(function(error) {
    console.log('Error adding document: ', error);
  });
}

Vue.component("skip-modal", {
  template: `
    <div class="skip_modal" @click="$emit('close')">
      <h1>本当にスキップしますか？</h1>
      <span>このアプリについて理解するため、<br>チュートリアルの実施を推奨しています。</span>
      <div>
        <button class="yes" @click="goNext">はい</button>
        <button class="no" @click="$emit('close')">いいえ</button>
      </div>
    </div>
  `,
  methods: {
    goNext: function() {
      localStorage.setItem('tutorial_finished', true);
      document.getElementById("myNavigator").pushPage("check_tutorial.html");
    }
  }
});

var toolbar_active = 1;
Vue.component("my-toolbar", {
  template: `
    <div class="my-toolbar">
      <div class="my-toolbar__list">
        <div :class="homeItem" @click="goHome">
          <img class="my-toolbar__logo" src="images/タブバー_新アイコン/home_アイコン.png" height="30px"></img>
          <span :class="homeClass">ホーム</span>
        </div>
        <div :class="analyzeItem" @click="goAnalyze">
          <img class="my-toolbar__logo" src="images/タブバー_新アイコン/analysis_アイコン.png" height="30px"></img>
          <span :class="analyzeClass">分析</span>
        </div>
        <div :class="arcItem" @click="goArchive">
          <img class="my-toolbar__logo" src="images/タブバー_新アイコン/archives_アイコン.png" height="30px"></img>
          <span :class="arcClass">アーカイブ</span>
        </div>
      </div>
    </div>
  `,
  methods: {
    goAnalyze: function() {
      toolbar_active = 0;
      document.getElementById("myNavigator").resetToPage("category.html");
    },
    goHome: function() {
      toolbar_active = 1;
      document.getElementById("myNavigator").resetToPage("index.html");
    },
    goArchive: function() {
      toolbar_active = 2;
      document.getElementById("myNavigator").resetToPage("myRecode.html");
    },
  },
  computed: {
    analyzeClass: function() {
      return {
        'my-toolbar__title': toolbar_active != 0,
        'my-toolbar__title--active': toolbar_active == 0,
      }
    },
    homeClass: function() {
      return {
        'my-toolbar__title': toolbar_active != 1,
        'my-toolbar__title--active': toolbar_active == 1,
      }
    },
    arcClass: function() {
      return {
        'my-toolbar__title': toolbar_active != 2,
        'my-toolbar__title--active': toolbar_active == 2,
      }
    },
    analyzeItem: function() {
      return {
        'my-toolbar__item': toolbar_active != 0,
        'my-toolbar__item--active': toolbar_active == 0,
      }
    },
    homeItem: function() {
      return {
        'my-toolbar__item': toolbar_active != 1,
        'my-toolbar__item--active': toolbar_active == 1,
      }
    },
    arcItem: function() {
      return {
        'my-toolbar__item': toolbar_active != 2,
        'my-toolbar__item--active': toolbar_active == 2,
      }
    },
  }
});


// admob
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-8657757436017103/9164014047',
        interstitial: 'ca-app-pub-8657757436017103/7896320985',
        rewardvideo: '',
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-8657757436017103/4710791389',
        interstitial: 'ca-app-pub-8657757436017103/8342914632',
        rewardvideo: '',
    };
} else {
    admobid = { // for Windows Phone
        banner: '',
        interstitial: '',
        rewardvideo: '',
    };
}

function initialization() {
  if(typeof admob === 'undefined') {
    console.log("admob undefined");
    return ;
  }

  admob.banner.config({
    id: admobid.banner,
    bannerAtTop: true,
    isTesting: false,
    autoShow: false,
  });
  admob.banner.prepare();

  admob.interstitial.config({
    id: admobid.interstitial,
    isTesting: false,
    autoShow: false,
  });
  admob.interstitial.prepare();
  document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
    console.log("LOAD_FAIL banner", event)
  })

  document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
    console.log("LOAD_FAIL interstitial", event)
  })

  document.addEventListener('admob.interstitial.events.LOAD', function(event) {
    console.log("LOAD", event)
  })

  document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
    console.log("CLOSE", event)

    admob.interstitial.prepare()
  })
}
initialization();

function sBanner() {
  if(typeof admob === 'undefined') return;
  admob.banner.show();
}
function hBanner() {
  if(typeof admob === 'undefined') return;
  admob.banner.hide();
}
function sInt() {
  if(typeof admob === 'undefined') return;
  admob.interstitial.show();
}

function openUrl(url, readerMode) {
  SafariViewController.isAvailable(function (available) {
    if (available) {
      SafariViewController.show({
            url: url,
            hidden: false, // default false
            animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
            transition: 'curl', // unless animated is false you can choose from: curl, flip, fade, slide (default)
            enterReaderModeIfAvailable: readerMode, // default false
            barColor: "#0000ff", // default is white (iOS 10 only)
            tintColor: "#ffffff" // default is ios blue
          },
          function(result) {
            if (result.event === 'opened') {
              console.log('opened');
            } else if (result.event === 'loaded') {
              console.log('loaded');
//                SafariViewController.hide();
            } else if (result.event === 'closed') {
              console.log('closed');
            }
          },
          function(msg) {
            console.log("KO: " + JSON.stringify(msg));
          })
    } else {
      // potentially powered by InAppBrowser because that (currently) clobbers window.open
      window.open(url /*, '_blank', 'location=yes'*/);
    }
  })
}

function dismissSafari() {
  SafariViewController.hide()
}

// キーボードで画面が隠れないようにする
// //メイン画面の高さ
// if( /(android)/i.test(navigator.userAgent) ) {
//   let original_main_height = 0;

//   document.addEventListener('show', function(event) {
//     //メイン画面の高さを取得
//     let main = document.querySelector('.page__content');
//     original_main_height = main.clientHeight;
//   });

//   //ソフトウェアキーボード表示処理
//   window.addEventListener('keyboardWillShow', (event) => {
//     //画面の高さをキーボードの高さを差し引いた値とする
//     let main = document.querySelector('.page__content');
//     main.style = 'height: ' + (original_main_height - event.keyboardHeight) + 'px;';
//   });

//   //ソフトウェアキーボード非表示処理
//   window.addEventListener('keyboardWillHide', () => {
//     //画面の高さを元の高さに戻す
//     let main = document.querySelector('.page__content');
//     main.style = 'height: ' + original_main_height + 'px;';
//   });
// }