/*
 * Created by thalaikya on 10/29/16.
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

  const preObject = document.getElementById('courses');
  const list = document.getElementById('ullist');
	
  const userid = firebase.auth().currentUser.uid();
  const dbObject = firebase.database().ref().child('users/' + userid);
  const dbuser = dbObject.child('courses');

  dbObject.on('value', snapshot => {
  	preObject.innerText = JSON.stringify(snapshot.val(),null,3);
});
 
  dbuser.on('child_added', snapshot => {
	const li = document.createElement('li');
	li.innerText = snapshot.val();
	li.id = snapshot.key;
	list.appendChild(li);
 });

/*
 dbuser.op('child_changed', snapshot =>{
	const liChanged = document.getElementById(snapshot.key);
	liChanged.innerText = snap.val();
 })
*/


});
