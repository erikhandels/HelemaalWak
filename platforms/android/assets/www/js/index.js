
localStorage.setItem('eerstestart', 'ja' ); //voor testen met introscherm aanzetten

function wekkerinstellen(){

  $("#wekkerinstelview").show(0);
}

function showConfirm() {
      navigator.notification.confirm(
            'Weet u zeker dat u HelemaalWak wilt verlaten?', // message
             onConfirm,            // callback to invoke with index of button pressed
            'Verlaat ons niet!',           // title
            ['Annuleren','Afsluiten']         // buttonLabels
        );
    }

	function onConfirm(buttonIndex) {

		if (buttonIndex == 1 ) {

		return false;

		}

		else {

		navigator.app.exitApp();

		}
    }

function tijdopslaan(){
  localStorage.setItem('alarmtijd2', window.alarmtijd);
  console.log(localStorage.getItem('alarmtijd2'));
  //sla de ingestelde tijd op
  if($('#wekkernaaminput').val()){

    window.wekkernaam = $('#wekkernaaminput').val();
  }else{
    window.wekkernaam = "Wekker";
  }
  localStorage.setItem('wekkernaam', window.wekkernaam);
  refreshview();
}

function selectcontact(){
$('#selectcontact').show(0);
$('.slider').delay(500).hide(0);
}


function nummeropslaan(){
$('#appcontain').show(0);
$('#selectcontact').delay(500).hide(0);

var messageInfo = {
    phoneNumber: window.telefoonnummer,
    textMessage: "Ik heb je zojuist binnen de wekker-app 'HelemaalWak' ingesteld als mijn wake-up buddy."
};

sms.sendMessage(messageInfo, function(message) {
    console.log("success: " + message);
}, function(error) {
    console.log("code: " + error.code + ", message: " + error.message);
});

}

function kiescontact() {

	window.plugins.PickContact.chooseContact(function (contactInfo) {
    window.telefoonnummer = (contactInfo.phoneNr);
	window.lidnaam = (contactInfo.displayName);
	$('.kiescontactknop').replaceWith('<button onclick="kiesnieuwcontact();" style="width:100%; margin-bottom: 15px;" class="btn-large blauw kiescontactknop">Kies opnieuw</button>');
	$('.gekozencontact').append("<p class='gekozentekst flow-text'>Je hebt gekozen voor: </p><div class='col s12 np'><span class='lidnaam flow-text'>" + window.lidnaam + "</span><br><span class='lidtelefoonnummer flow-text'>" + window.telefoonnummer + "</span></div><div class='divider'></div>");

	$('button#nummeropslaan').show();

Materialize.toast('Contactpersoon geselecteerd!', 2500);

});
}

