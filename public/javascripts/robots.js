var coord_list = [coords1, coords2, coords3, coords4];

function Robot(id, coords) {
  this.id = id;
  this.coords = coords;
  this.start = function() {
    var url = '/create';
    var index = 0;
    var interval = setInterval(function(){
      if (index === coords.length) {
        return;
      }
      var data = {};
      data.session_id = id;
      data.latitude = coords[index].split(',')[1];
      data.longitude = coords[index].split(',')[0];
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json'
      });
      index += 1;
    }, 2000);
    return interval;
  }
}

$(document).ready(function(){
  $('.start').click(function(){
    var element = $(this);
    var robot_id = parseInt(element.data('robot-id'), 10);
    element.addClass('disabled');
    var robot = new Robot(robot_id, coord_list[robot_id - 1]);
    var interval_id = robot.start();
    element.data('interval-id', interval_id);
    element.siblings('.stop').removeClass('disabled');
  });

  $('.stop').click(function(){
    var element = $(this).siblings('.start');
    var interval_id = parseInt(element.data('interval-id'), 10);
    element.removeClass('disabled');
    $(this).addClass('disabled');
    clearInterval(interval_id);
  });
});