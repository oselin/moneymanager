//AT LOADING----------------
var d = new Date();
var today = d.getUTCFullYear() + "-" + (d.getUTCMonth()+1) + "-" + onfewdays() + d.getUTCDate();
document.getElementById("demo").value = today.toString();
var cat = ['importo','causale','date','type'];
var opt = ['SPESA','BAR E VITA SOCIALE','MENSA','REGALI','TRASPORTI','PERSONALE','ALTRO'];
var username = "pier";
var config = {
  apiKey: "AIzaSyCxLT_IvAIG_wti8xgeZIQgA6d16n2iq_E",
  authDomain: "moneymanager-74306.firebaseapp.com",
  databaseURL: "https://moneymanager-74306.firebaseio.com",
  projectId: "moneymanager-74306",
  storageBucket: "moneymanager-74306.appspot.com",
  messagingSenderId: "317957403208",
  appId: "1:317957403208:web:2b233f2b7940c322fdde7d",
  measurementId: "G-2X130YCLMP"
};

//MANAGE HTML
function onfewdays(){
  if (d.getUTCDate()<10){return "0";}
  else {return "";}
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
function changePayment(){
  var conto = document.getElementById("conto");
  if (conto.value=="CONTANTI"){conto.value="CARTA";}
  else if (conto.value=="CARTA"){conto.value="CONTANTI";}
}
function changePage(page){
  if (page.id=="first"){pageHider('firstpage',['secondpage','thirdpage']);
  }else if (page.id=="second"){pageHider('secondpage',['firstpage','thirdpage']);manageData(firestore,[],'DISPLAY');
  }else{pageHider('thirdpage',['secondpage','firstpage']);}
}
function pageHider(show,hide){
  document.getElementById(show).style.display = 'block';
  for (var i=0; i<hide.length;i++){document.getElementById(hide[i]).style.display = 'none';}
}
function sendData(){
  var importo = document.getElementById('importo').value;
  var giorno = document.getElementById('demo').value;
  
  var e = document.getElementById("causale");
  var causale = e.options[e.selectedIndex].text;
  
  if ((importo!="") && (giorno!="") && (causale!="")){      
    var conto = document.getElementById("conto").value;
    var data = [importo,causale,giorno,conto];
    manageData(firestore,data,'POST');
    document.getElementById('importo').value ="";
    document.getElementById('demo').value=today.toString();
    document.getElementById('causale').value=1;
  }

}


//------------------------------------------------------------------------------------------------

//-----------------------DBDEALDER----------------------




function manageData(dbase,data,action){
  dbase.doc("users/"+username).get().then(function(doc){
      var path = doc.data().db;
      var counter = doc.data().count +1;
      if (action == 'POST'){postData(dbase,path,counter,data);}
      else if (action == 'DISPLAY'){displayData(dbase,path,data,0);}
      
  }

  ).catch(function(err){console.log(err);});
  
}
function postData(db,path,counter,data){
  
  db.doc(path+'/'+cat[0]).set({[counter] : data[0]},{ merge: true }).catch(function(err){console.log(err);});
  db.doc(path+'/'+cat[1]).set({[counter] : data[1]},{ merge: true }).catch(function(err){console.log(err);});
  db.doc(path+'/'+cat[2]).set({[counter] : data[2]},{ merge: true }).catch(function(err){console.log(err);});
  db.doc(path+'/'+cat[3]).set({[counter] : data[3]},{ merge: true }).catch(function(err){console.log(err);});

  db.doc('users/'+username).set({count : counter},{ merge: true }).catch(function(err){console.log(err);});


}
//GET DATA
function displayData(db,path,data,counter){ 
  db.doc(path+'/'+cat[counter]).get()
      .then(function(querySnapshot) {
          data.push(querySnapshot.data());            
          if (counter<3){
              displayData(db,path,data,counter+1);
          }else{tabler(data);}
        });
}
function tabler(data){
  var table = document.getElementById("tab");
  table.innerHTML ="";
  var counter = 0;
  for (var key in data[0]) {
      var row = table.insertRow(counter);
      for (var d=0; d < data.length; d++){
          var cell = row.insertCell(d);
          cell.innerHTML = data[d][key];
      }
      counter +=1;
      
  }

}



function displayChart(){
  var chart = new CanvasJS.Chart("thirdpage", {
    animationEnabled: true,
    title: {text: "Desktop Search Engine Market Share - 2016"},
    data: [{type: "pie",startAngle: 240, yValueFormatString: "##0.00\"%\"",indexLabel: "{label} {y}",dataPoints: []}]
  });
  chart.render();
}

function setDataChart(data,causale){
  var cat1,cat2,cat3,cat4,cat5,cat6, cat7 = 0;
  var tot = 0;
  for (var i=0;i<data,length;i++){
    if (causale[i]==opt[0]){cat1+=data[i];}
    else if (causale[i]==opt[1]){cat2+=data[i];}
    else if (causale[i]==opt[2]){cat3+=data[i];}
    else if (causale[i]==opt[3]){cat4+=data[i];}
    else if (causale[i]==opt[4]){cat5+=data[i];}
    else if (causale[i]==opt[5]){cat6+=data[i];}
    else if (causale[i]==opt[6]){cat7+=data[i];}
    tot +=data[i];
  }
  
}
