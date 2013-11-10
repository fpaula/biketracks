function startRobot(id){
  var url = 'http://localhost:8000/create';
  var index = 0;

  var interval = setInterval(function(){
    if (index === coords.length) {
      return;
    }
    var data = {};
    data.session_id = id;
    data.latitude = coords[index].split(',')[0];
    data.longitude = coords[index].split(',')[1];
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
    index += 1;
  }, 2000);
}

