/**
 * Created by satya on 10/18/16.
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
    var userId, userName;

    const auth = firebase.auth();

    const dbRefObject = firebase.database();

    document.getElementById("register").addEventListener("click",register);



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



// // find a suitable name based on the meta info given by each provider
//     function getName(ad) {
//         switch (ad.provider) {
//             case 'password':
//                 return ad.password.email.replace(/@.*/, '');
//         }
//     }

}());