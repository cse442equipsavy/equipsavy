#EquipSavy

<<<<<<< HEAD
####Made by Sai Akhil Pendyala, Satya Kranthi Penumanchili, Thalaikya Voggu, John Fincken, Tristan Syre and Abhinav Mahajan
=======
####Made by Sai Akhil Pendyala, Satya Kranthi Penumanchili, Thalaikya Voggu, John J Fincken, Tristan Syre and Abhinav Mahajan
>>>>>>> master
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

##Software:
-	Used a firebase console as the backend to the website.
-	Firebase has a built-in authentication which allow different users different levels of access into the site.
-	We also used firebase’s real-time database to store data such as equipment name and quantity.

##External Library Reference:
-https://github.com/SheetJS/js-xlsx
This library was used in order to upload files in a multitude of formats including xlsx, the default format for Microsoft Excel files
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
