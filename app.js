  (function(){
  const config = {
    apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
    authDomain: "equipsavy.firebaseapp.com",
    databaseURL: "https://equipsavy.firebaseio.com",
    storageBucket: "equipsavy.appspot.com",
    messagingSenderId: "254120319319"
  };
  firebase.initializeApp(config);
          
  document.getElementById('logout').style.visibility = 'hidden';
  document.getElementById("login").addEventListener("click",myFunction);
  document.getElementById("logout").addEventListener("click",logout);

  const auth = firebase.auth();
      
  function logout() {
    auth.signOut();
        document.getElementById('login').style.visibility = 'visible';
             document.getElementById('logout').style.visibility = 'hidden';
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
             window.location="coursedetails.html";
             document.getElementById('login').style.visibility = 'hidden';
             document.getElementById('logout').style.visibility = 'visible';
             console.log("works");
         } 
          else{
             console.log('not logged in'); 
          }
      });
      

}());