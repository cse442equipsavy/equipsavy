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

                }
            });
        } else {
            // No user is signed in.
        }
    });

}

function logOutUser(){
    firebase.auth().signOut();
    window.location = "slogin.html";
}


<!-- Register Page --> /*-------------------------------------------------------------------------------------*/

// function registerUser(){
//     var userId, userName;
//     const dbRefObject = firebase.database();
//
//     const auth = firebase.auth();
//     const RUseremail = document.getElementById('Remail').value;
//
//     const RUserpassword = document.getElementById('Rpassword').value;
//
//      auth.createUserWithEmailAndPassword(RUseremail,RUserpassword).catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });
//
//     userName = RUseremail.replace(/@.*/, '');
//     var user = auth.currentUser;
//     if(user != null){
//         userId = user.uid;
//     }
//
//     dbRefObject.ref('Users/' + userId).set({
//         userName:userName
//     });
//
//
//
//     alert("Registered");
// }