function kiesnieuwcontact() {

	window.plugins.PickContact.chooseContact(function (contactInfo) {
    window.telefoonnummer = (contactInfo.phoneNr);
	window.lidnaam = (contactInfo.displayName);
	$('.gekozencontact .lidnaam').replaceWith("<span class='lidnaam flow-text'>" + window.lidnaam + "</span>");
	$('.gekozencontact .lidtelefoonnummer').replaceWith("<span class='lidtelefoonnummer flow-text'>" + window.telefoonnummer + "</span>");
	Materialize.toast('Contactpersoon geselecteerd!', 2500);
	});
}

          $('body').on('click', '.collection-item', function(e) {
           e.preventDefault();
               e.stopImmediatePropagation();
               $(".collection-item i").attr("class", "mdi-toggle-radio-button-off");
               $(this).find("i").attr("class", "mdi-toggle-radio-button-on");
               window.opgeslagennummer = $(this).find("p").html();

               //$( "#iksnaphet" ).attr('class', 'waves-effect btn-large blue darken-4 blue-text text-lighten-5');
               //$( "#iksnaphet" ).html('Opslaan');
               //$( "#iksnaphet" ).attr('onclick', "slacontactop();");
          });

          function refreshview(){

                    $('.wekkernaamplaats').html(localStorage.getItem('wekkernaam'));
                    $('#ingesteldetijd').html(localStorage.getItem('alarmtijd2'));

                    $.getJSON("http://i264371.iris.fhict.nl/api/wak/uitlezen.php", function(data){
                       /*console.log("alles" + data);
                       console.log("totaal = " + data.totaalsnooze); // overflow
                       console.log("goed = " + data.goed);   // value
                       console.log("matig = " + data.matig);
                       console.log("slecht = " + data.slecht);
                       console.log("fasegoedvoel = " + data.fasegoedvoel);
                       console.log("bericht = " + data.bericht);*/

                       $("#goed").html(data.goed);
                       $("#matig").html(data.matig);
                       $("#slecht").html(data.slecht);
                       $("#best").html("Jij voelt je 's ochtends het beste na " + data.fasegoedvoel + " keer snoozen");


                     });


                }

    function introview(){
      $('#appcontain').hide(0);

      console.log("view ingezet");
    }

    function eerstestart(){
            console.log("eerstestart");
            localStorage.setItem('eerstestart', 'nee' );
            localStorage.setItem('totaalgevoel', 0);
            localStorage.setItem('totaalopslaan', 0);
            localStorage.setItem('gemiddeldgevoel', 0);
            introview();
            $.get("http://i264371.iris.fhict.nl/api/wak/dbaanmaken.php", function(data){
               console.log(data);
             });

          }

    if(localStorage.getItem('eerstestart') != 'nee'){
      eerstestart();
    }else{
      console.log("eerste start is wel nee");
      refreshview();
      $('.slider').hide(0);

    }

  /*  function ophalen(value){
      localStorage.getItem('slecht');
      localStorage.getItem('matig');
      localStorage.getItem('goed');
    }*/

    function opslaan(){
      Materialize.toast('Opgeslagen <a onclick=&quot;naaralarm();&quot; class=&quot; waves-effect waves-light btn-flat red-text&quot; href=&quot;#!&quot;>Opnieuw<a>', 4000);
      $('ul.tabs').tabs('select_tab', 'statview');

      var aantalopslaanoud = parseInt(localStorage.getItem('totaalopslaan'));
      console.log("aantalopslaanoud is " + aantalopslaanoud);

      var aantalopslaannieuw = aantalopslaanoud + 1;
      console.log("aantalopslaannieuw is " + aantalopslaannieuw);

      localStorage.setItem('totaalopslaan', aantalopslaannieuw );
      console.log("totaalopslaan is " + localStorage.getItem('totaalopslaan'));

      var selectie = parseInt( $('img.disabled').attr('value') );
      console.log("selectie is " + selectie);

        console.log("localstorage is " + localStorage.getItem('totaalgevoel'));
        totaaloud = parseInt( localStorage.getItem('totaalgevoel') );
        console.log("totaaloud is  " + totaaloud);

        totaalnieuw = parseInt(totaaloud + selectie);
        console.log("totaalnieuw is " + totaalnieuw);

        localStorage.setItem('totaalgevoel', totaalnieuw);
        console.log("totaalgevoel is " + localStorage.getItem('totaalgevoel'));

        var gemiddeldgevoel = Math.round( parseInt( (localStorage.getItem('totaalgevoel')) / (localStorage.getItem('totaalopslaan')) ) );
        console.log("gemiddeldgevoel is " + gemiddeldgevoel);
        localStorage.setItem('gemiddeldgevoel', gemiddeldgevoel);


    }

    /*------------------------timepicker------------------*/

    function update_alarm(type,direction) {
    switch(type){
    case "h":
    var h =parseInt(document.getElementById('h1').value);

    if(direction =='up'){
    h=h+1;}
    if(direction =='down'){
    h=h-1;}
    if(h >23){
      h=0;
      }
    if(h <0){h=23;}

    h=h.toString();
    if(h.length < 2){
    var h='0'+h;
    }
    document.getElementById('h1').value =  h;
    break;

    case "m":
    var m =parseInt(document.getElementById('m1').value);

    if(direction =='up'){
    m=m+1;}
    if(direction =='down'){
    m=m-1;}

    if(m > 59){m=0;}
    if(m < 0){m=59;}

    m=m.toString();
    if(m.length < 2){
    var m='0'+m;
    }
    document.getElementById('m1').value =  m;

    break;


  } // end of switch if press save
    window.alarmtijd = document.getElementById('h1').value + ':' + document.getElementById('m1').value;
    console.log(window.alarmtijd);
     }



