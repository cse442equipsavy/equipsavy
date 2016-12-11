
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

function home(){
    window.location = sessionStorage.getItem("home");
}

<!-- Login page --> /*---------------------------------------------------------------------------------------*/

const auth = firebase.auth();
// document.getElementById('logout').style.visibility = 'hidden';
document.getElementById("login").addEventListener("click",myFunction);


function myFunction() {
   
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
       
    auth.signInWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            document.getElementById("loginMessage").innerHTML = "Wrong password";
            showpopup();
            
        } else {
            document.getElementById("loginMessage").innerHTML = errorMessage;
            showpopup();
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
            else if(roleValue == 2) {
                sessionStorage.setItem("home", "Course_Details.html");
                sessionStorage.setItem("editPage", "editmaterial.html");
                window.location = sessionStorage.getItem("home");
            }
            else if (roleValue == 3){
                sessionStorage.setItem("home", "student_Course_Details.html");
                window.location = sessionStorage.getItem("home");
            }
             else if (roleValue == 1){
                sessionStorage.setItem("home", "student_Course_Details.html");
                 sessionStorage.setItem("editPage", "instr_editmaterial.html");
                window.location = sessionStorage.getItem("home");
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
                   var dbInstCoursesList = firebase.database().ref().child('Users').child(userId).child('InstCourses');
                    dbInstCoursesList.on('child_added',snap => {
                        var x = document.createElement("OPTION");
                        var t = document.createTextNode(""+snap.val());
                        x.appendChild(t);
                        document.getElementById('scourses').appendChild(x);
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
                    window.location = sessionStorage.getItem("editPage");
                    return false;
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
                else if( roleValue == 1){
                    window.location = "instr_editmaterial.html";
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
    window.location = "index.html";
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
        del.id="delete";
del.class = "button button-block";
del.value = "Delete";
        del.className = "btn";
del.onclick = function(){deleteRow(this)}; 
        var edit = document.createElement('input');       
edit.type = "button";
        edit.id = "edit";
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
        window.location = "index.html";
    }
    


function add() {
    var equipName = prompt("Please enter the name of the equipment");
    var equipCount = prompt("Please enter the count of the equipment");
    if(equipName!=null && equipCount!=null){
        
         var newPostRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(equipName);
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

//function editRow(r) {
//     var i = r.parentNode.parentNode.rowIndex-1;
//  var row = document.getElementById("dataTable").rows[i];
////    var key = row.id;
//   var equipName = prompt("please enter the name of the equipment",row.cells[0].innerHTML);
//  
//    var equipCount = prompt("please enter the amount of the equipment",row.cells[1].innerHTML);
//    if(equipName!=null && equipCount!=null){
//        row.cells[0].innerHTML = equipName;
//        row.cells[1].innerHTML = equipCount;
//        
//        var rootRef =firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(key);
//        
//        rootRef.update({ item : row.cells[0].innerHTML, amount: row.cells[1].innerHTML});
//        
//  
//    }
//   
//    }


function editRow(r) {



   var i = r.parentNode.parentNode.rowIndex-1;



   var row = document.getElementById("dataTable").rows[i];



   var name = prompt("change the name:",row.cells[0].innerHTML);



   var count = prompt("change the count:",row.cells[1].innerHTML);



   if (name!=null){row.cells[0].innerHTML = name;}



   if (count!=null){ row.cells[1].innerHTML = count;}


    



   var rootRef =firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(row.id);



   rootRef.update({ item : row.cells[0].innerHTML, amount: row.cells[1].innerHTML});


    }




 


 <!-- End Edit page --> /*---------------------------------------------------------------------------------------*/
      <!--  TA  --> /*---------------------------------------------------------------------------------------*/

function ta_page_default(){ 
   
   var rootRef = firebase.database().ref("courses/"+sessionStorage.getItem('course_selected_staff')+"/details/TA");
    
      rootRef.on("child_added",snap => {
        var key = snap.key ;
          var email = snap.child("UBIT").val();
    var table = document.getElementById("TAtable");
    var row = table.insertRow(-1);
        row.id = key;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
         
    cell1.innerHTML = email;
        
    var app = document.createElement('input'); 
        
app.type = "button";
app.class = "button button-block";
app.value = "remove";
        app.className = "btn";
app.onclick = function(){remove_staff(this)}; 

cell2.appendChild(app);

      

    });
    
   }

 function add_staff(){
     var name = prompt("enter the UBIT name of the student:");
     if(name != null){ 
         
         var rootRef = firebase.database().ref("Users");
          rootRef.on("child_added",snap => {
               var key = snap.key;
       if(name == snap.child("UserName").val()){
          
           var newRef = firebase.database().ref("courses/"+sessionStorage.getItem("course_selected_staff")+"/details/TA/"+name);
            newRef.set({
               UBIT: name
            });
           
           var newRef = firebase.database().ref("Users/"+key);
           newRef.update({RoleValue:2});
          
           newRef = newRef.child("InstCourses");
           var i = snap.child("InstCourses").numChildren();
          
           var j = 1;
            
           var k = i+j;
           
           i = "Course"+k;
           var foo = {};
           foo[i] = sessionStorage.getItem("course_selected_staff");
          newRef= newRef.child(i);
           newRef.set(sessionStorage.getItem("course_selected_staff"));
       }

    });
         
     }
            
        }

function remove_staff(r) {
    
    var i = r.parentNode.parentNode.rowIndex-1;
    
   var row = document.getElementById("TAtable").rows[i];
    var key = row.id;
    var rootRef = firebase.database().ref("courses/"+sessionStorage.getItem('course_selected_staff')+"/details/TA/"+key);
    rootRef.remove();
    
    var rootRef = firebase.database().ref("Users");
   
          rootRef.on("child_added",snap => {
               var key = snap.key;
               
       if(row.cells[0].innerHTML == snap.child("UserName").val()){
 
          
         var  newRef = rootRef.child(key).child("InstCourses");
           var i = snap.child("InstCourses").numChildren();
           if(i>1){
               newRef.on("child_added",snap => {
                    
                 if( snap.val() == sessionStorage.getItem("course_selected_staff")){
                     
                     
                    var key_remove= snap.key;
                     newRef.child(key_remove).remove();
                 }
               });
         
           }
           else if(i==1){
               rootRef.child(key).update({RoleValue: 3});
               rootRef.child(key).child("InstCourses").remove();
           }
           
           
       }

    });
    
     document.getElementById("TAtable").deleteRow(i);
    }
   
    
<!-- End TA  --> /*---------------------------------------------------------------------------------------*/
     
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
app.onclick = function(){approveRow(this)}; 
        var dec = document.createElement('input');       
dec.type = "button";
dec.value = "Decline";
dec.className = "btn";        
dec.onclick = function(){decline(this)};

cell3.appendChild(app);
cell4.appendChild(dec);
      

    });
    
   }


function approveRow(r) {
    var i = r.parentNode.parentNode.rowIndex - 1;
    var row = document.getElementById("approveTable").rows[i];
    
    var user = row.cells[0].innerHTML;
    var equipName = row.cells[1].innerHTML;
    var start = prompt("Please enter the start date of this reservation(mm/dd/yyyy) ");
    var end = prompt("Please enter the end date of this reservation(mm/dd/yyyy) ");
    
    if(start != null && end != null){
    
    var newPostRef = firebase.database().ref().child("tracking").child( sessionStorage.getItem('course_selected_staff')).push();
newPostRef.set({
    user: user,
    equipment : equipName,
     startDate: start,
    endDate : end
});
      
         var rootRef = firebase.database().ref("reserve/courses/"+sessionStorage.getItem('course_selected_staff')+"/"+row.id);
        rootRef.remove();

document.getElementById("approveTable").deleteRow(i);}
    else{
        alert("try again");
    }

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

function tracking_page_default(){
 
var rootRef = firebase.database().ref("tracking/"+sessionStorage.getItem('course_selected_staff'));
    
      rootRef.on("child_added",snap => {
        var key = snap.key ;
          var user = snap.child("user").val();
          
var item = snap.child("equipment").val();
var startDate = snap.child("startDate").val();
var endDate = snap.child("endDate").val();
         
var table = document.getElementById("trackingTable");
          
var row = table.insertRow(-1);
          
     row.id=key;

var cell1 = row.insertCell(0);
           
var cell2 = row.insertCell(1);
          
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);

cell1.innerHTML = user;
cell2.innerHTML = item;
cell3.innerHTML = startDate;
cell4.innerHTML = endDate;
    
var app = document.createElement('input'); 
app.type = "button";
app.class = "button button-block";
app.value = "returned";
        app.className = "btn";
app.onclick = function(){returned(this)}; 

    cell5.append(app);

    });

}

function returned(r) {
    
    var i = r.parentNode.parentNode.rowIndex-1;
   var row = document.getElementById("trackingTable").rows[i];
    var key = row.id;
    var rootRef = firebase.database().ref("tracking/"+sessionStorage.getItem('course_selected_staff')).child(key);
    rootRef.remove();
    
    var rootRef = firebase.database().ref().child("courses").child( sessionStorage.getItem('course_selected_staff')).child("Equipment").child(row.cells[1].innerHTML).child("amount");
     
    rootRef.transaction(function(amount) {
  
  return amount + 1;
        
});
     document.getElementById("trackingTable").deleteRow(i);
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

function yes_button_click(){
   
    
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
       
    window.location = sessionStorage.getItem("home");

}

   
    
<!-- End reserve page --> /*---------------------------------------------------------------------------------------*/
    
    <!--  department page --> /*---------------------------------------------------------------------------------------*/
        function add_instr(){
            
            var course_name = document.getElementById("instr_coursename").value;
            var course = document.getElementById("instr_course").value.toUpperCase();
            var instr = document.getElementById("instr").value;
            if(instr != null && course !=null){ 
            var rootRef = firebase.database().ref("courses/"+course+"/details");
            rootRef.set({
               instructor: instr,
                courseName : course_name
            });

            
            
         
         var rootRef = firebase.database().ref("Users");
          rootRef.on("child_added",snap => {
               var key = snap.key;
       if(instr == snap.child("UserName").val()){
          
           
           var newRef = firebase.database().ref("Users/"+key);
          
           newRef = newRef.child("InstCourses");
           var i = snap.child("InstCourses").numChildren();
          
           var j = 1;
            
           var k = i+j;
           
           i = "Course"+k;
           var foo = {};
           foo[i] = course;
          newRef= newRef.child(i);
           newRef.set(course);
       }

    });
         
     }
                        document.getElementById("instr").value = null;
            document.getElementById("instr_coursename").value=null;
            document.getElementById("instr_course").value = null;
            showpopup();
        }

function remove_instr(){
       var course_name = document.getElementById("instr_coursename").value;
            var course = document.getElementById("instr_course").value.toUpperCase();
            var instr = document.getElementById("instr").value;
            if(instr != null && course !=null){ 
            var rootRef = firebase.database().ref("courses/"+course+"/details");
            rootRef.remove();
   var rootRef = firebase.database().ref("Users");
   
          rootRef.on("child_added",snap => {
               var key = snap.key;
               
       if(instr == snap.child("UserName").val()){
 
          
         var  newRef = rootRef.child(key).child("InstCourses");
           var i = snap.child("InstCourses").numChildren();
           if(i>0){
               newRef.on("child_added",snap => {
                    
                 if( snap.val() == course){
                     
                   
                    var key_remove= snap.key;
                     newRef.child(key_remove).remove();
                 }
               });
         
           }
           
           
           
       }

    });
                    document.getElementById("instr").value = null;
            document.getElementById("instr_coursename").value=null;
            document.getElementById("instr_course").value = null;
    showpopup();
   
    
        }}


        
            
<!-- End department page --> /*---------------------------------------------------------------------------------------*/

    
