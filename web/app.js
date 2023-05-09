const API = "https://api-vhsk.onrender.com";

$.get(`${API}/light`).then((response) => {
  response.forEach((lights) => {
    $(".lightcards").append(`
        <div class="card">
        <h2>${lights.deviceName}</h2>
        <p>Location: ${lights.location}</p>
        <p>Light State: ${lights.state}</p>
        <span>Color: </span>
        <div class="color" style="background-color:${lights.color}"></div>
      </div>`);
  });
});

$.get(`${API}/ac`).then((response) => {
  response.forEach((acs) => {
    $(".accards").append(`
        <div class="card">
        <h2>${acs.deviceName}</h2>
        <p>Location: ${acs.location}</p>
        <p>Ac State: ${acs.state}</p>
        <p>temperature: ${acs.temperature}</p>
        
      </div>`);
  });
});
$.get(`${API}/security`).then((response) => {
  response.forEach((sec) => {
    $(".seccards").append(`
        <div class="card">
        <h2>${sec.deviceName}</h2>
        <p>Location: ${sec.location}</p>
        <p>Camera State: ${sec.camera}</p>
        <p>Access: ${sec.access}</p>
        
      </div>`);
  });
});

$("#addlight").on("click", (event) => {
  event.preventDefault();
  const deviceName = $("#device-name").val();
  const location = $("#device-location").val();
  const state = $("#light-state").val();
  const color = $("#light-color").val();

  const body = {
    deviceName,
    location,
    state,
    color,
  };
  $.post(`${API}/light`, body)
    .then((response) => {
      location.href = "/lightning";
      console.log(done);
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.href = "/lightning";
});

$("#addac").on("click", (event) => {
  event.preventDefault();
  const deviceName = $("#device-name").val();
  const location = $("#device-location").val();
  const state = $("#ac-state").val();
  const temperature = $("#temperature").val();

  console.log(deviceName, location, state, temperature);

  const body = {
    deviceName,
    location,
    state,
    temperature,
  };

  $.post(`${API}/ac`, body)
    .then((response) => {
      location.href = "/ac";
      console.log(done);
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.href = "/ac";
});

$("#addsecurity").on("click", (event) => {
  event.preventDefault();

  const deviceName = $("#device-name").val();
  const location = $("#device-location").val();
  const camera = $("#camera").val();
  const access = $("#access").val();

  const body = {
    deviceName,
    location,
    camera,
    access,
  };

  $.post(`${API}/security`, body)
    .then((response) => {
      location.href = "/security";
      console.log(done);
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.href = "/security";
});

$("#updatelight").on("click", () => {
  const deviceName = $("#name").val();
  const state = $("#state").val();
  const color = $("#color").val();

  const body = {
    deviceName,
    state,
    color,
  };

  $.ajax({
    url: `${API}/light`,
    type: 'PUT',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/light";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
  
});

$("#updateac").on("click", () => {
  const deviceName = $("#name").val();
  const state = $("#state").val();
  const temperature = $("#temperature").val();

  const body = {
    deviceName,
    state,
    temperature,
  };

  $.ajax({
    url: `${API}/ac`,
    type: 'PUT',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/ac";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
  
});

$("#updatesec").on("click", () => {
  const deviceName = $("#name").val();
  const state = $("#state").val();
  const camera = $("#camera").val();
  const access = $("#access").val();

  const body = {
    deviceName,
    state,
    camera,
    access,
  };

  $.ajax({
    url: `${API}/security`,
    type: 'PUT',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/security";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
});

$("#deletelight").on("click", () => {
  const deviceName = $("#dname").val();

  const body = {
    deviceName,
  };

  $.ajax({
    url: `${API}/light`,
    type: 'DELETE',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/lightning";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
});
$("#deleteac").on("click", () => {
  const deviceName = $("#dname").val();

  const body = {
    deviceName,
  };

  $.ajax({
    url: `${API}/ac`,
    type: 'DELETE',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/ac";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
});
$("#deletesec").on("click", () => {
  const deviceName = $("#dname").val();

  const body = {
    deviceName,
  };

  $.ajax({
    url: `${API}/security`,
    type: 'DELETE',
    data: body,
    success: function(response) {
      console.log(response);
      location.href = "/security";
      window.location.reload();
    },
    error: function(error) {
      console.log(error);
    }
  });
});
