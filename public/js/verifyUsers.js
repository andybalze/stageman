var messageIsShowing = false;
var expires;
$(function(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        
        $.ajax({
            type: 'post',
            url: '/api/users/verify',
            data: blockData,
            statusCode: {
                200: function(data){
                    if ($('#remember').is(':checked')) {
                        var now = new Date();
                        now.setTime(now.getTime() + (86400 * 30));    
                        expires =  now.toUTCString();
                    } else {
                        expires = 'session';
                    }
                    document.cookie = 'authJwt='+data.token + ';' +
                    '; expires=' + expires + 
                    '; path=\/';
                    window.location = '/index';
                },
                403: function() {
                    $('#password').val('')
                    $('#username').select().focus();
                    if (messageIsShowing)
                    { } else {
                        $( "<div class=\"alert alert-danger alert-dismissable\">" +
                        "<button type=\"button\" data-dismiss=\"alert\"" +
                         "aria-hidden=\"true\" class=\"close\">x</button>" +
                         "Username or Password Incorrect"+
                         "</div>" )
                        .click(function(){messageIsShowing = false;})
                        .insertBefore( ".form-1" );
                    messageIsShowing = !messageIsShowing;
                    }
                }
            }
        });
    });
});