window.my_media_fase1 = null;
window.my_media_fase2 = null;
window.my_media_fase3 = null;
var telefoontijd;
var telefoontijduur;
var telefoontijdminuut;
window.x = document.getElementById("ingesteldetijd").value;
var date = new Date();
var uur = date.getHours();
var minuut = date.getMinutes();
window.counter = 1;
var fase = 0;

//WEKKER CODE FASE 1 //
window.fase1_URL;
window.fase2_URL;
window.fase2_URL;


/*var my_media = null;
var mp3URL = getMediaURL("sounds/fase1.mp3");
var my_media = new Media(mp3URL, null, mediaError);*/

window.timer = null;
window.timer1 = null;
window.timer2 = null;

function flash() {
window.plugins.flashlight.toggle();
}

function vibratie() {
window.navigator.vibrate([200, 100, 200]);
}

function stopmp3() {
  window.my_media_fase1.stop();
  window.my_media_fase2.stop();
  window.my_media_fase3.stop();
//console.log('STOP WEKKER');
}

//EINDE WEKKER CODE FASE 1 //

function vibratieuit() {
window.navigator.vibrate([0, 0, 0]);
}

function flashuit() {
window.plugins.flashlight.switchOff();
}

function wekkeraanfase1() {

$('.alarmtijd').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x +"</span></p>");


fase = 1;
//$("#togglewekker").prop('checked', true);
//console.log('Fase ' + fase +'= ' + fase1_URL);
wekkeraan();
window.counter = 0;

}

function wekkeraanfase2() {

fase = 2;
//$("#togglewekker").prop('checked', true);
//console.log('Fase ' + fase +'= ' + fase2_URL);
wekkeraan();
window.counter = 0;

}

function wekkeraanfase3() {

fase = 3;
//$("#togglewekker").prop('checked', true);
//console.log('Fase ' + fase +'= ' + fase3_URL);
wekkeraan();
window.counter = 0;

}

function mediaError(e) {
//console.log("MEDIA ERROR");
}


// wekker aan
function wekkeraan(){
//console.log("wekker aan gestart");

//if(document.getElementById('togglewekker').checked) {
//console.log("if checked gestart");
window.counter = window.counter + 1;

$('#alarmview').show('fast');
flash();

window.timer = setInterval(function() {
flash()}, 750);

vibratie();

window.timer2 = setInterval(function() {
vibratie()}, 1000);

//console.log("fase bij wekkeraan() is" + fase);

if (fase == 1) {
play_fase1_mp3();
}

if (fase == 2) {
play_fase2_mp3();
}

if (fase == 3) {
play_fase3_mp3();
}

fase = 0;

}

//}

function play_fase1_mp3() {
  window.my_media_fase1.play();
//console.log("fase 1 speelt af");

}
function play_fase2_mp3() {
  window.my_media_fase2.play();
//console.log("fase 2 speelt af");
}

function play_fase3_mp3() {
  window.my_media_fase3.play();
//console.log("fase 3 speelt af");
}

function snooze() {

/*$("#togglewekker").prop('checked', false);*/

clearInterval(window.timer);

flashuit();

clearInterval(window.timer2);

vibratieuit();

window.counter = 0;

stopmp3();

$("#alarmview").hide();

console.log.snooze1 = localStorage.getItem('alarmtijd2');

}

//wekker uit

function wekkeruit(){

/*$("#togglewekker").prop('checked', false);*/

clearInterval(window.timer);

flashuit();

clearInterval(window.timer2);

vibratieuit();

window.counter = 0;

stopmp3();

$('.alarmtijd').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x +"</span></p>");

}

//telefoontijd

