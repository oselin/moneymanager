var d = new Date();
function onfewdays(){
  if (d.getUTCDate()<10){return "0";}
  else {return "";}
}
var today = d.getUTCFullYear() + "-" + (d.getUTCMonth()+1) + "-" + onfewdays() + d.getUTCDate();
document.getElementById("demo").value = today.toString();


function inout(){
  var temp = document.getElementById("inout");
  if (temp.value=="+"){temp.value="-";}
  else if (temp.value=="-"){temp.value="+";}
}

function run(){
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbynH61NIeESnVAz6XKjLF2eRQbAiDonnKEGTUP_dImI6lDlqmuw/exec";
  $(document).ready(function() {
      $.getJSON(SCRIPT_URL+"?callback=?",
              {method:"populate_list"},
              function (data) { 
                  alert(JSON.stringify(data)); 
              });
  })
  }
function onTap(e){
  opacity = document.getElementById(e.id).style.opacity;
  var ids = ['income','recap','exp'];
  if (opacity=='0.5'){
    document.getElementById(e.id).style.opacity = "1.0";
    var i;
    for (i=0; i<3;i++){
      if (ids[i]!=e.id){
        document.getElementById(ids[i]).style.opacity = "0.5";
      }
    }
  }  

}

function changeType(){
  var conto = document.getElementById("conto");
  if (conto.value=="CONTANTI"){conto.value="CARTA";}
  else if (conto.value=="CARTA"){conto.value="CONTANTI";}
}

function sendData(){
  var months = ["TOTALE","Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  var importo = document.getElementById('importo').value;
  var giorno = document.getElementById('demo').value;
  
  var e = document.getElementById("causale");
  var causale = e.options[e.selectedIndex].text;
  
  if ((importo!="") && (giorno!="") && (causale!="")){      
    var conto = document.getElementById("conto").value;
    var data = [importo,giorno,causale,conto, months[giorno.substr(5, 2)]];
    SRDSsender(data);
    document.getElementById('importo').value ="";
    document.getElementById('demo').value=today.toString();
    document.getElementById('causale').value=1;
  }

}

function SRDSsender(param){
  var main_url = "http://script.google.com/macros/s/AKfycbxqteW0oDSY6yuI85L8WHuj6OgLAkaQt7eFws0kYGz9/exec";
  var link = main_url + "?importo=" + param[0] + "&giorno=" + param[1] + "&causale=" + param[2] + "&conto=" + param[3] + "&pagina=" + param[4] + "&callback=?";
  

  var google = new XMLHttpRequest();
  google.open("GET", link, true);
  //google.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//Access-Control-Allow-Headers: Accept
  google.send();
  //window.location.href = link;
  //window.open(link);
}


/*
importo=200&giorno=10/10/2019&causale=ALTRO&conto=CARTA&pagina=Novembre

*/