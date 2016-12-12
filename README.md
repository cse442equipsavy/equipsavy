#EquipSavy

####Made by Sai Akhil Pendyala, Satya Kranthi Penumanchili, Thalaikya Voggu, John Fincken, Tristan Syre and Abhinav Mahajan
![](/images/equipsavy.gif?raw=true "Loginpage")
![](/images/git.jpg?raw=true "Loginpage")
######Semi working web version : <a target="_blank" href="http://equipsavy.000webhostapp.com/">EquipSavy</a>

##Overview:
Equipsavy is a web application with the functionality to share equipment effectively in a class. To Log onto the website, first log onto
firebase console, add a user in the authentication using email and password and then you can log into the website. It achieves this mainly
by providing three levels of access: Instructor, Student, and Department. The user logs in and, based on what they are assigned, are able
to do different things. The student can select his/her class s/he wishes to reserve equipment for and then reserve all pieces of equipment
they think is necessary, at that point, it will be sent to the instructors to be approved or denied. Instructors can add pieces of
equipment to the courses that they teach, either by adding a .csv file with equipment and quantity, an .xlsx file, or submitting each piece
of equipment individually. Teaching assistants are unique in that they have the access of both the students and instructors. The department
page allows department members to add or cancel classes, add instructors to those classes, and add TA’s to a class.

##Student features:
- able to select a class to reserve equipment for
- able to reserve 1 of all necessary pieces of equipment

##Instructor features:
-	Choose a class to look over.
-	Able to submit new pieces of equipment individually or in groups using .csv or .xlsx
	*To upload an equipment list the format must be a spreadsheet with the first column the item name, the second column the amount of the item, and the third column the amount of time the item can be checked out.
	*For example, for 1 laptop that can be checked out for 3 days, the row with that information would be "Laptop,1,3" where the commas represent the separation of columns.
-	Able to approve or deny students requests for equipment.
-	Able to track which student has which piece of equipment.
-	Can add/remove  TA’s from a class

##Department features:
-	Can add/remove instructors from a course

##External Library Reference:
-https://github.com/SheetJS/js-xlsx
This library was used in order to upload files in a multitude of formats including xlsx, the default format for Microsoft Excel files
Contact GitHub API Training Shop Blog About

##For Sofwatre Developers:
-	We have uitilized firebase for backend of website.
-	Programming languages used are JavaScript, HTML and CSS.
-	We also used firebase’s real-time database to store data such as equipment name and quantity.
-	We utilized firebase's authentication.
-	For authentication, we have implemeneted role wise authentication. We gave different role values for department, student, TA and insturctor accounts. Depending upon the role value, the login page redirects users such as TA, students and instructors to there respective course details pages, while the department page is redirected to the department page.
-	In the department page, a user with department access can add or remove instructors from courses. It can also be used to create courses. When a course is added to a instructor, it updates the instructor course pages in the database thus giving the insturctor access to particular course's equipment page.
-	Instructors upon choosing a course are redirected to the selected course's edit page. Here the instructor can upload the equipment using an excel file. This will upload the equipment details under the particular course. Insturctor also has access to approve equipment reservation requests and track equipment. Instructor can also add/remove TA access to users. Adding a TA would change the user's role value if the user isn't TA before and updates his instructor courses. Removing a TA would update their role value and also removes course from his instructor courses.
-	Upon selecting a course, students are redirected to the reserve page, where the available equipment and their amounts are displayed. Studet users can select the equipment and request to reserve it.
-	TA's upon selecting the course are redirected to the edit materials page but the only difference from an instructor edit materials page is that, TA's do not have access to the add/remove TA option. Here TA's have access to edit or upload new set of equipment. Reservation requests can be approved or declined. Upon approving a request, the TA would have toenter the start and end dat eof the reservation. The TA need to let the student know through his school email. Under the tracking option, TA's can look at the users and the equipment they borrowed along with start and end date details.
-	The entire functionality of authentication,  database are written in JavaScript and is available in app.js file.

© 2016 GitHub, Inc. Terms Privacy Security Status Help