function wekkerafgaan() {

   	var telefoontijd;
	var telefoontijduur;
	var telefoontijdminuut;
	//window.x = document.getElementById("ingesteldetijd").value;
  window.x = localStorage.getItem('alarmtijd2');
	var date = new Date();
    var uur = date.getHours();
    var minuut = date.getMinutes();

    	if (String(uur).length <= 1 ) {

    	var telefoontijduur ='0' + uur;
		//console.log('Enkel uur');

    }  	else {

    	var telefoontijduur = uur;
		//console.log('Dubbel uur');

    }  	if (String(minuut).length <= 1) {

    	var telefoontijdminuut ='0' + minuut;
		//console.log('Enkele minuut');

    }  	else {

    	var telefoontijdminuut = minuut;
		//console.log('Dubbele minuut');

    }

    	telefoontijd = telefoontijduur + ':' + telefoontijdminuut;

    	//console.log ('Telefoontijd is ' + telefoontijd + ' en wekkertijd is ' + x);


		if (telefoontijd == window.x) {

		if (window.counter == 1) {

		wekkeraanfase1();

		}


		}

	}

function naarstatistieken(gevoel){
  console.log(gevoel);
    window.dbfase = 1; /*-----------------HIER MOET DE HUIDIGE FASE IN GEZET WORDEN------------------*/

    $.get("http://i264371.iris.fhict.nl/api/wak/opslaan.php?fase=" + window.dbfase + "&gevoel=" + gevoel, function(data){
       console.log(data);
     });

  $('#alarmview').hide(0);
  $('ul.tabs').tabs('select_tab', 'statview');
  refreshview();
}


$( document ).ready(function() {

	//aanroepen UIfunctionaliteiten
  $('select').material_select();
    $('ul.tabs').tabs();
    $('.slider').slider({
      full_width: true,
      transition: 500,
      interval: 900000,
      });

	setInterval(function(){

	//console.log(window.counter);

	wekkerafgaan();

	}, 500);

	$('.telefoontijd').append('Het is nu: ' + telefoontijd);
	$('.alarmtijd').append('Het is nu: ' + window.x);

/*	$("#ingesteldetijd").on("input", function() {
	$("#togglewekker").prop('checked', true);

	});*/

	window.checker = true;
	console.log(window.checker);

	$('#wekkertoggle').click(function() {

	$(this).toggleClass('blauwmaken');

	});

	$('.blauwmaken').click(function() {

	window.checker = false;
	console.log(window.checker);

	});


});//einde doc.reacy


// NFC CODE //

