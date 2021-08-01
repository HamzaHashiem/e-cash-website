var reCaptchaIsValid = false;

$(function () {
  $("#recaptcha-toast").toast({
    autohide: true,
    delay: 4000,
  });

  $("#success-toast").toast({
    autohide: true,
    delay: 2000,
  });

  $("#failed-toast").toast({
    autohide: true,
    delay: 4000,
  });

  window.grecaptcha.ready(function () {
    grecaptcha.render("form-recaptcha", {
      sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      callback: correctCaptcha,
    });
  });
});

function correctCaptcha(response) {
  reCaptchaIsValid = response ? true : false;
}

function resetFile(fileInput) {
  var uploadArea = document.querySelector("#uploadArea");
  var loadingText = document.querySelector("#loadingText");
  var previewImage = document.querySelector("#previewImage");
  var dropZoon = document.querySelector("#dropZoon");
  uploadArea.classList.remove("upload-area--open");
  loadingText.style.display = "none";
  previewImage.style.display = "none";
  dropZoon.classList.remove("drop-zoon--Uploaded");
  if (fileInput && fileInput.files && fileInput.files[0]) {
    fileInput.value = "";
  }
}

// careers
$("#careers-form").submit(function (event) {
  /* stop form from submitting normally */
  event.preventDefault();

  if (!reCaptchaIsValid) {
    $("#recaptcha-toast").toast("show");
    return;
  }

  /* API URL HERE: */
  var API_URL = "";

  var formData = new FormData();

  var data = $("#careers-form")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      formData.append(item.name, item.value);
      return obj;
    }, {});

  var fileInput = document.querySelector("#careers-form #fileInput");

  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append("File", fileInput.files[0]);
  }

  //disable inputs
  $("#careers-form :input").prop("disabled", true);
  $("#careers-form :button").prop("disabled", true);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  // submit
  $.ajax({
    type: "POST",
    url: API_URL,
    success: function (data) {
      $("#success-toast").toast("show");
      $("#careers-form").trigger("reset");
      resetFile(fileInput);
      $("#careers-form :input").prop("disabled", false);
      $("#careers-form :button").prop("disabled", false);
    },
    error: function (error) {
      $("#failed-toast").toast("show");
      $("#careers-form :input").prop("disabled", false);
      $("#careers-form :button").prop("disabled", false);
    },
    async: true,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
  });
});
