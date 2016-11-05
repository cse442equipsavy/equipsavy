const config = {
    apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
    authDomain: "equipsavy.firebaseapp.com",
    databaseURL: "https://equipsavy.firebaseio.com",
    storageBucket: "equipsavy.appspot.com",
    messagingSenderId: "254120319319"
  };
  firebase.initializeApp(config);


    <!-- Login page --> /*---------------------------------------------------------------------------------------*/
(function(){
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

}());

 <!-- Edit page --> /*---------------------------------------------------------------------------------------*/
     
     function edit_page_default(){ document.body.style.backgroundColor = "#005bbb";
  
    var rootRef = firebase.database().ref().child("Course").child( sessionStorage.getItem('course_selected_staff')).child("Equipment");
    
      rootRef.on("child_added",snap => {
        var key = snap.key;
       var equipName = snap.child("name").val();
    if(equipName!=null){
    var table = document.getElementById("dataTable");
    var row = table.insertRow(-1);
        row.id = key;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
         
    cell1.innerHTML = equipName; 
    var btn = document.createElement('input');
       
btn.type = "button";
btn.value = "Delete";
btn.onclick = function(){deleteRow(this)};   

cell2.appendChild(btn);
}
    });
    
    rootRef.on('child_changed',snap=> {
         var key = snap.key;
        var equipName = snap.child("name").val();
         if(equipName!=null){
        document.getElementById("dataTable").rows[key].cells[0].innerHTML = equipName;
         }

});}

function back(){
    window.location = "editmaterial.html";
}

function home(){
    window.location = "Course_Details.html";
}
function add() {
    var equipName = prompt("Please enter your the name of the equipment");
    if(equipName!=null){
        
         var newPostRef = firebase.database().ref().child("Course").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").push();
newPostRef.set({
    name : equipName
});
       
}
}



function deleteRow(r) {
    
    var i = r.parentNode.parentNode.rowIndex;
    
    
   
    var key = document.getElementById("dataTable").rows[i].id;
   
    var rootRef =firebase.database().ref().child("Course").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(key);
    rootRef.remove();

     document.getElementById("dataTable").deleteRow(i);
  
    }
 


 <!-- End Edit page --> /*---------------------------------------------------------------------------------------*/
