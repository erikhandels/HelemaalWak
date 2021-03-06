
localStorage.setItem('eerstestart', 'ja' ); //voor testen met introscherm aanzetten

function wekkerinstellen(){

  $("#wekkerinstelview").show(0);
}

function notificatiefase1() {

localNotification.add(1,  {
    seconds: 0,
	title: "Fase 1",
    message: "Goedemorgen, het is tijd om op te staan.",
    badge: 1
	
	});
	
}

function notificatiefase2() {

localNotification.add(2,  {
    seconds: 0,
	title: "Fase 2",
    message: "Moet je niet eens opstaan?",
    badge: 2
	
	});
	
}

function notificatiefase3() {

localNotification.add(3,  {
    seconds: 0,
	title: "Fase 3",
    message: "Dit is je laatste kans om op te staan..",
    badge: 3
	
	});
	
}

function telaat() {

localNotification.add(4,  {
    seconds: 0,
	title: "Faal",
    message: "Je wake-up buddy is op de hoogte gesteld van je faalactie..",
    badge:4
	
	});
	
}

 function onReceivedLocalNotification(event) {
/*	console.log('er is een notificatie verschenen!');*/
	navigator.startApp.start("com.phonegap.helemaalwakv24", function(message) { /* success */
/*    console.log(message); // => OK
*/}, 
function(error) { /* error */
    console.log(error);
});
    }
	
	var successCb = function () {
        // Generic callback function
        console.log("success");
    }
    var failureCb = function (error) {
        // Generic callback function
        console.log("failure");
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
  instellenfase2();
  instellenfase3();
  refreshview();
}

function instellenfase2() {

var alarmtimestamp = window.alarmtijd + ':00'; //timestamp ervan maken
var tt = alarmtimestamp.split(":"); // weg met die dubbele punten
var seconden = tt[0]*3600+tt[1]*60+tt[2]*1; // naar seconden
var nieuweseconden = seconden + 60 * 1; // +1 min
var hhmmss = secondsTimeSpanToHMS(nieuweseconden); // naar hh:mm:ss
window.fase2 = hhmmss.slice(0, -3); // laatste 3 tekens eraf
decimalenfase2();
localStorage.setItem('fase2tijd', window.fase2); // in local storage ermee

}

function instellenfase3() {

var alarmtimestamp = window.alarmtijd + ':00'; //timestamp ervan maken
var tt = alarmtimestamp.split(":"); // weg met die dubbele punten
var seconden = tt[0]*3600+tt[1]*60+tt[2]*1; // naar seconden
var nieuweseconden = seconden + 60 * 2; // +2 min
var hhmmss = secondsTimeSpanToHMS(nieuweseconden); // naar hh:mm:ss
window.fase3 = hhmmss.slice(0, -3); // laatste 3 tekens eraf
decimalenfase3();
localStorage.setItem('fase3tijd', window.fase3); // in local storage ermee

}

function decimalenfase2() {

var res = window.fase2.substring(0, 2); //pak de eerste 2 karakters
res = res.replace(':', ''); // haal de dubbele punt weg als die bestaat

if (res.length < 2) {

window.fase2 = '0' + window.fase2;

}

}

