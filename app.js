
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

<!-- Login page --> /*---------------------------------------------------------------------------------------*/

const auth = firebase.auth();
// document.getElementById('logout').style.visibility = 'hidden';
document.getElementById("login").addEventListener("click",myFunction);
// document.getElementById("registerPage").addEventListener("click",registerPage);


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
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var roleValue;

        var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
        roleValueRef.on('value', function(snapshot) {
            roleValue = snapshot.val();
            if(roleValue == 0){
                window.location = "departmental.html";
            }
            else {
                window.location = "Course_Details.html";
            }
        });
    }
    else{
        console.log('not logged in');
    }
});

<!-- Courses Page --> /*--------------------------------------------------------------------------------------*/

/*------------ Thalaikya's code Starts ----------------*/

function courses(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 1){
                    document.getElementById('stu').style.visibility = 'hidden';
                    document.getElementById('scourses').style.visibility = 'hidden';
                    var dbInstCoursesList = firebase.database().ref().child('Users').child(userId).child('InstCourses');
                    dbInstCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('icourses').appendChild(x);
                    });
                }

                if(roleValue == 2){
                    var dbInstCoursesList = firebase.database().ref().child('Users').child(userId).child('InstCourses');
                    var dbStuCoursesList = firebase.database().ref().child('Users').child(userId).child('StuCourses');
                    dbInstCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('icourses').appendChild(x);
                    });
                    dbStuCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('scourses').appendChild(x);
                    });
                }

                if(roleValue == 3){
                    document.getElementById('inst').style.visibility = 'hidden';
                    document.getElementById('icourses').style.visibility = 'hidden';
                    var dbStuCoursesList = firebase.database().ref().child('Users').child(userId).child('StuCourses');
                    dbStuCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('scourses').appendChild(x);
                    });
                }
            });
        } else {
            // No user is signed in.
        }
    });

}

/*------------ Thalaikya's Code Ends ----------------*/

function directToEditPage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 1 || roleValue == 2)  {
                    var ic = document.getElementById('icourses');
                    var ival = ic.options[ic.selectedIndex].value;
                    sessionStorage.setItem("course_selected_staff", ival);
                    window.location = "editmaterial.html";
                }
            });
        }
        else{
            //user not signed in
        }

    });
}

function directToReservePage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var userId = user.uid;
            var roleValue;
            var roleValueRef = firebase.database().ref('Users/' + userId + '/RoleValue');
            roleValueRef.on('value', function(snapshot) {
                roleValue = snapshot.val();
                if(roleValue == 3 || roleValue == 2) {
                    var sc = document.getElementById('scourses');
                    var sval = sc.options[sc.selectedIndex].value;
                    sessionStorage.setItem("course_selected", sval);
                    window.location = "reserve_page.html";
                    return false;
                }
            });
        }
        else{
            //user not signed in
        }
    });
}

function logOutUser(){
    firebase.auth().signOut();
    window.location = "slogin.html";
}




 

 <!-- Edit page --> /*---------------------------------------------------------------------------------------*/
     
     function edit_page_default(){ 
       
  
    var rootRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment");
    
      rootRef.on("child_added",snap => {
        var key = snap.key;
       var equipName = snap.child("item").val();
          var equipCount = snap.child("amount").val();
    if(equipName!=null && equipCount != null){
    var table = document.getElementById("dataTable");
    var row = table.insertRow(-1);
        row.id = key;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
         
    cell1.innerHTML = equipName; 
    var del = document.createElement('input'); 
        
del.type = "button";
del.class = "button button-block";
del.value = "Delete";
        del.className = "btn";
del.onclick = function(){deleteRow(this)}; 
        var edit = document.createElement('input');       
edit.type = "button";
edit.value = "Edit";
edit.className = "btn";        
edit.onclick = function(){editRow(this)};
cell2.innerHTML = equipCount;
cell3.appendChild(edit);
cell4.appendChild(del);
      
}
    });
    
    rootRef.on('child_changed',snap=> {
         var key = snap.key;
        var equipName = snap.child("item").val();
         var amount = snap.child("amount").val();
         if(equipName!=null){
        document.getElementById("dataTable").rows[key].cells[0].innerHTML = equipName;
             document.getElementById("dataTable").rows[key].cells[1].innerHTML = amount;
         }

});}

function logout() {
        firebase.auth().signOut();
        window.location = "slogin.html";
    }
    

function back(){
    window.history.go(-1);
}

function home(){
    window.location = "Course_Details.html";
}
function add() {
    var equipName = prompt("Please enter the name of the equipment");
    var equipCount = prompt("Please enter the count of the equipment");
    if(equipName!=null && equipCount!=null){
        
         var newPostRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").push();
newPostRef.set({
    item: equipName,
    amount : equipCount
});
}
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex-1;
   var key = document.getElementById("dataTable").rows[i].id;
    var rootRef =firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(key);
    rootRef.remove();
     document.getElementById("dataTable").deleteRow(i);
    }

