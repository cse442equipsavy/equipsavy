


var config = {
		apiKey: "AIzaSyDo_SFzJLYl7VCZm4tJoY7-5Xe5hopVL18",
		authDomain: "equipsavy.firebaseapp.com",
		databaseURL: "https://equipsavy.firebaseio.com",
		storageBucket: "equipsavy.appspot.com",
		messagingSenderId: "254120319319"
	};
	firebase.initializeApp(config);

var X = XLSX;
var XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	rABS: './xlsxworker2.js',
	norABS: './xlsxworker1.js',
	noxfer: './xlsxworker.js'
};



function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

function to_csv(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
		if(csv.length > 0){
			// result.push("SHEET: " + sheetName);
			// result.push("");
			result.push(csv);
		}
	});
	return result.join("\n");
}



function process_wb(wb) {
	var output = "";
	// switch("json") {
	// 	case "json":
	// 		output = JSON.stringify(to_json(wb), 2, 2);
	// 		break;
	// 	case "form":
	// 		output = to_formulae(wb);
	// 		break;
	// 	default:
	// 	output = to_csv(wb);
	// }

  output = to_csv(wb);
	// if(out.innerText === undefined) out.textContent = output;
	// else
  {//out.innerText = output;
		alert(output);
//**********************Start of John Code**********************************

 var commaNumber=1;
 var outputNameString ="";

var inputString = "";//string that gets characters loaded into temporarily
var itemNum=0;//keeps track of which item number in list
var equipName=[];//equipname list
var equipAmount=[];//equipAmount list
var equipCheckoutTime=[];//equipCheckoutTime list

for (i=0; i<output.length; i++){//go through all file contents
  if (output.charAt(i)==','){//if a comma, splice

  if (commaNumber==1){//commanumber 1 means comma after name; 2 is after amount
    commaNumber=2;
    equipName.push(inputString);//add item name to position
    inputString="";//clear string
  }else{//commaNumber=2; after amount
    equipAmount.push(parseInt(inputString,10));//set amount for equipAmount
    inputString="";//clear string
    // commaNumber=1;
  }
}else if(output.charAt(i)=='\n'){//after item checkoutTime
  commaNumber =1;
  // inputString=(inputString.substring(0,length-2));
  equipCheckoutTime.push(parseInt(inputString,10));
  inputString="";//clear string
if(i<output.length-1)
  itemNum++;//increment itemNum
  }else {//not a comma or \n
    if (output.charAt(i)!='\r')//end of line is \r\n, so ignore \r
  inputString+=output.charAt(i);//adds character to string
  }

}
equipCheckoutTime.push(inputString);
console.log("Finished parsing, line 100\n");
for (i=0; i<=itemNum;i++){//uploads info to list
  firebase.database().ref('courses/CSE442/Equipment/'+equipName[i] ).set({
      item: equipName[i],
      amount: equipAmount[i],
      checkoutTime: equipCheckoutTime[i]
    });

}


//************************************************************End of John Code********************
	}


	if(typeof console !== 'undefined') console.log("output", new Date());
}


function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}

var fileInput = document.getElementById('fileInput');
function handleFile(e) {
	rABS = false;// document.getElementsByName("userabs")[0].checked;
	use_worker = false;//document.getElementsByName("useworker")[0].checked;
	var files = e.target.files;
	var f = files[0];
	{
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
			var data = e.target.result;
			if(use_worker) {
				xw(data, process_wb);
			} else {
				var wb;
				if(rABS) {
					wb = X.read(data, {type: 'binary'});
				} else {
				var arr = fixdata(data);
					wb = X.read(btoa(arr), {type: 'base64'});
				}
				process_wb(wb);
			}
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
	}
}

if(fileInput.addEventListener) fileInput.addEventListener('change', handleFile, false);