var app = {
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
    },


    deviceready: function () {
      $(".contacten").html('<div class="row center-align"><div style="margin-top:50px;" class="preloader-wrapper center-align big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>');



	document.addEventListener("backbutton", onBackKeyDown, false);

	function onBackKeyDown() {

	showConfirm();

	}


      function getMediaURL(s) {
      if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
      return s;
      }


      window.fase1_URL = getMediaURL("sounds/fase1.mp3");
      window.my_media_fase1 = new Media(fase1_URL, null, mediaError);


      //WEKKER CODE FASE 2 //


      window.fase2_URL = getMediaURL("sounds/fase2.mp3");
      window.my_media_fase2 = new Media(fase2_URL, null, mediaError);


      //WEKKER CODE FASE 3 //


      window.fase3_URL = getMediaURL("sounds/fase3.mp3");
      window.my_media_fase3 = new Media(fase3_URL, null, mediaError);


        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }

        nfc.addNdefListener(
            app.onNdef,
            function() {
                //console.log("Listening for NDEF tags.");
            },
            failure
        );

        if (device.platform == "Android") {

            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                app.onNfc,
                function() {
                    //console.log("Listening for non-NDEF tags.");
                },
               failure
            );

            // Android launches the app when tags with mime type text/pg are scanned
            // because of an intent in AndroidManifest.xml.
            // phonegap-nfc fires an ndef-mime event (as opposed to an ndef event)
            // the code reuses the same onNfc handler
            nfc.addMimeTypeListener(
                'text/pg',
                app.onNdef,
                function() {
                    //console.log("Listening for NDEF mime tags with type text/pg.");
                },
                failure
            );
        }

        app.compileTemplates();
        app.addTemplateHelpers();
        app.showInstructions();
    },
    onNfc: function (nfcEvent) {

        var tag = nfcEvent.tag;

        //console.log(JSON.stringify(nfcEvent.tag));
        app.clearScreen();

        tagContents.innerHTML = app.nonNdefTagTemplate(tag);
        navigator.notification.vibrate(100);



    },
    onNdef: function (nfcEvent) {

      //  console.log(JSON.stringify(nfcEvent.tag));
        app.clearScreen();

        var tag = nfcEvent.tag;

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

        tagContents.innerHTML = app.tagTemplate(tag);

        navigator.notification.vibrate(100);
		    wekkeruit();
		    Materialize.toast('Wekker uitgeschakeld', 2000);



    },
    clearScreen: function () {

        tagContents.innerHTML = "";

    },
    showInstructions: function () {

        var hidden = document.getElementsByClassName('hidden');
        if (hidden && hidden.length) {
            hidden[0].className = 'instructions';
        }

    },
    compileTemplates: function () {

        var source;

        source = document.getElementById('non-ndef-template').innerHTML;
        app.nonNdefTagTemplate = Handlebars.compile(source);

        source = document.getElementById('tag-template').innerHTML;
        app.tagTemplate = Handlebars.compile(source);

    },
    addTemplateHelpers: function () {

        Handlebars.registerHelper('bytesToString', function(byteArray) {
            return nfc.bytesToString(byteArray);
        });

        Handlebars.registerHelper('bytesToHexString', function(byteArray) {
            return nfc.bytesToHexString(byteArray);
        });

        // useful for boolean
        Handlebars.registerHelper('toString', function(value) {
            return String(value);
        });

        Handlebars.registerHelper('tnfToString', function(tnf) {
            return tnfToString(tnf);
        });

        Handlebars.registerHelper('decodePayload', function(record) {
            return decodePayload(record);
        });

        Handlebars.registerHelper('pluralize', function(number, single, plural) {
          if (number === 1) { return single; }
          else { return plural; }
        });
    }
};


// ideally some form of this can move to phonegap-nfc util
function decodePayload(record) {
    var recordType = nfc.bytesToString(record.type),
        payload;

    // TODO extract this out to decoders that live in NFC code
    // TODO add a method to ndefRecord so the helper
    // TODO doesn't need to do this

    if (recordType === "T") {
        var langCodeLength = record.payload[0],
        text = record.payload.slice((1 + langCodeLength), record.payload.length);
        payload = nfc.bytesToString(text);

    } else if (recordType === "U") {
        var identifierCode = record.payload.shift(),
        uri =  nfc.bytesToString(record.payload);

        if (identifierCode !== 0) {
            // TODO decode based on URI Record Type Definition
            //console.log("WARNING: uri needs to be decoded");
        }
        //payload = "<a href='" + uri + "'>" + uri + "<\/a>";
        payload = uri;

    } else {

        // kludge assume we can treat as String
        payload = nfc.bytesToString(record.payload);
    }

    return payload;
}

// TODO move to phonegap-nfc util
function tnfToString(tnf) {
    var value = tnf;

    switch (tnf) {
    case ndef.TNF_EMPTY:
        value = "Empty";
        break;
    case ndef.TNF_WELL_KNOWN:
        value = "Well Known";
        break;
    case ndef.TNF_MIME_MEDIA:
        value = "Mime Media";
        break;
    case ndef.TNF_ABSOLUTE_URI:
        value = "Absolute URI";
        break;
    case ndef.TNF_EXTERNAL_TYPE:
        value = "External";
        break;
    case ndef.TNF_UNKNOWN:
        value = "Unknown";
        break;
    case ndef.TNF_UNCHANGED:
        value = "Unchanged";
        break;
    case ndef.TNF_RESERVED:
        value = "Reserved";
        break;
    }
    return value;
}

refreshview();
update_alarm();
