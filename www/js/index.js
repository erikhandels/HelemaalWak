localStorage.setItem('eerstestart', 'ja' ); //voor testen met introscherm aanzetten

function wekkerinstellen(){

  $("#wekkerinstelview").show(0);
}

function tijdopslaan(){
  localStorage.setItem('alarmtijd2', window.alarmtijd);
  console.log(localStorage.getItem('alarmtijd2'));
  //sla de ingestelde tijd op
}


        function selectcontact(){
          $('#selectcontact').show(0);
          $('.slider').delay(500).hide(0);
        }

        function slacontactop(){
          Materialize.toast('Contact opgeslagen', 2000);
          $('#appcontain').show(0);
          $('#selectcontact').hide(0);
          $('.slider').delay(500).hide(0);
          console.log(window.opgeslagennummer);
          localStorage.setItem('telnummer', window.opgeslagennummer );
          $('.shownummer').html("Contactpersoon: " + localStorage.getItem('telnummer'));
          //refreshview();

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
      if( localStorage.getItem('gemiddeldgevoel') == 0){
       /* $('.gemiddeldgevoel').html( "Geen gemiddelde beschikbaar " );
        $('.totaalopslaan').html( "geen stats beschikbaar" );
        $('.cijfers').append( 'Geen cijfers beschikbaar' );
        $('.shownummer').html("Contactpersoon: " + localStorage.getItem('telnummer'));*/
      }else{
        /*$('.shownummer').html("Contactpersoon: " + localStorage.getItem('telnummer'));
        $('.cijfers').html(" ");
        $('.cijfers').append( '<div clas="col s6"><i class="fa fa-meh-o"></i><br><span class="cijfer">' + localStorage.getItem('fase1x') + "</span></div>" );
        $('.cijfers').append( '<div clas="col s6"><i class="fa fa-meh-o"></i><br><span class="cijfer">' + localStorage.getItem('fase2x') +"</span></div>" );*/
      }
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
$("#togglewekker").prop('checked', true);
//console.log('Fase ' + fase +'= ' + fase1_URL);
wekkeraan();
window.counter = 0;

}

function wekkeraanfase2() {

fase = 2;
$("#togglewekker").prop('checked', true);
//console.log('Fase ' + fase +'= ' + fase2_URL);
wekkeraan();
window.counter = 0;

}

function wekkeraanfase3() {

fase = 3;
$("#togglewekker").prop('checked', true);
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

if(document.getElementById('togglewekker').checked) {
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

}

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

$("#togglewekker").prop('checked', false);

clearInterval(window.timer);

flashuit();

clearInterval(window.timer2);

vibratieuit();

window.counter = 0;

stopmp3();

$("#alarmview").hide('fast');

}

//wekker uit

function wekkeruit(){

$("#togglewekker").prop('checked', false);

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

function wekkertoevoegen() {

  /*-------DOET PIJN AAN OLAFS OGEN DUS BETER MAKEN*/

var wekkeritem="";
wekkeritem += "";
wekkeritem += "";
wekkeritem += "       ";
wekkeritem += "        <div style=\"margin-top:30px;\" class=\"row\">";
wekkeritem += "          <div class=\"col s3\">";
wekkeritem += "            <i class=\"mdi-action-alarm small left-align blue-text text-darken-2\"><\/i>";
wekkeritem += "          <\/div>";
wekkeritem += "        ";
wekkeritem += "          <div class=\"col s6\">";
wekkeritem += "          ";
wekkeritem += "          <input id=\"ingesteldetijd\" style=\"font-size:20px; border:none;\" value=\"00:00\" type=\"time\">";
wekkeritem += "          ";
wekkeritem += "          <\/div>";
wekkeritem += "";
wekkeritem += "          <div class=\"col s3\">";
wekkeritem += "          <!-- Switch -->";
wekkeritem += "            <div style=\"margin:8px 0 0 0\" class=\"switch right-align\">";
wekkeritem += "              <label>";
wekkeritem += "                <input id=\"togglewekker\" type=\"checkbox\">";
wekkeritem += "                <span class=\"lever\"><\/span>";
wekkeritem += "              <\/label>";
wekkeritem += "            <\/div>";
wekkeritem += "          <\/div>";
wekkeritem += "        <\/div>";
wekkeritem += "";
wekkeritem += "        <div class=\"divider\"><\/div>";

$('.plek').append(wekkeritem);

}

function naarstatistieken(){
  $('#alarmview').hide(0);
  $('ul.tabs').tabs('select_tab', 'statview');
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

	$("#ingesteldetijd").on("input", function() {
	$("#togglewekker").prop('checked', true);

	});

	$('#wekkertoevoegknop').click(function() {

	wekkertoevoegen();

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


            //alle contacten laten zien eerste keer
            var options = new ContactFindOptions();
             options.filter = "";
             options.multiple = true;
             filter = ["displayName", "phoneNumbers", "photos"];
             navigator.contacts.find(filter, onSuccessnummer, onError, options);

                      $('#contactinput').keyup( function(){
                            $(".contacten").html('<div class="row center-align"><div style="margin-top:50px;" class="preloader-wrapper center-align big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>');

                            var input = $('#contactinput').val();
                            var options = new ContactFindOptions();
                            options.filter = input;
                            options.multiple = true;
                            var fields = ["displayName", "name"];
                            navigator.contacts.find(fields, onSuccessnummer, onError, options);

                          });

                          /*<li class="collection-item avatar">
                            <img src="images/yuna.jpg" alt="" class="circle">
                            <span class="title">Title</span>
                            <p>First Line <br>
                               Second Line
                            </p>
                            <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
                          </li>*/

                          function onSuccessnummer(contacts) {
                            $(".contacten").html("");
                              for (var i = 0; i < contacts.length; i++) {
                                var str = null;

                                if(contacts[i].displayName && contacts[i].phoneNumbers){
                                  str = "<li class='collection-item avatar'>";
                                  if(contacts[i].photos){
                                    str = str +'<img class="circle" src=' + contacts[i].photos[0].value + '> ';
                                  }else{
                                    str = str +'<img class="circle" src="img/avatar.png">';
                                  }
                                  str = str + "<span class='title'>" + contacts[i].displayName + "</span><p class='getnum'>" + contacts[i].phoneNumbers[0].value + "</p><a href='#!' class='secondary-content'><i class='mdi-toggle-radio-button-off'></i></a></li>"

                                }


                             $(".contacten").append(str);
                              }
                              $( "#selectcontact > div > div > ul > div > li:first-child > a > i" ).attr("class", "mdi-toggle-radio-button-on");

                            }


                                        function onError(contactError) {
                                            alert('onError!');
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