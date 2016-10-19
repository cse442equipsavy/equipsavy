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
    const auth = firebase.auth();

    document.getElementById("register").addEventListener("click",register);

    function register(){

        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        auth.createUserWithEmailAndPassword(email,password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

        });

        var isNewUser = true;

        var ref = new Firebase("https://equipsavy.firebaseio.com");
        ref.onAuth(function (authData) {
            if (authData && isNewUser) {

                // save the user's profile into the database so we can list users

                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData)
                });
            }
        });

        alert("Registered");
    }



// find a suitable name based on the meta info given by each provider
    function getName(authData) {
        switch (authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
        }
    }

}());