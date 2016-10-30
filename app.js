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


    <!-- Login page -->

    const auth = firebase.auth();
    document.getElementById('logout').style.visibility = 'hidden';
    document.getElementById("login").addEventListener("click",myFunction);
    document.getElementById("register").addEventListener("click",registerPage);

    function registerPage(){
        window.location = "register.html";
    }

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
            window.location="courses.html";
            document.getElementById('login').style.visibility = 'hidden';
            document.getElementById('logout').style.visibility = 'visible';
            console.log("works");
        }
        else{
            console.log('not logged in');
        }
    });


    <!-- Register Page -->

    const dbRefObject = firebase.database();
    document.getElementById("register").addEventListener("click",register);
    var userId, userName;

    function register(){

        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        auth.createUserWithEmailAndPassword(email,password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

        });

        userName = email.replace(/@.*/, '');
        var user = firebase.auth().currentUser;
        if(user != null){
            userId = user.uid;
        }

        dbRefObject.ref('users/' + userId).set({
            username: userName
        });

        alert("Registered");
    }

    <!-- Courses Page -->

    document.getElementById("logout").addEventListener("click",logout);
    function logout() {
        auth.signOut();
        document.getElementById('login').style.visibility = 'visible';
        document.getElementById('logout').style.visibility = 'hidden';
    }


}());