 $(document).on("swipeleft", function () {
     console.log("test");
     alert("test");
 });

console.log(isTouchSupported());

function isTouchSupported() {
  try {  
    document.createEvent("TouchEvent");
    touch = true;
  } catch (e) {
    touch = false;
  }
  return touch;
}