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


    <!-- Login page --> /*---------------------------------------------------------------------------------------*/

    const auth = firebase.auth();
    // document.getElementById('logout').style.visibility = 'hidden';
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
            window.location="Course_Details.html";
           
            console.log("works");
        }
        else{
            console.log('not logged in');
        }
    });


    <!-- Register Page --> /*------------------------------------------------------------------------------------*/

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

    <!-- Courses Page --> /*-------------------------------------------------------------------------------------*/

    document.getElementById("logout").addEventListener("click",logOut);
    document.getElementById("stuconfirm").addEventListener("click", studConfirm);
    document.getElementById("iconfirm").addEventListener("click", instConfirm);

    function logOut() {
        alert("LogOut Function")
        auth.signOut();
        window.location = "slogin.html";
    }

    /*
     * Thalaikya's Code Begins
     */

    var userID = auth.currentUser.uid();
    var list = [];
    var userRole;
    var sselect = document.getElementById("scourses");
    var iselect = document.getElementById("icourses");
    const dbObject = firebase.database().ref().child('users/' + userid);
    const dbCurrentUserCourses = dbObject.child('courses');
    const dbCurrentUserRole = dbObject.child('Role');

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

    if(userRole == 1){
        for(var i = 0; i < list.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = list[i];
            opt.value = list[i];
            iselect.appendChild(opt);
        }
    }

    /*
     * Thalaikya's Code Ends
     */

    function studConfirm() {
        if(userRole == 0){
            window.location = "reserve.html";
        }
    }

    function instConfirm(){
        if(userRole == 1){
            window.location = "editmaterial.html";
        }
    }

}());