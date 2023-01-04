fetch('../assets/js/meta.html')
.then(response => response.text())
.then((data) => {
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf('/')+1).replace(".html","");
  if (filename == ""){
    filename = "index";
  }
  const indivStylesheet = '<link rel="stylesheet" href="/assets/css/'+filename+'_style.css">';
  const origMeta = document.querySelector("head").innerHTML;
  document.querySelector("head").innerHTML = data+indivStylesheet+origMeta;
})

fetch('../assets/js/headernav.html')
.then(response => response.text())
.then((data) => {
  document.querySelector("#headernav-load").innerHTML = data;
})

fetch('../assets/js/footer.html')
.then(response => response.text())
.then((data) => {
  document.querySelector("#footer-load").innerHTML = data;
})