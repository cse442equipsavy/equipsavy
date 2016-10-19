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
    var auth = firebase.auth();
    // var ref = Firebase.database().reference
    document.getElementById("register").addEventListener("click",register);

    function register(){

        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        auth.createUserWithEmailAndPassword(email,password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

        });


       // authDataCallback(authData);
        ref.child("users").child(authData.uid).set({
            name : getName(authData)
        });
        alert("Registered");
    }

    // function authDataCallback(authData){
    //     if(authData){
    //         ref.child("users").child(authData.uid).set({
    //             name : getName(authData)
    //         });
    //     }
    //
    // }

// find a suitable name based on the meta info given by each provider
    function getName(authData) {
        switch (authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
        }
    }

}());