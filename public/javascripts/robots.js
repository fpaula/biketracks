function startRobot(){
  var url = 'http://localhost:8000/create';
  var index = 0;

  setInterval(function(){
    var data = {};
    data.session_id = 1;
    data.latitude = coords[index].split(',')[0];
    data.longitude = coords[index].split(',')[1];
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      contentType: 'application/json'
    });
    index += 1;
  }, 2000);
}

