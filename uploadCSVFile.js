//This file places the upload bar and uploads the file to the database in the JJ_TestUploads folder



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
    authDomain: "equipsavy.firebaseapp.com",
    databaseURL: "https://equipsavy.firebaseio.com",
    storageBucket: "equipsavy.appspot.com",
    messagingSenderId: "254120319319"
  };
  firebase.initializeApp(config);




<!-- https://www.youtube.com/watch?v=SpxHVrpfGgU where I got this code and page setting code from-->
        // Get elements
        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');

        //Event Listener for file uplaod
        fileButton.addEventListener('change', function(e) {
          //get file
          var file = e.target.files[0];

          //create storage ref
          var storageRef = firebase.storage().ref('JJ_TestUploads/'+file.name);

          //upload file
          var task = storageRef.put(file);

          //Update progress bar
          task.on('state_changed',
          function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;

            },

            function error(err) {

            },

            function complete(){


            }
          );
        });