function editRow(r) {
    location.href = '#modal-one';
//    var i = r.parentNode.parentNode.rowIndex;
//    var row = document.getElementById("dataTable").rows[i];
//    var name = prompt("change the name:",row.cells[0].innerHTML);
//    var count = prompt("change the count:",row.cells[1].innerHTML);
//    if (name!=null){row.cells[0].innerHTML = name;}
//    if (count!=null){ row.cells[1].innerHTML = count;}
//    window.alert(name+" "+count);
//    var rootRef =firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(row.id);
//    rootRef.update({ item : row.cells[0].innerHTML, amount: row.cells[1].innerHTML});
    }
 


 <!-- End Edit page --> /*---------------------------------------------------------------------------------------*/
     <!--  Approve  --> /*---------------------------------------------------------------------------------------*/

function approve_page_default(){ 
        
  
    var rootRef = firebase.database().ref("reserve/courses/"+sessionStorage.getItem('course_selected_staff'));
    
      rootRef.on("child_added",snap => {
        var key = snap.key;
       var user = snap.child("user").val();
          var item = snap.child("item").val();
    
    var table = document.getElementById("approveTable");
    var row = table.insertRow(-1);
        row.id = key;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
         
    cell1.innerHTML = user;
        cell2.innerHTML = item;
    var app = document.createElement('input'); 
        
app.type = "button";
app.class = "button button-block";
app.value = "Approve";
        app.className = "btn";
app.onclick = function(){deleteRow(this)}; 
        var dec = document.createElement('input');       
dec.type = "button";
dec.value = "Decline";
dec.className = "btn";        
dec.onclick = function(){decline(this)};

cell3.appendChild(app);
cell4.appendChild(dec);
      

    });
    
   }

function decline(r) {
    var i = r.parentNode.parentNode.rowIndex-1;
   var key = document.getElementById("approveTable").rows[i].id;
    var rootRef = firebase.database().ref("reserve/courses/"+sessionStorage.getItem('course_selected_staff')).child(key);
    rootRef.remove();
    var rootRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(document.getElementById("approveTable").rows[i].cells[1].innerHTML).child("amount");
     
    rootRef.transaction(function(amount) {
  
  return amount + 1;
        
});
     document.getElementById("approveTable").deleteRow(i);
    
    
    }

   
    
<!-- End Approve  --> /*---------------------------------------------------------------------------------------*/
     
     <!--  reserve page --> /*---------------------------------------------------------------------------------------*/
  function reserve_page_default(){ 
     
        
    var rootRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected')).child("Equipment");
    
      rootRef.on("child_added",snap => {
        var key = snap.key;
       var equipName = snap.child("item").val();
          
          var equipCount = snap.child("amount").val();
          if(equipCount>0){
    if(equipName!=null && equipCount != null){
    var table = document.getElementById("equipTable");
    var row = table.insertRow(-1);
        row.id = key;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = equipName; 
    var sel = document.createElement('input'); 
      sel.id = "1";  
sel.type = "checkbox";
sel.value = equipName;
        
cell2.appendChild(sel);
      
}
    }});
      //
    
    rootRef.on('child_changed',snap=> {
         var key = snap.key;
        var equipName = snap.child("item").val();
        var equipCount = snap.child("amount").val();
         if(equipName!=null && equipCount>0){
        document.getElementById("equipTable").rows[key].cells[0].innerHTML = equipName;
         }
        else{
             var row = document.getElementById("equipTable").rows[key];
    row.parentNode.removeChild(row);
        }

});}

function select(){
    var r = confirm("are you sure?");
    if(r == true){
    checkboxes = document.getElementsByTagName("input"); 

for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
 if(checkbox.checked == true){
      var rootRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected')).child("Equipment").child(checkbox.value).child("amount");
     
    rootRef.transaction(function(amount) {
  // If users/ada/rank has never been set, currentRank will be `null`.
        if(amount>0){
  return amount - 1;
        }
});
     var rootRef = firebase.database().ref("reserve/courses/"+sessionStorage.getItem('course_selected')).push();
     rootRef.set({item : checkbox.value,
                 user: firebase.auth().currentUser.email});
 }   
}
        home();
}
}

   
    
<!-- End reserve page --> /*---------------------------------------------------------------------------------------*/
     
<!--  Editmaterial page --> /*---------------------------------------------------------------------------------------*/

function edit() {
window.location = "edit_page.html";
}

function upload() {
window.location = "UploadEquipmentList.html";
}

function approve() {
window.location = "approve.html";
}
   
    
<!-- End Editmaterial page --> /*---------------------------------------------------------------------------------------*/