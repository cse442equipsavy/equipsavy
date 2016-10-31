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

function add() {
    var equipName = prompt("Please enter your the name of the equipment");
    if(equipName!=null){
    var table = document.getElementById("dataTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = equipName; 
    var btn = document.createElement('input');
btn.type = "button";
btn.value = "Delete";
btn.onclick = function(){deleteRow(this)};   

cell2.appendChild(btn);
}
}


    function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("dataTable").deleteRow(i);
    }
 
   

