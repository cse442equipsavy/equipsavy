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

function back(){
    window.location = "editmaterial.html";
}

function home(){
    window.location = "Course_Details.html";
}

    function approve(r) {
        var i = r.parentNode.parentNode.rowIndex;
   var x= document.getElementById("approveTable").rows[i].cells;
        x[1].innerHTML = "Done";
    }
 
   