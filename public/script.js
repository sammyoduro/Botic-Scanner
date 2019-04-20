$(document).ready(function() {

  setInterval(function () {
    var url = '/eventasistapi/GetTickets';
    $.ajax({
       url         : url,
       type        : 'GET',
       dataType    : 'json',
       success     : function(data){

         var printout = "";
         printout+="<table class=\"table\"><thead><tr>";
         printout+="<th scope=\"col\">#</th><th scope=\"col\">Ticket pins</th>";
         printout+="<th scope=\"col\">Verified</th>"
         printout+="<th scope=\"col\">Timestamp</th></tr></thead><tbody>";

         $('#num_verified').text(data.data.length);
         for (var i = 0; i < data.data.length; i++) {
           printout+="<tr><th scope=\"row\">"+i+"</th>";
           printout+="<td>"+data.data[i].ticket_pin+"</td>";
           printout+="<td>"+data.data[i].verified+"</td>";
           printout+="<td>"+data.data[i].timestamp+"</td></tr>";
         }
         printout+="</tbody></table>";
         $('#ticket_list').html(printout);
       }
     });
  },1000)
})
