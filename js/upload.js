// Design By
// - https://dribbble.com/shots/13992184-File-Uploader-Drag-Drop

// Select Upload-Area
const uploadArea = document.querySelector("#uploadArea");

// Select Drop-Zoon Area
const dropZoon = document.querySelector("#dropZoon");

// Loading Text
const loadingText = document.querySelector("#loadingText");

// Slect File Input
const fileInput = document.querySelector("#fileInput");

// Select Preview Image
const previewImage = document.querySelector("#previewImage");

// Images Types
const allowedExtensions = [
  "docx",
  "docm",
  "doc",
  "pdf",
  "jpeg",
  "png",
  "svg",
  "gif",
];

// When (drop-zoon) has (dragover) Event
dropZoon.addEventListener("dragover", function (event) {
  // Prevent Default Behavior
  event.preventDefault();

  // Add Class (drop-zoon--over) On (drop-zoon)
  dropZoon.classList.add("drop-zoon--over");
});

// When (drop-zoon) has (dragleave) Event
dropZoon.addEventListener("dragleave", function (event) {
  // Remove Class (drop-zoon--over) from (drop-zoon)
  dropZoon.classList.remove("drop-zoon--over");
});

// When (drop-zoon) has (drop) Event
dropZoon.addEventListener("drop", function (event) {
  // Prevent Default Behavior
  event.preventDefault();

  // Remove Class (drop-zoon--over) from (drop-zoon)
  dropZoon.classList.remove("drop-zoon--over");

  // Select The Dropped File
  const file = event.dataTransfer.files[0];

  // Call Function uploadFile(), And Send To Her The Dropped File :)
  uploadFile(file);
});

// When (drop-zoon) has (click) Event
dropZoon.addEventListener("click", function (event) {
  // Click The (fileInput)
  fileInput.click();
});

// When (fileInput) has (change) Event
fileInput.addEventListener("change", function (event) {
  // Select The Chosen File
  const file = event.target.files[0];

  // Call Function uploadFile(), And Send To Her The Chosen File :)
  uploadFile(file);
});

// Upload File Function
function uploadFile(file) {
  // FileReader()
  const fileReader = new FileReader();
  // File Name
  const fileName = file.name;
  // File Type
  const fileType = file.type;
  // File Size
  const fileSize = file.size;

  // If File Is Passed from the (File Validation) Function
  if (fileValidate(fileName, fileSize)) {
    // Add Class (drop-zoon--Uploaded) on (drop-zoon)
    dropZoon.classList.add("drop-zoon--Uploaded");

    // Show Loading-text
    loadingText.style.display = "block";
    // Hide Preview Image
    previewImage.style.display = "none";

    // After File Reader Loaded
    fileReader.addEventListener("load", function () {
      // After Half Second
      setTimeout(function () {
        // Add Class (upload-area--open) On (uploadArea)
        uploadArea.classList.add("upload-area--open");

        // Hide Loading-text (please-wait) Element
        loadingText.style.display = "none";
        // Show Preview Image
        previewImage.style.display = "block";
      }, 500); // 0.5s

      // Add The (fileReader) Result Inside (previewImage) Source
      if (fileType.includes("image")) {
        previewImage.setAttribute("src", fileReader.result);
      } else {
        previewImage.setAttribute("src", "./assets/images/file.png");
      }
    });

    // Read (file) As Data Url
    fileReader.readAsDataURL(file);
  } else {
    // Else

    this; // (this) Represent The fileValidate(fileType, fileSize) Function
  }
}

// Simple File Validate Function
function fileValidate(name, fileSize) {
  // File Type Validation
  // If The Uploaded File Is An Image
  if (endsWithAny(name, allowedExtensions)) {
    // Check, If File Size Is 2MB or Less
    if (fileSize <= 2000000) {
      // 2MB :)
      return true;
    } else {
      // Else File Size
      return alert("Please your file should be 2 Megabytes or less");
    }
  } else {
    // Else File Type
    return alert("Please make sure to upload a valid file type");
  }
}

function endsWithAny(string, suffixes) {
  return suffixes.some(function (suffix) {
    return string.endsWith(suffix);
  });
}

// :)
