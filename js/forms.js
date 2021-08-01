$(function () {
  $("#success-toast").toast({
    autohide: true,
    delay: 2000,
  });

  $("#failed-toast").toast({
    autohide: true,
    delay: 4000,
  });
});

// get-in-touch
$("#get-in-touch-form").submit(function (event) {
  /* stop form from submitting normally */
  event.preventDefault();

  /* API URL HERE: */
  var API_URL = "";

  var formData = new FormData();

  var data = $("#get-in-touch-form")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      formData.append(item.name, item.value);
      return obj;
    }, {});

  //disable inputs
  $("#get-in-touch-form :input").prop("disabled", true);
  $("#get-in-touch-form :button").prop("disabled", true);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  // submit
  $.ajax({
    type: "POST",
    url: API_URL,
    success: function (data) {
      $("#success-toast").toast("show");
      $("#get-in-touch-form").trigger("reset");
      $("#get-in-touch-form :input").prop("disabled", false);
      $("#get-in-touch-form :button").prop("disabled", false);
    },
    error: function (error) {
      $("#failed-toast").toast("show");
      $("#get-in-touch-form :input").prop("disabled", false);
      $("#get-in-touch-form :button").prop("disabled", false);
    },
    async: true,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
  });
});

// subscribe
$("#subscribe-form").submit(function (event) {
  /* stop form from submitting normally */
  event.preventDefault();

  /* API URL HERE: */
  var API_URL = "";

  var formData = new FormData();

  var data = $("#subscribe-form")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      formData.append(item.name, item.value);
      return obj;
    }, {});

  //disable inputs
  $("#subscribe-form :input").prop("disabled", true);
  $("#subscribe-form :button").prop("disabled", true);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  // submit
  $.ajax({
    type: "POST",
    url: API_URL,
    success: function (data) {
      $("#success-toast").toast("show");
      $("#subscribe-form").trigger("reset");
      $("#subscribe-form :input").prop("disabled", false);
      $("#subscribe-form :button").prop("disabled", false);
    },
    error: function (error) {
      $("#failed-toast").toast("show");
      $("#subscribe-form :input").prop("disabled", false);
      $("#subscribe-form :button").prop("disabled", false);
    },
    async: true,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
  });
});
