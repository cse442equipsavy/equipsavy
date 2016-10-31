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

function edit() {
window.location = "edit_page.html";
}

function upload() {
window.location = "UploadEquipmentList.html";
}

function approve() {
window.location = "approve.html";
}
   

