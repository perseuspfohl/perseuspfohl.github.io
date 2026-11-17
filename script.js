document.getElementById("year").textContent = new Date().getFullYear();

(function () {
  var user = "perseuspfohl";
  var domain = "gmail.com";
  var link = document.getElementById("email-link");
  if (link) {
    link.href = "mailto:" + user + "@" + domain;
  }
})();
