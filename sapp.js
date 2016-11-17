/**
 * Created by satya on 10/30/16.
 */

(function(){
    const config = {
        apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
        authDomain: "equipsavy.firebaseapp.com",
        databaseURL: "https://equipsavy.firebaseio.com",
        storageBucket: "equipsavy.appspot.com",
        messagingSenderId: "254120319319"
    };
    firebase.initializeApp(config);

}());

<!-- Login page --> /*---------------------------------------------------------------------------------------*/

const auth = firebase.auth();
// document.getElementById('logout').style.visibility = 'hidden';
document.getElementById("login").addEventListener("click",myFunction);
// document.getElementById("registerPage").addEventListener("click",registerPage);
var logoutBtn = document.getElementById("logout");

// function registerPage(){
//     window.location = "register.html";
// }

logoutBtn.addEventListener('click', e => {
    firebase.auth().signOut();
    alert("Logged out")
})

function myFunction() {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    auth.signInWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        document.getElementById("login").disabled = false;
        // [END_EXCLUDE]
    });

}


firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var roleValue;

        var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
        roleValueRef.on('value', function(snapshot) {
            roleValue = snapshot.val();
            if(roleValue == 0){
                window.location = "departmental.html";
            }
            else {
                window.location = "courses.html";
            }
        });
    }
    else{
        console.log('not logged in');
    }
});

<!-- Courses Page --> /*--------------------------------------------------------------------------------------*/

/*------------ Thalaikya's code Starts ----------------*/

function courses(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 1){
                    document.getElementById('stu').style.visibility = 'hidden';
                    document.getElementById('scourses').style.visibility = 'hidden';
                    var dbInstCoursesList = firebase.database().ref().child('Users').child(userId).child('InstCourses');
                    dbInstCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('icourses').appendChild(x);
                    });
                }

                if(roleValue == 2){
                    var dbInstCoursesList = firebase.database().ref().child('Users').child(userId).child('InstCourses');
                    var dbStuCoursesList = firebase.database().ref().child('Users').child(userId).child('StuCourses');
                    dbInstCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('icourses').appendChild(x);
                    });
                    dbStuCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('scourses').appendChild(x);
                    });
                }

                if(roleValue == 3){
                    document.getElementById('inst').style.visibility = 'hidden';
                    document.getElementById('icourses').style.visibility = 'hidden';
                    var dbStuCoursesList = firebase.database().ref().child('Users').child(userId).child('StuCourses');
                    dbStuCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('scourses').appendChild(x);
                    });
                }
            });
        } else {
            // No user is signed in.
        }
    });

}

/*------------ Thalaikya's Code Ends ----------------*/

function directToEditPage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 1 || roleValue == 2)  {
                    var ic = document.getElementById('icourses');
                    var ival = ic.options[ic.selectedIndex].value;
                    sessionStorage.setItem("course_selected_staff", ival);
                    window.location = "editmaterial.html";
                }
            });
        }
        else{
            //user not signed in
        }

    });
}

function directToReservePage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 3 || roleValue == 2) {
                    var sc = document.getElementById('scourses');
                    var sval = sc.options[sc.selectedIndex].value;
                    sessionStorage.setItem("course_selected_staff", sval);
                    window.location = "reserve_page.html";
                    return false;
                }
            });
        }
        else{
            //user not signed in
        }
    });
}

function logOutUser(){
    firebase.auth().signOut();
    window.location = "slogin.html";
}



