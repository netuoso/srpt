function MM_findObj(n, d) { //v3.0
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document); return x;
}
/* Functions that swaps images. */
function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2) ; i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}
function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

/* Functions that handle preload. */
function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}

function IsNumeric(strString) {
    var strValidChars = "0123456789.";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}


/* Function that closes window and refreshes calling window. */
function WinCloseReload() {
    self.opener.location.reload(true);
    self.close()
}
/* Function that hides the print button on the "Printer Friendly" page and then prints the page. */
function PrintFriendly() {
    browserName = navigator.appName;

    var printPage = document.getElementsByName("PrintPageButton");
    var closePage = document.getElementsByName("CloseButton");

    if (browserName == "Netscape") {
        if (!(printPage === undefined)) {
            printPage[0].style.display = "none";
        } else {
            var printPage = document.getElementsByClassName("PrintPageButton");
            if (!(printPage === undefined)) {
                printPage[0].style.display = "none";
            }
        }
        if (!(closePage === undefined)) {
            closePage[0].style.display = "none";
        }
        else {
            var closePage = document.getElementsByClassName("CloseButton");
            if (!(closePage === undefined)) {
                closePage[0].style.display = "none";
            }
        }

        window.print();
        setTimeout("NetShowButtons()", 2000);
    }
    else {
        if (!(printPage === undefined)) {
            printPage[0].style.display = "none";
        }
        else {
            var printPage = document.getElementsByClassName("PrintPageButton");
            if (!(printPage === undefined)) {
                printPage[0].style.display = "none";
            }
        }

        if (!(closePage === undefined)) {
            closePage[0].style.display = "none";
        }
        else {
            var closePage = document.getElementsByClassName("CloseButton");
            if (!(closePage === undefined)) {
                closePage[0].style.display = "none";
            }
        }

        window.print();

        if (!(printPage === undefined)) {
            printPage[0].style.display = "";
        }
        else {
            var printPage = document.getElementsByClassName("PrintPageButton");
            if (!(printPage === undefined)) {
                printPage[0].style.display = "";
            }
        }
        if (!(closePage === undefined)) {
            closePage[0].style.display = "";
        }
        else {
            var closePage = document.getElementsByClassName("CloseButton");
            if (!(closePage === undefined)) {
                closePage[0].style.display = "";
            }
        }
    }
}
function NetShowButtons() {
    browserName = navigator.appName;

    var printPage = document.getElementsByName("PrintPageButton");
    var closePage = document.getElementsByName("CloseButton");

    if (!(printPage === undefined)) {
        printPage[0].style.display = "";
    }
    else {
        var printPage = document.getElementsByClassName("PrintPageButton");
        if (!(printPage === undefined)) {
            printPage[0].style.display = "";
        }
    }

    if (!(closePage === undefined)) {
        closePage[0].style.display = "";
    }
    else {
        closePage = document.getElementsByClassName("CloseButton");
        if (!(closePage === undefined)) {
            closePage[0].style.display = "";
        }
    }
}

function WinClose() {
    window.close()
}

// Trims a field value.
function trim(TRIM_VALUE) {
    if (TRIM_VALUE.length < 1) {
        return "";
    }
    TRIM_VALUE = RTrim(TRIM_VALUE);
    TRIM_VALUE = LTrim(TRIM_VALUE);
    if (TRIM_VALUE == "") {
        return "";
    }
    else {
        return TRIM_VALUE;
    }
} //End Function

function RTrim(VALUE) {
    var w_space = String.fromCharCode(32);
    var v_length = VALUE.length;
    var strTemp = "";
    if (v_length < 0) {
        return "";
    }
    var iTemp = v_length - 1;

    while (iTemp > -1) {
        if (VALUE.charAt(iTemp) == w_space) {
        }
        else {
            strTemp = VALUE.substring(0, iTemp + 1);
            break;
        }
        iTemp = iTemp - 1;
    } //End While
    return strTemp;

} //End Function

function LTrim(VALUE) {
    var w_space = String.fromCharCode(32);
    if (v_length < 1) {
        return "";
    }
    var v_length = VALUE.length;
    var strTemp = "";

    var iTemp = 0;

    while (iTemp < v_length) {
        if (VALUE.charAt(iTemp) == w_space) {
        }
        else {
            strTemp = VALUE.substring(iTemp, v_length);
            break;
        }
        iTemp = iTemp + 1;
    } //End While
    return strTemp;
} //End Function


/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Copyright 1999 Idocs, Inc. http://www.idocs.com
Distribute this script freely but keep this notice in place */

function numbersonly(myfield, e, dec) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;
    keychar = String.fromCharCode(key);

    // control keys
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27))
        return true;

        // numbers
    else if ((("0123456789").indexOf(keychar) > -1))
        return true;

        // decimal point jump
    else if (dec && (keychar == ".")) {
        myfield.form.elements[dec].focus();
        return false;
    } else
        return false;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(email));
}

function validateMultipleEmails(email, seperator) {
    var value = email;
    if (value != '') {
        var result = value.split(seperator);
        for (var i = 0; i < result.length; i++) {
            if (result[i] != '') {
                if (!validateEmail(result[i])) {
                    alert('Invalid Email: ' + result[i]);
                    return false;
                }
            }
        }
    }
    return true;
}

function isValidPrice(txtValue) {
    var valid = false;
    //valid = RegExp(/^[0-9\,]+(\.\d{2}|\.\d{1})?$/).test(String(txtValue).replace(/^\s+|\s+$/g, ""));
    valid = RegExp(/^\$?[0-9]+(\.[0-9][0-9])?$/).test(String(txtValue).replace(/^\s+|\s+$|\,/g, ""));

    return valid;

}

//------------------------------------------------------------------------
// function:  isDate
//------------------------------------------------------------------------
function isDate(txtDate) {

    // from http://jquerybyexample.blogspot.com/2011/12/validate-date-using-jquery.html
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    var dtMonth = dtArray[1];
    var dtDay = dtArray[3];
    var dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (num.length == 0) return '';
    if (isNaN(num)) num = "0";

    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);

    var cents = num % 100;
    num = Math.floor(num / 100).toString();

    if (cents < 10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));

    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}
