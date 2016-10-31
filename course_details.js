/*
 * Created by thalaikya on 10/29/16.
 */

(function() {
    const config = {
        apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
        authDomain: "equipsavy.firebaseapp.com",
        databaseURL: "https://equipsavy.firebaseio.com",
        storageBucket: "equipsavy.appspot.com",
        messagingSenderId: "254120319319"
    };
    firebase.initializeApp(config);

var userID = auth.currentUser.uid();
    var list = [];
    var slist = [];
    var ilist = [];
    var userRole;
    var sselect = document.getElementById("scourses");
    var iselect = document.getElementById("icourses");
    const dbObject = firebase.database().ref().child('users/' + userID);
    const dbCurrentUserCourses = dbObject.child('courses');
    const dbStuCourses = dbCurrentUserCourses.child('StudentCourses');
    const dbInstCourses =  dbCurrentUserCourses.child('InstCourses');
    const dbCurrentUserRole = dbObject.child('Role');

    dbStuCourses.on('child_added', snapshot => {

        slist = snapshot.val();

    });

    dbInstCourses.on('child_added', snapshot => {

        ilist = snapshot.val();

    });

    dbCurrentUserCourses.on('child_added', snapshot => {

        list = snapshot.val();

    });

    dbCurrentUserRole.on('child_added', snapshot => {

        userRole = snapshot.val();

    });

    if(userRole == 0){
        for(var i = 0; i < list.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = list[i];
            opt.value = list[i];
            sselect.appendChild(opt);
        }
    }

    if(userRole == 2){
        for(var i = 0; i < list.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = list[i];
            opt.value = list[i];
            iselect.appendChild(opt);
        }
    }

    if(userRole == 1){

        for(var i = 0; i < slist.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = slist[i];
            opt.value = slist[i];
            sselect.appendChild(opt);
        }

        for(var i = 0; i < ilist.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = ilist[i];
            opt.value = ilist[i];
            iselect.appendChild(opt);
        }

    }


});
