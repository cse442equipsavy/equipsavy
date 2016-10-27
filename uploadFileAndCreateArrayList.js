

  //This file places the upload bar and uploads the file to the database in the JJ_TestUploads folder



    // Initialize Firebase equipsavy
    var config = {
      apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
      authDomain: "equipsavy.firebaseapp.com",
      databaseURL: "https://equipsavy.firebaseio.com",
      storageBucket: "equipsavy.appspot.com",
      messagingSenderId: "254120319319"
    };
    firebase.initializeApp(config);


//end of codebase uplaod from firebase docs

//get uploaded file and put info in alert
function readFromFile(evt) {
   var fileObject = evt.target.files[0]; //file object is f; first file is at [0]



  if (fileObject) {//if a file was uploaded


var r = new FileReader();//create fileReader object
r.onload = function(e) {//when the file is loaded, run this function
    var fileContents = e.target.result;//load the contents of file into object

 var commaNumber=1;
 var outputNameString ="";
/*for (i=0;i<fileContents.length;i++){
if (fileContents.charAt(i)==','){
outputNameString +=" ";
if (commaNumber==1)//commanumber 1 means comma after name; 2 is after amount
commaNumber=2;

}else if (fileContents.charAt(i)=='\n'){
commaNumber =1;
outputNameString+="\n";//adds enter key
}else {//not a comma or \n
if (commaNumber==1)
outputNameString+=fileContents.charAt(i);//adds character to string
}
}*/
console.log("made it to 71\n");
var inputString = "";//string that gets characters loaded into temporarily
var itemNum=0;//keeps track of which item number in list
var equipName=[];//equipname list
var equipAmount=[];//equipAmount list
var equipCheckoutTime=[];//equipCheckoutTime list

for (i=0; i<fileContents.length; i++){//go through all file contents
  if (fileContents.charAt(i)==','){//if a comma, splice

  if (commaNumber==1){//commanumber 1 means comma after name; 2 is after amount
    commaNumber=2;
    equipName.push(inputString);//add item name to position
    inputString="";//clear string
  }else{//commaNumber=2; after amount
    equipAmount.push(inputString);//set amount for equipAmount
    inputString="";//clear string
    // commaNumber=1;
  }
}else if(fileContents.charAt(i)=='\n'){//after item checkoutTime
  commaNumber =1;
  equipCheckoutTime.push(inputString);
  inputString="";//clear string
  itemNum++;//increment itemNum
  }else {//not a comma or \n

  inputString+=fileContents.charAt(i);//adds character to string
  }

}
console.log("Finished parsing, line 100\n");
for (i=0; i<itemNum;i++){//uploads info to list
  firebase.database().ref('courses/CSE442/Equipment/'+equipName[i] ).set({
      item: equipName[i],
      amount: equipAmount[i],
      checkoutTime: equipCheckoutTime[i]
    });

}
console.log("Finished uploading, line 1-0\n");

      //document.getElementById("p1").innerHTML = fileContents;
/*var i =0;
var indexEnter =fileContents.IndexOf("\n");
var indexComma =fileContents.IndexOf(",");
itemNames[i]= fileContents.slice(indexComma-1);
i++;


while(i<3){//3 for testing, normally go through all items
indexComma = (fileContents.substring(indexEnter)).IndexOf(",");
indexEnter = (fileContents.substring(indexComma)).IndexOf(",");
var tempString =fileContents.substring(indexEnter+1,indexComma-1);
itemNames[i]=tempString;
var tempId = "box"+i;
document.getElementById(tempId).innerHTML = tempString;
i++;
}*/

    }
    r.readAsText(fileObject);



  } else {//if a file was not uploaded
    alert("No File was uploaded");
  }
}
document.getElementById('fileInput').addEventListener('change', readFromFile, false);
