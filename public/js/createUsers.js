$(function(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        
        $.ajax({
          type: 'post',
          url: '/api/users/create',
          data: blockData,
          statusCode: {
              201: function(data){
                  window.location = '/signup?status=confirm';
              }
          }
        });
    });
});