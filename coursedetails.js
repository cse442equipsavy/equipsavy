/**
 * Created by satya on 10/9/16.
 */

(function(){
  const config = {
    apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
    authDomain: "equipsavy.firebaseapp.com",
    databaseURL: "https://equipsavy.firebaseio.com",
    storageBucket: "equipsavy.appspot.com",
    messagingSenderId: "254120319319"
  };
  firebase.initializeApp(config);

  document.getElementById("studentButton").addEventListener("click",reservePage);
  document.getElementById("instructorButton").addEventListener("click",editPage);

  function stuCourses() {
    var courses = ["CSE442","EAS207", "DMS110", "CHE107"];
    var stu = document.getElementById('studentCourses');
    for(var i = 0; i < courses.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = courses[i];
      opt.value = courses[i];
      stu.appendChild(opt);
    }
  }

  function instCourses() {
     var courses = ["CSE442","EAS207", "DMS110", "CHE107"];
     var inst = document.getElementById('instructorCourses');
     for(var i = 0; i < courses.length; i++) {
       var opt = document.createElement('option');
       opt.innerHTML = courses[i];
        opt.value = courses[i];
        inst.appendChild(opt);
     }
  }
  
  function reservePage() {
    window.location="reserve.html";
  }

  function editPage(){
    window.location="editmaterial.html";
  }

}());