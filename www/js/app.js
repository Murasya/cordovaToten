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


// firebase ui
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      ons.notification.toast('ログイン成功', { timeout: 1000, animation: 'fall'});
      return true;
    },
    signInSuccessUrl: "https://www.google.com",
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    }
  ],
};

// database
var db = firebase.firestore();
localStorage.setItem("tutorial_finished", true);

class QAndA {
  constructor(questions=[], answers=[], tags=[], uid="", memo="", timestamp=new Date(), complete=false, category="", success="", id="", color="") {
    this.questions = questions;
    this.answers = answers;
    this.tags = tags;
    this.uid = uid;
    this.memo = memo;
    this.timestamp = timestamp;
    this.complete = complete;
    this.category = category;
    this.success = success;
    this.id = id;
    this.color = color;
  }
  toString() {
    return this.answers[0];
  }
}
var qAndAConverter = {
  toFirestore: function(qAndA) {
    return {
      questions: qAndA.questions,
      answers: qAndA.answers,
      tags: qAndA.tags,
      uid: firebase.auth().currentUser.uid,
      memo: qAndA.memo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      complete: qAndA.complete,
      category: qAndA.category,
      success: qAndA.success,
      color: qAndA.color,
    };
  },
  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new QAndA(
      data.questions, 
      data.answers,
      data.tags,
      data.uid,
      data.memo,
      data.timestamp.toDate(),
      data.complete,
      data.category,
      data.success,
      id,
      data.color
    );
  }
}
function User(
  uid="", // String
  email="", // String
  birthday=new Date(),  // Date
  sex="", // String
  occupation="",  // String
  isResearchAccept=false, // boolean
) {
  this.uid = uid;
  this.email = email;
  this.birthday = birthday;
  this.sex = sex;
  this.occupation = occupation;
  this.isResearchAccept = isResearchAccept;
}
class WellPoint {
  constructor(id="", analyzeid="", contents=[{header:"",content1:"Empty",content2:"",content3:""}], useNumber=-1) {
    this.id = id;
    this.analyzeid = analyzeid;
    this.contents = contents;
    this.useNumber = useNumber;
  }
  toString() {
    var str = "";
    this.contents.forEach((v, i) => {
      str = str + v.header + ':' + v.content1 +','+ v.content2 +','+ v.content3 + "--";
    })
    return this.id + "--" + this.analyzeid + "--" + str + this.useNumber;
  }
}
var wellPointConverter = {
  toFirestore: function(wp) {
    return {
      analyzeid: wp.analyzeid,
      contents: wp.contents,
      useNumber: wp.useNumber
    };
  },
  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new WellPoint(
      id,
      data.analyzeid,
      data.contents,
      data.useNumber,
    );
  }
}
class MyEvent{
  constructor(id="", analyzeid="", title="No title", color="", when="empty", where="empty", who="empty", what="empty", how="empty", uid="", timestamp=new Date()) {
    this.id = id;
    this.analyzeid = analyzeid;
    this.title = title;
    this.color = color;
    this.when = when;
    this.where = where;
    this.who = who;
    this.what = what;
    this.how = how;
    this.uid = uid;
    this.timestamp = timestamp;
  }
  toString() {
    return this.id + '--' + this.analyzeid + '--' + this.title + '--' + this.color + '--' + this.when + '--' + this.where + '--' + this.who + '--' + this.what + '--' + this.how + '--' + this.uid + '--' + this.timestamp;
  }
}
var myEventConverter = {
  toFirestore: function(event) {
    return {
      analyzeid: event.analyzeid,
      title: event.title,
      color: event.color,
      when: event.when,
      where: event.where,
      who: event.who,
      what: event.what,
      how: event.how,
      uid: firebase.auth().currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new MyEvent(
      id,
      data.analyzeid,
      data.title,
      data.color,
      data.when,
      data.where,
      data.who,
      data.what,
      data.how,
      data.uid,
      data.timestamp.toDate(),
    );
  }
}
class Consideration {
  constructor(id="", analyzeid="", contents=[]) {
    this.id = id;
    this.analyzeid = analyzeid;
    this.contents = contents;
  }
  toString() {
    var str = "";
    this.contents.forEach((v, i) => {
      str = str + v + ':';
    });
    return this.id + '--' + this.analyzeid + '--' + str;
  }
}
var considerationConverter = {
  toFirestore: function(c) {
    return {
      analyzeid: c.analyzeid,
      contents: c.contents,
    };
  },
  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new Consideration(
      id,
      data.analyzeid,
      data.contents,
    );
  }
}
class Gakuchika {
  constructor(id="", analyzeid="", title="", color="", contents=["","","","",""], uid="", timestamp=new Date()) {
    this.id = id;
    this.analyzeid = analyzeid;
    this.title = title;
    this.color = color;
    this.contents = contents;
    this.uid = uid;
    this.timestamp = timestamp;
  }
  toString() {
    var str = "";
    this.contents.forEach((v, i) => {
      str = str + v + ":";
    });
    return this.id + '--' + this.analyzeid + '--' + this.title + '--' + this.color + '--' + str + this.uid + this.timestamp;
  }
}
var gakuchikaConverter = {
  toFirestore: function(gakuchika) {
    return {
      analyzeid: gakuchika.analyzeid,
      title: gakuchika.title,
      color: gakuchika.color,
      contents: gakuchika.contents,
      uid: gakuchika.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
  fromFirestore: function(snapshot, options) {
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new Gakuchika(
      id,
      data.analyzeid,
      data.title,
      data.color,
      data.contents,
      data.uid,
      data.timestamp.toDate(),
    );
  }
}

// Gakuchika
// 新規データ
function setNewGakuchika(gakuchika) {
  var id = "";
  console.log(gakuchika.toString());
  db.collection("gakuchika").withConverter(gakuchikaConverter).add(gakuchika).then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
    id = docRef.id;
  }).catch(function(error) {
    console.log('Error adding document: ', error);
    id = error;
  });
  return id;
}
// データ更新
function updateGakuchika(gakuchika, func=function(){}) {
  db.collection("consideration").doc(gakuchika.id).withConverter(gakuchikaConverter).set(gakuchika).then(function() {
    console.log("Document successfully updated!");
    func();
  });
}
// 自分のデータ全て
function getGakuchika() {
  var array = [];
  var user = firebase.auth().currentUser;
  db.collection("gakuchika")
    .withConverter(gakuchikaConverter)
    .where("uid", "==", user.uid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var gakuchika = doc.data();
        array.push(gakuchika);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}
// 分析のidから関連するものを取ってくる(arrayだけど最初の１つだけ使用)
function getGakuchikaFromAnalyzeid(analyzeid, func=function(){}) {
  var array = [new Gakuchika()];
  db.collection("gakuchika")
    .withConverter(gakuchikaConverter)
    .where("analyzeid", "==", analyzeid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var gakuchika = doc.data();
        array.splice(0, 1, gakuchika);
        func(gakuchika);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}

// Consideration
// 新規データ
function setNewConsideration(consideration) {
  var id = "";
  console.log(consideration.toString());
  db.collection("consideration").withConverter(considerationConverter).add(consideration).then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
    id = docRef.id;
  }).catch(function(error) {
    console.log('Error adding document: ', error);
    id = error;
  });
  return id;
}
// データ更新
function updateConsideration(consideration, func=function(){}) {
  db.collection("consideration").doc(consideration.id).withConverter(considerationConverter).set(consideration).then(function() {
    console.log("Document successfully updated!");
    func();
  });
}
// 分析のidから関連するものを取ってくる(arrayだけど最初の１つだけ使用)
function getConsiderationFromAnalyzeid(analyzeid) {
  var array = [new Consideration()];
  db.collection("consideration")
    .withConverter(considerationConverter)
    .where("analyzeid", "==", analyzeid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var consideration = doc.data();
        array.splice(0, 1 ,consideration);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}

// MyEvent
// 新規データ
function setNewMyEvent(event) {
  var id = "";
  console.log(event.toString());
  db.collection("event").withConverter(myEventConverter).add(
    event
  ).then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
    id = docRef.id;
  }).catch(function(error) {
    console.log('Error adding document: ', error);
    id = error;
  });
  return id;
}
// データ更新
function updateMyEvent(event, func=function(){}) {
  db.collection("event").doc(event.id).withConverter(myEventConverter).set(
    event
  ).then(function() {
    console.log("Document successfully updated!");
    func();
  });
}
// 分析のidから関連するものを取ってくる(arrayだけど最初の１つだけ使用)
function getMyEventFromAnalyzeid(analyzeid, func=function(){}) {
  var array = [new MyEvent()];
  db.collection("event")
    .withConverter(myEventConverter)
    .where("analyzeid", "==", analyzeid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var event = doc.data();
        array.splice(0, 1, event);
        func(event);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}
// 自分のデータ全て
function getMyEvent() {
  var array = [];
  var user = firebase.auth().currentUser;
  db.collection("event")
    .withConverter(myEventConverter)
    .where("uid", "==", user.uid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var event = doc.data();
        array.push(event);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}

// WellPoint
// 新規データ
function setNewWellPoint(wellPoint, func=function(){}) {
  var id = "";
  if(!wellPoint.analyzeid) {
    var qa = new QAndA();
    qa.color = "jobhunting";
    qa.uid = firebase.auth().currentUser.uid;
    setNewData(qa, function(id){
      qa.id = id;
      wellPoint.analyzeid = qa.id;
    });
  }
  console.log(wellPoint.toString());
  db.collection("wellPoint")
    .withConverter(wellPointConverter)
    .add(wellPoint).then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      id = docRef.id;
      func(id);
    }).catch(function(error) {
      console.log('Error adding document: ', error);
      id = error;
    });
  return id;
}
// データ更新
function updateWellPoint(wellPoint, func=function(){}) {
  console.log(wellPoint.toString());
  db.collection("wellPoint").doc(wellPoint.id).withConverter(wellPointConverter).set(
    wellPoint
  ).then(function() {
    console.log("Document successfully updated!");
    func();
  });
}