function decimalenfase3() {

var res2 = window.fase3.substring(0, 2); //pak de eerste 2 karakters
res2 = res2.replace(':', ''); // haal de dubbele punt weg als die bestaat

if (res2.length < 2) {

window.fase3 = '0' + window.fase3;

}

}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
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

          });

    function refreshview(){

        $('#ingesteldetijd').html(localStorage.getItem('alarmtijd2'));
		      $('#ingesteldetijd2').html(localStorage.getItem('fase2tijd'));
		        $('#ingesteldetijd3').html(localStorage.getItem('fase3tijd'));
            $("#nietgehaald").html(localStorage.getItem('falen'));

            $.getJSON("http://i264371.iris.fhict.nl/api/wak/uitlezen.php", function(data){
               $("#goed").html(data.goed);
               $("#matig").html(data.matig);
               $("#slecht").html(data.slecht);

               $("#best").html("Jij voelt je 's ochtends het beste na " + data.fasegoedvoel + " keer snoozen ");

			   if (data.fasegoedvoel == 1) {

				$("#best").append('(5 minuten)');

			   }

			   if (data.fasegoedvoel == 2) {

			   $("#best").append('(10 minuten)');

			   }

			   if (data.fasegoedvoel == 3) {

			   $("#best").append('(15 minuten)');

			   }

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
	  localStorage.setItem('alarmtijd2', '00:00');
	  localStorage.setItem('fase2tijd', '00:00');
	  localStorage.setItem('fase3tijd', '00:00');
    localStorage.setItem('falen', 0);
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
	window.fase = 0;

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

	notificatiefase1();
	window.fase = 1;
	minuuttimerfase1();
	wekkeraan();
	$('.alarmtekst').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x +"</span></p>");
	console.log('Fase 1 gaat af');
	$('#wekkertoggle').hide();
	$('.vervangen').replaceWith('<div style="font-size:60px;" class="col s7 terugzetten"><span id="ingesteldetijd">' + window.x +'</span></div>');
	window.dbfase = window.fase;



	}

	function wekkeraanfase2() {

	notificatiefase2();
	window.fase = 2;
	minuuttimerfase2();
	wekkeraan();
	$('.fase').replaceWith('<p class="uppercase center fase">Fase 2</p>');
	$('.alarmtekst').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x2 +"</span></p>");
	$('#snoozeknopfase1').replaceWith('<a style="width:100%; color:#333333;" id="snoozeknopfase2" onclick="snooze2();" class="btn-large blue lighten-5">SNOOZE</a>');
	console.log('Fase 2 gaat af');
	window.dbfase = window.fase;





	}

	function wekkeraanfase3() {

	notificatiefase3();
	window.fase = 3;
	knipperen();
	minuuttimerfase3();
	wekkeraan();
	$('.fase').replaceWith('<p class="uppercase center fase">Fase 3</p>');
	$('.alarmtekst').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x3 +"</span></p>");
	$('#snoozeknopfase2').replaceWith('<a style="width:100%; color:#333333;" id="snoozeknopfase3" onclick="snooze3();" class="btn-large blue lighten-5">OPGEVEN</a>');
	console.log('Fase 3 gaat af');
	window.dbfase = window.fase;





	}

	function snooze() {

    clearInterval(window.timerinterval1);



	window.counter = window.counter +2;
	clearInterval(window.timer);
	flashuit();
	clearInterval(window.timer2);
	vibratieuit();
	stopmp3();
	$("#alarmview").hide();
	console.log('fase 1 is gesnoozed');
	$('.wekkernaamplaats').css({"color": "#dadada"});
	$('#ingesteldetijd').css({"color": "#dadada"});
	$('.wekkernaamplaats2').css({"color": "#333333"});
	$('#ingesteldetijd2').css({"color": "#333333"});
	Materialize.toast('Wekker gesnoozed', 2000);

	}

	function snooze2() {

    clearInterval(window.timerinterval2);


	window.counter = window.counter +3;
	clearInterval(window.timer);
	flashuit();
	clearInterval(window.timer2);
	vibratieuit();
	stopmp3();
	$("#alarmview").hide();
	console.log('fase 2 is gesnoozed');
	$('.wekkernaamplaats2').css({"color": "#dadada"});
	$('#ingesteldetijd2').css({"color": "#dadada"});
	$('.wekkernaamplaats3').css({"color": "#333333"});
	$('#ingesteldetijd3').css({"color": "#333333"});
	Materialize.toast('Wekker gesnoozed', 2000);
	}

	function snooze3() {

    clearInterval(window.timerinterval3);
    clearInterval(window.knipperinterval);

    $('#alarmview').removeClass('knipperen');

	window.counter = 0;
	clearInterval(window.timer);
	flashuit();
	clearInterval(window.timer2);
	vibratieuit();
	stopmp3();
	$("#alarmview").hide();

	var messageInfo = {
		phoneNumber: window.telefoonnummer,
		textMessage: "Ik ben lui. Na 3 keer snoozen ben ik nog steeds niet mijn bed uitgekomen.."
	};

	sms.sendMessage(messageInfo, function(message) {
		console.log("success: " + message);
	}, function(error) {
		console.log("code: " + error.code + ", message: " + error.message);
	});

	console.log('gefaald!');

	telaat();
	window.my_media_faal.play();
	$('#wekkertoggle').show();
	$('.terugzetten').replaceWith('<div style="font-size:60px;"  class="col s7 vervangen" onclick="wekkerinstellen();"><span id="ingesteldetijd">' + window.x +'</span></div>');
	$('.wekkernaamplaats3').css({"color": "#dadada"});
	$('#ingesteldetijd3').css({"color": "#dadada"});
	$('.wekkernaamplaats').css({"color": "#333333"});
	$('#ingesteldetijd').css({"color": "#333333"});
	$('.fase').replaceWith('<p class="uppercase center fase">Fase 1</p>');
	$('.alarmtekst').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x +"</span></p>");
	$('#snoozeknopfase3').replaceWith(' <a style="width:100%; color:#333333;" id="snoozeknopfase1" onclick="snooze();" class="btn-large blue lighten-5">SNOOZE</a>');
	Materialize.toast('U heeft gefaald..', 2000);
	window.counter = 1;
	window.falen = localStorage.getItem('falen');
	window.falen++;
	localStorage.setItem('falen', window.falen);
	refreshview();



	}

		function minuuttimerfase1() {

		window.timercounter1 = 30;
		window.timerinterval1 = setInterval(function() {
		window.timercounter1--;
		$('.timerplek').text(window.timercounter1);
		if (window.timercounter1 == 0) {
			clearInterval(window.timerinterval1);
			clearInterval(window.knipperinterval1);
			$('.timerplek').replaceWith('<span class="timerplek">30</span>');
			snooze();
			}

		}, 1000);


	}

		function minuuttimerfase2() {

		window.timercounter2 = 30;
		window.timerinterval2 = setInterval(function() {
		window.timercounter2--;
		$('.timerplek').text(window.timercounter2);
		if (window.timercounter2 == 0) {
			clearInterval(window.timerinterval2);
			clearInterval(window.knipperinterval2);
			$('.timerplek').replaceWith('<span class="timerplek">30</span>');
			snooze2();
			}

		}, 1000);


	}

	function minuuttimerfase3() {

		window.timercounter3 = 30;
		window.timerinterval3 = setInterval(function() {
		window.timercounter3 --;
		$('.timerplek').text(window.timercounter3);
		if (window.timercounter3 == 0) {
			clearInterval(window.timerinterval3);
			clearInterval(window.knipperinterval);
			$('.timerplek').replaceWith('<span class="timerplek">30</span>');
			snooze3();
			}

		}, 1000);


	}

	function knipperen() {

	window.knipperinterval = setInterval(function() {
		$('#alarmview').toggleClass('knipperen');
		$('i.mdi-action-alarm').toggleClass('blauwecolor');
		$('.timerplek').toggleClass('blauwecolor');
		$('.fase').toggleClass('blauwecolor');
		$('.alarmtekst').toggleClass('blauwecolor');
		$('.alarmtijd').toggleClass('blauwecolor');
		$('#snoozeknopfase3').toggleClass('blauw');

		}, 500);


	}

	function mediaError(e) {
	//console.log("MEDIA ERROR");
	}

	// wekker aan
	function wekkeraan(){
	//console.log("wekker aan gestart");

	//if(document.getElementById('togglewekker').checked) {
	//console.log("if checked gestart");
	window.counter = 0;

	$('#alarmview').show('fast');

	//console.log("fase bij wekkeraan() is" + fase);

	if (window.fase == 1) {
	play_fase1_mp3();
	}

	if (window.fase == 2) {

	flash();

	window.timer = setInterval(function() {flash()}, 750);

	vibratie();

	window.timer2 = setInterval(function() {vibratie()}, 1000);

	play_fase2_mp3();
	}

	if (window.fase == 3) {

	flash();

	window.timer = setInterval(function() {flash()}, 750);

	vibratie();

	window.timer2 = setInterval(function() {vibratie()}, 1000);

	play_fase3_mp3();

	}

	window.fase = 0;

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

	//wekker uit

	function wekkeruit(){

	/*$("#togglewekker").prop('checked', false);*/

	clearInterval(window.timer);

	flashuit();

	clearInterval(window.timer2);

	vibratieuit();


	stopmp3();

	window.my_media_win.play();
	clearInterval(window.timerinterval1);
	clearInterval(window.timerinterval2);
	clearInterval(window.timerinterval3);
	clearInterval(window.knipperinterval);
	$('#wekkertoggle').show();
	$('.terugzetten').replaceWith('<div style="font-size:60px;"  class="col s7 vervangen" onclick="wekkerinstellen();"><span id="ingesteldetijd">' + window.x +'</span></div>');
	$('.wekkernaamplaats3').css({"color": "#dadada"});
	$('#ingesteldetijd3').css({"color": "#dadada"});
	$('.wekkernaamplaats').css({"color": "#333333"});
	$('#ingesteldetijd').css({"color": "#333333"});
	$('.fase').replaceWith('<p class="uppercase center fase">Fase 1</p>');
	$('.alarmtekst').replaceWith('<p class="alarmtekst center-align">Het is nu<br><span class="alarmtijd">' + window.x +"</span></p>");
	$('#snoozeknopfase3').replaceWith(' <a style="width:100%; color:#333333;" id="snoozeknopfase1" onclick="snooze();" class="btn-large blue lighten-5">SNOOZE</a>');
	window.counter = 0;


	}

function wekkerafgaan() {

   	var telefoontijd;
	var telefoontijduur;
	var telefoontijdminuut;
    window.x = localStorage.getItem('alarmtijd2');
	window.x2 = localStorage.getItem('fase2tijd');
	window.x3 = localStorage.getItem('fase3tijd');
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

		if (telefoontijd == window.x2) {

			if (window.counter == 2) {

			wekkeraanfase2();

			}
		}

		if (telefoontijd == window.x3) {

			if (window.counter == 3) {

			wekkeraanfase3(); //over 5 minuten snooze3 uitvoeren en timeout killen als nfc is gescanned

			}

		}

	}

  function naarstatistieken(gevoel){
    console.log(gevoel);
      if(window.dbfase){
      window.dbfase = 0;
    }

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

/*	$("#ingesteldetijd").on("input", function() {
	$("#togglewekker").prop('checked', true);

	});*/

	$('#wekkertoggle').click(function() {

	$(this).toggleClass('blauwmaken');

	});


});//einde doc.reacy


// NFC CODE //

var app = {
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
		document.addEventListener("receivedLocalNotification", onReceivedLocalNotification, false);
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

	 //FAAL SOUND //

      window.faal_URL = getMediaURL("sounds/faal.wav");
      window.my_media_faal = new Media(faal_URL, null, mediaError);


	 //WIN SOUND //

      window.win_URL = getMediaURL("sounds/goedzo.wav");
      window.my_media_win = new Media(win_URL, null, mediaError);

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
        //app.clearScreen();

        tagContents.innerHTML = app.tagTemplate(tag);
        navigator.notification.vibrate(100);
		wekkeruit();
		Materialize.toast('Wekker uitgeschakeld', 2000);
		window.my_media_win.play();




    },
    onNdef: function (nfcEvent) {

      //  console.log(JSON.stringify(nfcEvent.tag));
        //app.clearScreen();

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
		window.my_media_win.play();

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
