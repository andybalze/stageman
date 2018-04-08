var strength = {
    0: "Worst ☹",
    1: "Bad ☹",
    2: "Weak ☹",
    3: "Good ☺",
    4: "Strong ☻"
};
var password = document.getElementById('password');
var rePassword = document.getElementById('re-password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');
var message = document.getElementById('confirmMessage');
var username = document.getElementById('username');
var userTaken = document.getElementById('userTaken');
var email = document.getElementById('email');
function checkPass() {
    var val = password.value;
    var result = zxcvbn(val);
    
    if((result.score >= "3") && (password.value === rePassword.value)) {
        enable();
        message.innerHTML = "";
    } else if(password.value != rePassword.value) {
        message.innerHTML = "Passwords Do Not Match!";
    } else {
        disable();
        message.innerHTML = "";
    }
    // Update the password strength meter
    meter.value = result.score;
    
    // Update the text indicator
    if(val !== "") {
         text.innerHTML = "Strength: " 
         + "<strong>" 
            + strength[result.score] 
         + "</strong>" + " " 
         + "<span class='feedback'>" 
            + result.feedback.warning + " "
            + result.feedback.suggestions 
         + "</span"; 
    }
    else {
         text.innerHTML = "";
    }
}

function disable() {
   $("#button").addClass( "disabled" )
   $('input[type="submit"]').attr('disabled','disabled');
}

function enable() {
    $("#button").removeClass("disabled");
    $('input[type="submit"]').removeAttr('disabled');
}

disable();
rePassword.addEventListener('input', function() { checkPass(); }); 
password.addEventListener('input', function() { checkPass(); });
username.addEventListener('focusout', function() { 
    var form = $(this);
    var blockData = form.serialize();
    $.ajax({
      type: 'post',
      url: '/api/users/validate',
      data: blockData,
      success: function(response, status, xhr){ 
        if(response.valid == 'true') {
            userTaken.innerHTML = '';
        } else {
            userTaken.innerHTML = 'Username already in use';
        }
      }
    });
});
email.addEventListener('focusout', function() { 
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    function validate() {
      $("#result").text("");
      var email = $("#email").val();
      if (validateEmail(email)) {
        $("#result").text(email + " is valid :)");
        $("#result").css("color", "green");
      } else if(email == "") {
          $("#result").text("");
      }
      else {
        $("#result").text(email + " is not valid :(");
        $("#result").css("color", "red");
      }
      return false;
    }
    
    validate();
    
    $("form").bind("submit", validate);

});