// qAndA
// 新規データ
function setNewData(qAndA, func=function(){}) {
  var id = "";
  console.log(qAndA.toString());
  db.collection("questionAndAnswer")
    .withConverter(qAndAConverter)
    .add(qAndA).then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      id = docRef.id;
      func(id);
      localStorage.setItem("documentID", id);
    }).catch(function(error) {
      console.log('Error adding document: ', error);
      id = error;
    });
  return id;
}
// データ更新
function updateData(qAndA, func = function() {}) {
  db.collection("questionAndAnswer").doc(qAndA.id).withConverter(qAndAConverter).set(
    qAndA
  ).then(function() {
    console.log("Document successfully updated!");
    func();
  });
}
// 自分のデータで完了しているものを取得
function getQuestionAndAnswer(limit = 100) {
  var user = firebase.auth().currentUser;
  var array = [];
  console.log("getQuestionAndAnswer");
  db.collection("questionAndAnswer")
    .withConverter(qAndAConverter)
    .where("uid", "==", user.uid)
    .where("complete", "==", true)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = doc.data();
        array.push(qAndA);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}
// 自分のデータを全て取得（未完了含む）
function getQuestionAndAnswerAll(limit = 100) {
  var user = firebase.auth().currentUser;
  var array = [];
  console.log("getQuestionAndAnswer");
  db.collection("questionAndAnswer")
    .withConverter(qAndAConverter)
    .where("uid", "==", user.uid)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = doc.data();
        array.push(qAndA);
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  return array;
}
// idから取得
function getQuestionAndAnswerFromId(id, func=function(){}) {
  var array = [new QAndA()];
  db.collection("questionAndAnswer")
    .withConverter(qAndAConverter)
    .doc(id)
    .get().then((doc) => {
      var qAndA = doc.data();
      array.splice(0, 1, qAndA);
      func(qAndA);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
    return array;
}

function getGakuchikaAll(analyzeid, func = function() {}) {
  var qAndA, event, consideration;
  db.collection("questionAndAnswer")
    .doc(id).get().then((doc) => {
      qAndA = new QAndA(
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
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  db.collection("event")
    .where("analyzeid", "==", analyzeid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        event = new MyEvent(
          doc.id,
          doc.data().analyzeid,
          doc.data().when,
          doc.data().where,
          doc.data().who,
          doc.data().what,
          doc.data().how,
        );
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
    });
  db.collection("consideration")
    .where("analyzeid", "==", analyzeid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        consideration = new Consideration(
          doc.id,
          doc.data().analyzeid,
          doc.data().contents,
        );
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
   	});
  func(qAndA, event, consideration);
}
function getIncomplete() {
  var user = firebase.auth().currentUser;
  var array = [];
  console.log("getIncomplete")
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
    isResearchAccept: user.isResearchAccept,
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

Vue.component("result-float-button", {
  props: ['id', 'active'],
  template: `
    <div class="result__floatbutton-wrapper">
      <span v-if="active!=0" @click="goBunsekinome"><img src="images/2021_02_25_新素材/memo_icon_gray.png"></span>
      <span v-else @click="goBunsekinome" class="result__floatbutton-wrapper--active"><img src="images/2021_02_25_新素材/memo_icon_white.png"></span>
      <span v-if="active!=1" @click="goAnalyze"><img src="images/2021_02_25_新素材/analyze_icon_gray.png"></span>
      <span v-else @click="goAnalyze" class="result__floatbutton-wrapper--active"><img src="images/2021_02_25_新素材/analyze_icon_white.png"></span>
      <span v-if="active!=2" @click="goGakuchika"><img src="images/2021_02_25_新素材/gakuchika_icon_gray.png"></span>
      <span v-else @click="goGakuchika" class="result__floatbutton-wrapper--active"><img src="images/2021_02_25_新素材/gakuchika_icon_white.png"></span>
    </div>
  `,
  methods: {
    goBunsekinome: function() {
      if(this.active == 0) return;
      getMyEventFromAnalyzeid(this.id, (event) => {
        myNavigator.replacePage("result_memo.html", {
          data: {
            bunsekinome: event,
            recode: true,
          }
        });
      });
    },
    goAnalyze: function() {
      if(this.active == 1) return;
      getQuestionAndAnswerFromId(this.id, (qAndA) => {
        myNavigator.replacePage("result.html", {
          data: {
            qAndA: qAndA,
            recode: true,
          }
        });
      });
    },
    goGakuchika: function() {
      if(this.active == 2) return;
      getGakuchikaFromAnalyzeid(this.id, (gakuchika)=>{
        myNavigator.replacePage("result_gakuchika.html", {
          data: {
            gakuchika: gakuchika,
            recode: true,
          }
        });
      });
    },
  }
})


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