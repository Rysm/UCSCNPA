//User account authentication and creation
//Implemented by Andy

.controller('regCtrl'){
    
    
}

var ref = new Firebase("https://ucscnpa.firebaseio.com"); //link to my firebase URL
ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account for:", userData.uid);
  }
});