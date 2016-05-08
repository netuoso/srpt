//<!--
// $Revision: 8 $
// $Date: 9/24/07 4:25p $
// $Author: Jalban $

var pageId = 0;
var passedSystemValidation = false; /* Global variable */
//Funtion to determine if character is a number
function IsNumeric(theChar) {
    if (theChar >= 0 && theChar <= 9)
        return true;

    return false;
} //eof IsNumeric

//Function to determine if the time is entered correctly
function IsTime(FormName, ElemName) {
    var err = 0;
    //JAlban
    //NOTE: Leave the following two lines below these comments in. They are not used anywhere, but for unknown reasons
    //if they are removed, a Javascript error is caused when trying to edit a category in the Compliance component
    //and may occur elsewhere since this code is used for other components.  Screwy!?!
    Obj = document.forms[FormName].elements[ElemName];
    TestTime = Obj.value;
    var Temp = document.forms[FormName].elements[ElemName];
    Temp.value = Temp.value.replace(/^\s+|\s+$/g, "");
    var IsItAColon = Temp.value.indexOf(':');
    var Length = Temp.value.length - 1;  // Array is from 0 to length-1

    if (Length == -1)
        return true;

    if (IsItAColon == -1) // no colon in string
    {
        if ((Length == 0) || (Length == 1)) {
            hh = Temp.value;
            for (x = 0; x <= hh.length - 1; x++) {
                testchar = IsNumeric(hh.substring(x, x + 1));
                if (testchar == false)
                    err = 1;
            }
            if (err != 1) {
                if ((hh > 0) && (hh < 13)) {
                    document.forms[FormName].elements[ElemName].value = hh + ":00";
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }
    else {
        hh = Temp.value.substring(0, IsItAColon);
        mm = Temp.value.substring(IsItAColon + 1);

        for (x = 0; x <= hh.length - 1; x++) {
            testchar = IsNumeric(hh.substring(x, x + 1));
            if (testchar == false)
                return false;
        }

        if ((hh < 1) || (hh > 12)) {
            return false;
        }

        for (x = 0; x <= mm.length - 1; x++) {
            testchar = IsNumeric(mm.substring(x, x + 1))
            if (testchar == false)
                return false;
        }
        if ((mm < 0) || (mm > 59) || (mm == "")) {
            return false;
        }
        // So far, the minutes entered have passed all previous validation.
        // Now, check to make sure the minutes entered are two digits in length.
        if (mm.length != 2) {
            return false;
        }
        else {
            // Since the minutes entered are two digits in length, the final check is to make sure that
            // neither of the digits entered is a blank space (" ").
            firstMinuteDigit = mm.substring(0, 1);
            lastMinuteDigit = mm.substring(1, 2);
            if (firstMinuteDigit == " " || lastMinuteDigit == " "); {
                return false;
            }
        }

        return true;
    }
}
//End of TimeCheck

//Funtion to determine if value is valid date
function IsDate(FormName, ElemName) {
    var err = 0;
    Obj = document.forms[FormName].elements[ElemName];
    TestDate = Obj.value;

    var Temp = document.forms[FormName].elements[ElemName];
    var FirstSlash = Temp.value.indexOf('/');
    var LastSlash = Temp.value.lastIndexOf('/');
    var Length = Temp.value.length - 1;   // Array is from 0 to length-1

    if (Length == -1)
        return true;

    if ((LastSlash - FirstSlash > 3) || (LastSlash - FirstSlash < 2))
        err = 1;

    if ((FirstSlash < 1) || (FirstSlash > 2))
        err = 1;

    if (LastSlash == Length)
        err = 1;

    if (err != 1) {
        mm = Temp.value.substring(0, FirstSlash);
        dd = Temp.value.substring(FirstSlash + 1, LastSlash);
        yyyy = Temp.value.substring(LastSlash + 1);
        yy = Temp.value.substring(LastSlash + 3);

        for (x = 0; x <= mm.length - 1; x++) {
            testchar = IsNumeric(mm.substring(x, x + 1));
            if (testchar == false)
                err = 1;
        }

        for (x = 0; x <= dd.length - 1; x++) {
            testchar = IsNumeric(dd.substring(x, x + 1));
            if (testchar == false)
                err = 1;
        }

        for (x = 0; x <= yyyy.length - 1; x++) {
            testchar = IsNumeric(yyyy.substring(x, x + 1));
            if (testchar == false)
                err = 1;
        }

        if (mm < 1 || mm > 12) err = 1;
        if (dd < 1 || dd > 31) err = 1;
        if (yyyy.length < 4) err = 1;
        if (yyyy == 0) err = 1;
        if (yy < 0 || yy > 99) err = 1;
        if (yyyy < 1900 || yyyy > 2075) err = 1;
        if (mm == 4 || mm == 6 || mm == 9 || mm == 11) {
            if (dd == 31) err = 1;
        } //end else

        if (mm == 2) {
            var h = parseInt(yyyy / 4);
            if (isNaN(h)) {
                err = 1;
            }
            if (dd > 29) err = 1;
            if (dd == 29 && ((yyyy / 4) != parseInt(yyyy / 4))) err = 1;
        }

        if (err == 1) {
            return false;
        }
        else {
            return true;
        }
    }
} // eof IsDate

//Funtion to determine if value is in correct E-Mail Format
function VldEmail(FormName, ElemName) {
    var EmailOk = true;
    var MailAddresses = new Array();
    var Temp = document.forms[FormName].elements[ElemName];
    var MailAddressValue = Temp.value;
    var MultiAddress = Temp.value.indexOf(';');
    if (Temp.name.indexOf('!R') < 0)
        if ((Temp.value.length == 0))
            return true;
    if (MultiAddress != -1)
        MailAddresses = MailAddressValue.split(";");
    else
        MailAddresses[0] = MailAddressValue;
    for (i = 0; i < MailAddresses.length ; i++) {
        var AtSym = MailAddresses[i].indexOf('@');
        var Period = MailAddresses[i].lastIndexOf('.');
        var Space = MailAddresses[i].indexOf(' ');
        var Length = MailAddresses[i].length - 1;   // Array is from 0 to length-1

        if ((AtSym < 1) ||                     // '@' cannot be in first position
            (Period <= AtSym + 1) ||             // Must be atleast one valid char btwn '@' and '.'
            (Period == Length) ||             // Must be atleast one valid char after '.'
            (Space != -1))                    // No empty spaces permitted
        {
            EmailOk = false;
            alert('Please enter a valid e-mail address!');
            break;
        }
    }

    if (EmailOk == false)
        document.forms[FormName].elements[ElemName].focus();

    return EmailOk;
} //eof VldEmail

//Function to determin if string is empty
function isEmpty(TheString) {
    var Empty = true;
    var StrLen = 0;
    var x = 1;

    if (TheString == null)
        return Empty;

    StrLen = TheString.length;

    if (StrLen == 0)
        return Empty;

    StrLen = StrLen - 1;

    for (var i = 0 ; i <= StrLen; i++) {
        TestChar = TheString.substring(i, i + 1);
        if (TestChar != " ") {
            Empty = false;
            break;
        } //end is char blank
    } //end for

    return Empty;
} //eof isEmpty

/*
    This function determines which tab has to be shown so that focus can
    be set on a field in that Tab.
*/

/*
    This function iterates through a "element"'s child nodes and returns the text containing
    all the child nodes	that are text elements.

    Parameter: el = The parent element that has to be traversed. In our scenario, it would
                    be the Tab id.

*/
function getTextElements(el) {
    var text = "";
    var count = 0;

    for (var i = el.firstChild; i != null; i = i.nextSibling) {
        if (i.nodeType == 1 && (i.nodeName == "INPUT" || i.nodeName == "SELECT"))// actual=3 Node.TEXT_NODE, IE doesn't speak constants )
        {
            for (var l = 0; l < i.attributes.length; l++) {
                if (i.attributes.item(l).nodeValue != null) {
                    text += i.attributes.item(l).nodeValue;
                }
            }
        }
        else if (i.firstChild != null)
            text += getTextElements(i);
    }

    return text;
}

/*This function checks the tab to which the current element belongs and set that Tab's visibility.
  It checks if the current element is i
*/
function CheckAndShowTab(anyTabs, numTabs, elementName) {
    var i = 0;
    var names = "";
    var tabTag = "";
    if (anyTabs) {
        for (i = 1; i <= numTabs; i++) {
            tabTag = "id" + i;
            names = getTextElements(document.getElementById(tabTag))
            //alert(names);
            if (names.indexOf(elementName) != -1) {
                ShowTab(i);
                break;
            }

            if (elementName.substring(0, 3) == "!WT") {
                ShowTab("5");
                break;
            }
        }
    }
}

//Function to determine if Form Completed
function IsFormComplete(FormName, AdminMode) {
    var x = 0;
    var FormOk = true;
    var anyTabs = false;
    var numTabs = 0;
    var fieldName = "";
    var alertMessage = "";
    var result = "";
    var InputString = "";

    // Check to see if Required fields are filled in
    while ((x < document.forms[FormName].elements.length) && (FormOk)) {
        if (document.forms[FormName].elements[x].name.substring(0, 4) == "Tabs") {
            numTabs = document.forms[FormName].elements[x].value;
            anyTabs = true;
        }

        if (document.forms[FormName].elements[x].name.substring(0, 7) == "vPageID") {
            pageId = document.forms[FormName].elements['vPageID'].value;
        }

        // Security check for SQL Injection by a hacker
        if (!isEmpty(document.forms[FormName].elements[x].value) && AdminMode != null) {
            InputString = document.forms[FormName].elements[x].value.toLowerCase();
            fieldName = document.forms[FormName].elements[x].name; // the name of the current field

            //Commented out by rcf.  This line was causing multiple selects in firefox to behave incorrectly.
            //document.forms[FormName].elements[x].value=InputString
            if (FormName != "FormItemMaint" && FormName != "EmailFriend" && FormName != "EmailRegistration" && FormName != "MembershipItemMaint") {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/select|&gt|&lt|insert|union|update|delete|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Remove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/select|ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|insert|union|update|delete|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\n\"<\"\n\">\"\n\"\.\.\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Less Than, More Than, Remove, or Consolidation.\nPlease try again."
                }
            }
            else {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/&gt|&lt|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\nPlease try to replace any of those words with:\nRemove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\n\"<\"\n\">\"\n\"\.\.\"\n\"--\"\nPlease try to replace any of those words with:\nLess Than, More Than, Remove, Consolidation, or a single dash.\nPlease try again."
                }
            }
            result = pattern.exec(InputString);
            pattern.lastIndex = 0; //This line is important. The pattern search index needs to be reset after the initial search.

            if (result != null) {
                alert(alertMessage);

                //check if there are any tabs and show the tab before setting the focus
                CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }

            if (result != null) {
                break;
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!R") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!R" || document.forms[FormName].elements[x].value == null) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if (O_selected == "" || O_selected == 0) {
                        alert('A required field was left blank please re-check required fields and try again. ');
                        window.scroll(0, 0);
                        //check if there are any tabs and show the tab before setting the focus
                        CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                        document.forms[FormName].elements[x].focus();
                        document.forms[FormName].elements[x].select();
                        FormOk = false;
                        break;
                    }
                }
                else {
                    alert('A required field was left blank please re-check required fields and try again. ');
                    window.scroll(0, 0);
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].selectedIndex = 0;
                    FormOk = false;
                    break;
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("SpamTrap") > -1 && (!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].value != null)) {
                var URL_Link;
                URL_Link = "/Includes/ValidateSpamTrapEntry.aspx?p1=" + document.forms[FormName].elements[x + 1].value + "&p3=" + document.forms[FormName].elements[x].value;
                xmlhttp = null;
                // code for Mozilla, etc.
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                }
                    // code for IE
                else if (window.ActiveXObject) {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (xmlhttp != null) {
                    xmlhttp.open("POST", URL_Link, false);
                    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xmlhttp.setRequestHeader('Content-length', URL_Link.length);
                    xmlhttp.send(URL_Link);
                    if (xmlhttp.status == 200) {
                        if (xmlhttp.responseText != "true") {
                            alert("The text you entered does not match that of the image\nPlease try again.");
                            document.forms[FormName].elements[x].focus();
                            document.forms[FormName].elements[x].select();
                            FormOk = false;
                        }
                    }
                    else {
                        alert("Problem retrieving XML data");
                    }
                }
                else {
                    alert("Your browser does not support XMLHTTP.");
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.");
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                }

            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (IsTime(FormName, document.forms[FormName].elements[x].name))
                    t = 1;
                else {
                    alert("Please use a correct Time Format! (HH:MM)")
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                }
        }
        else {
            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1;
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.")
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                }
            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (IsTime(FormName, document.forms[FormName].elements[x].name))
                    t = 1;
                else {
                    alert("Please use a correct Time Format! (HH:MM)")
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!O") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!O" || document.forms[FormName].elements[x].value == null || document.forms[FormName].elements[x].selectedIndex == 0) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;
                    if (document.forms[FormName].elements[x + 1] !== undefined) {
                        if ((O_index == 0 && document.forms[FormName].elements[x + 1].name.substring(0, 4) != "fNew") || (document.forms[FormName].elements[x + 1].value == "" && document.forms[FormName].elements[x + 1].name.substring(0, 4) == "fNew")) {
                            alert('A required selection field was left blank please re-check required fields and try again.');
                            //check if there are any tabs and show the tab before setting the focus
                            CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                            window.scroll(0, 0);
                            document.forms[FormName].elements[x].focus();
                            FormOk = false;
                            break;
                        }
                    }
                    else {
                        if (O_index == 0) {
                            alert('A required selection field was left blank please re-check required fields and try again.');
                            //check if there are any tabs and show the tab before setting the focus
                            CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);

                            window.scroll(0, 0);
                            document.forms[FormName].elements[x].focus();
                            FormOk = false;
                            break;
                        }
                    }
                }
                else {
                    alert('A required selection field was left blank please re-check required fields and try again.');
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    FormOk = false;
                }
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!B") {
            if (document.forms[FormName].elements[x].type == "radio") {
                var ctr = 0;
                noradios = true;
                currentfield = document.forms[FormName].elements[x].name;
                for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                    if (document.forms[FormName].elements[t].name == currentfield) {
                        if (document.forms[FormName].elements[t].checked == true) {
                            noradios = false;
                        }
                    }
                }
                if (noradios) {
                    alert('A required radio field was left unselected please re-check required fields and try again.');
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    FormOk = false;
                }
            }
        }

        //Parent Child Check
        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!P") {
            if ((!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].type != "checkbox") || (document.forms[FormName].elements[x].checked == true && document.forms[FormName].elements[x].type == "checkbox")) {
                var PC = x + 1;
                while (document.forms[FormName].elements[PC].name.substring(0, 2) == "!C") {
                    if (isEmpty(document.forms[FormName].elements[PC].value) || document.forms[FormName].elements[PC].value == null) {
                        alert('A required field was left blank please re-check required fields and try again.');
                        //check if there are any tabs and show the tab before setting the focus
                        CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                        window.scroll(0, 0);
                        document.forms[FormName].elements[PC].focus();
                        FormOk = false;
                        break;
                    }
                    if (document.forms[FormName].elements[PC].type == "radio") {
                        var ctr = 0;
                        noradios = true;
                        currentfield = document.forms[FormName].elements[PC].name;
                        for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                            if (document.forms[FormName].elements[t].name == currentfield) {
                                if (document.forms[FormName].elements[t].checked == true) {
                                    noradios = false;
                                }
                            }
                        }
                        if (noradios) {
                            alert('A required radio field was left unselected please re-check required fields and try again.');
                            //check if there are any tabs and show the tab before setting the focus
                            CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                            window.scroll(0, 0);
                            document.forms[FormName].elements[PC].focus();
                            FormOk = false;
                            break;
                        }
                    }

                    PC++;
                }
            }
        }

        //Password Validation Check
        if (document.forms[FormName].elements[x].name.substring(0, 3) == "!V1") {
            if (isEmpty(document.forms[FormName].elements[x].value)) {
                alert('A required field was left blank please re-check required fields and try again.');
                //check if there are any tabs and show the tab before setting the focus
                CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                window.scroll(0, 0);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }

            var currentSiteId = "";
            var minPassLength = "";
            var maxPassLength = "";
            //Check to make sure the SiteID is being passed as a field
            if (document.getElementById("CurrentSiteID")) {
                currentSiteId = document.getElementById("CurrentSiteID").value;
            }
            // If this is the Krewe of Bonaparte site, then, for a temporary fix, allow 3-12 character passwords to be accepted;
            // otherwise, just make sure the password length is 5 - 10 characters in length.
            if (currentSiteId == "2020") {
                minPassLength = 3;
                maxPassLength = 12;
                if ((document.forms[FormName].elements[x].value.length < minPassLength || document.forms[FormName].elements[x].value.length > maxPassLength)) {
                    alert('The password must contain between ' + minPassLength + ' and ' + maxPassLength + ' characters');
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                    break;
                }
            }
            else {
                minPassLength = 5;
                maxPassLength = 20;
                if ((document.forms[FormName].elements[x].value.length < minPassLength || document.forms[FormName].elements[x].value.length > maxPassLength)) {
                    alert('The password must contain between 5 and 20 characters');
                    //check if there are any tabs and show the tab before setting the focus
                    CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                    break;
                }
            }

            if ((document.forms[FormName].elements[x].value.indexOf(' ') != -1)) {
                alert('The password contains invalid characters - Please re-enter the password');
                //check if there are any tabs and show the tab before setting the focus
                CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                window.scroll(0, 0);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }

            if ((document.forms[FormName].elements[x + 1].name.substring(0, 3) == "!V2") && (document.forms[FormName].elements[x].value != document.forms[FormName].elements[x + 1].value)) {
                alert('The passwords do not match - please re-enter the password fields');
                //check if there are any tabs and show the tab before setting the focus
                CheckAndShowTab(anyTabs, numTabs, document.forms[FormName].elements[x].name);
                window.scroll(0, 0);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }
        }

        x++;
    }

    return FormOk
} //eof IsFormComplete

/*function IsFormComplete(FormName)
{
    var x       = 0
    var FormOk  = true

    // Check to see if Required fields are filled in
    while ((x < document.forms[FormName].elements.length) && (FormOk))
        {
        if (document.forms[FormName].elements[x].name.substring(0,2)=="!R")
            {
            switch (document.forms[FormName].elements[x].type)
                {
                case "select-one":
                    {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if (O_selected == "")
                        {
                        alert('A required field was left blank please re-check required fields and try again.')
                        window.scroll(0,0)
                        document.forms[FormName].elements[x].focus()
                        FormOk = false
                        break
                        }
                    x ++
                    }
                case "radio":
                    {
                    }

                case "text":
                    {
                    if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0,2)=="!R" || document.forms[FormName].elements[x].value == null)
                        {
                        if (document.forms[FormName].elements[x].type == "select-one")
                        else
                            {
                            alert('A required field was left blank please re-check required fields and try again.')
                            window.scroll(0,0)
                            document.forms[FormName].elements[x].focus()
                            FormOk = false
                            }
                        }
                        if (document.forms[FormName].elements[x].name.indexOf("Date")> -1)
                            if(IsDate(FormName,document.forms[FormName].elements[x].name))
                                t = 1
                            else
                                {
                                alert("Please use a correct Date Format! (mm/dd/yyyy)")
                                document.forms[FormName].elements[x].focus()
                                FormOk = false
                                }
                    x ++
                    }
        else
            {
            if (document.forms[FormName].elements[x].name.indexOf("Date")> -1)
                if(IsDate(FormName,document.forms[FormName].elements[x].name))
                    t = 1
                else
                    {
                    alert("Please use a correct Date Format! (mm/dd/yyyy)")
                    document.forms[FormName].elements[x].focus()
                    FormOk = false
                    }
            x ++
            }
        }

    return FormOk
} //eof IsFormComplete

*/

//Funtion to determine if value TextArea is less than max field size
function vldTextArea(FormName, ElemName, tSize) {
    var Temp = document.forms[FormName].elements[ElemName]

    //	if (document.forms[FormName].elements[ElemName].value.length > tSize)
    if (Temp.value.length > tSize)
        alert("Only the first " + tSize + " of the " + Temp.value.length + " chararters will be accepted.")
} //eof VldTextArea

//Submit Button
function SubmitClick(FormName, AdminMode) {
    FormValidated = IsFormComplete(FormName, AdminMode)

    if (FormValidated) {
        if (document.forms[FormName].elements['!Remail']) {
            FormValidated = VldEmail(FormName, "!Remail")
        }
    }
    if (FormValidated) {
        if (document.forms[FormName].elements['!REmail']) {
            FormValidated = VldEmail(FormName, "!REmail")
        }
    }
    if (FormValidated) {
        if (document.forms[FormName].elements['!REMail']) {
            FormValidated = VldEmail(FormName, "!REMail")
        }
    }
    if (FormValidated) {
        if (document.forms[FormName].elements['!REMAIL']) {
            FormValidated = VldEmail(FormName, "!REMAIL")
        }
    }
    if (FormValidated) {
        if (document.forms[FormName].elements['Email']) {
            FormValidated = VldEmail(FormName, "Email")
        }
    }
    if (FormValidated) {
        if (pageId != 0 && (pageId == 2160 || pageId == 1340 || pageId == 1130 || pageId == 1390 || pageId == 1400 || pageId == 1300 || pageId == 2292 || pageId == 2280 || pageId == 2282 || pageId == 2284 || pageId == 2286 || pageId == 2288 || pageId == 2290 || pageId == 2292 || pageId == 2294 || pageId == 2296 || pageId == 2298 || pageId == 2145)) {
            ChangeEscapeCharacters(FormName);
        }
        window.document.forms[FormName].submit();
    }

    passedSystemValidation = FormValidated;
}

/*
    Replaces the special characters with escape characters
*/
function ChangeEscapeCharacters(FormName) {
    var i = 0;
    var strValue = "";
    var singQuot = /\'/g;
    var dubQuot = /\"/g;
    var maxlen = 0;
    for (i = 0; i < document.forms[FormName].elements.length; i++) {
        if (document.forms[FormName].elements[i] != null && document.forms[FormName].elements[i].type != "select-one" && document.forms[FormName].elements[i].type != "radio" && document.forms[FormName].elements[i].type != "hidden") {
            maxlen = document.forms[FormName].elements[i].getAttribute("maxlength");
            strValue = document.forms[FormName].elements[i].value;
            strValue = strValue.replace(singQuot, "''");
            if (maxlen > 0) {
                strValue = strValue.replace(dubQuot, "&quot;").substring(0, maxlen);
            }
            document.forms[FormName].elements[i].value = strValue;
            //	replace(singQuot, "&#39;");
            //	replace(dubQuot, "&#34;");
        }
    }
}

// ------------------------------------------------------------
// Admin Re-design Validation
// ------------------------------------------------------------

// #3262 -- Added the following functions just for Events Component
function IsEventsFormComplete(FormName, AdminMode) {
    var x = 0;
    var FormOk = true;
    var anyTabs = false;
    var numTabs = 0;
    var fieldName = "";
    var alertMessage = "";
    var result = "";
    var InputString = "";

    // Check to see if Required fields are filled in
    while ((x < document.forms[FormName].elements.length) && (FormOk)) {
        if (document.forms[FormName].elements[x].name.substring(0, 4) == "Tabs") {
            numTabs = document.forms[FormName].elements[x].value;
            anyTabs = true;
        }

        if (document.forms[FormName].elements[x].name.substring(0, 7) == "vPageID") {
            pageId = document.forms[FormName].elements['vPageID'].value;
        }

        // Security check for SQL Injection by a hacker
        if (!isEmpty(document.forms[FormName].elements[x].value) && AdminMode != null) {
            InputString = document.forms[FormName].elements[x].value.toLowerCase();
            fieldName = document.forms[FormName].elements[x].name; // the name of the current field

            //Commented out by rcf.  This line was causing multiple selects in firefox to behave incorrectly.
            //document.forms[FormName].elements[x].value=InputString
            if (FormName != "FormItemMaint" && FormName != "EmailFriend" && FormName != "EmailRegistration") {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/select|&gt|&lt|insert|union|update|delete|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Remove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/select|ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|insert|union|update|delete|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\n\"<\"\n\">\"\n\"\.\.\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Less Than, More Than, Remove, or Consolidation.\nPlease try again."
                }
            }
            else {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/&gt|&lt|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\nPlease try to replace any of those words with:\nRemove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\n\"<\"\n\">\"\n\"\.\.\"\n\"--\"\nPlease try to replace any of those words with:\nLess Than, More Than, Remove, Consolidation, or a single dash.\nPlease try again."
                }
            }
            result = pattern.exec(InputString);
            pattern.lastIndex = 0; //This line is important. The pattern search index needs to be reset after the initial search.

            if (result != null) {
                alert(alertMessage);

                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }

            if (result != null) {
                break;
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!R") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!R" || document.forms[FormName].elements[x].value == null) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if (O_selected == "" || O_selected == 0) {
                        alert('A required field was left blank please re-check required fields and try again. ')
                        window.scroll(0, 0)
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                        document.forms[FormName].elements[x].focus()
                        document.forms[FormName].elements[x].select()
                        FormOk = false
                        break;
                    }
                }
                else {
                    alert('A required field was left blank please re-check required fields and try again. ')
                    window.scroll(0, 0)
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                    break;
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("SpamTrap") > -1 && (!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].value != null)) {
                var URL_Link
                URL_Link = "/Includes/ValidateSpamTrapEntry.aspx?p1=" + document.forms[FormName].elements[x + 1].value + "&p3=" + document.forms[FormName].elements[x].value;
                xmlhttp = null
                // code for Mozilla, etc.
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest()
                }
                    // code for IE
                else if (window.ActiveXObject) {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
                }
                if (xmlhttp != null) {
                    xmlhttp.open("POST", URL_Link, false)
                    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xmlhttp.setRequestHeader('Content-length', URL_Link.length);
                    xmlhttp.send(URL_Link);
                    if (xmlhttp.status == 200) {
                        if (xmlhttp.responseText != "true") {
                            alert("The text you entered does not match that of the image\nPlease try again.")
                            document.forms[FormName].elements[x].focus()
                            document.forms[FormName].elements[x].select()
                            FormOk = false
                        }
                    }
                    else {
                        alert("Problem retrieving XML data")
                    }
                }
                else {
                    alert("Your browser does not support XMLHTTP.")
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }

            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (IsTime(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Time Format! (HH:MM)")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }
        }
        else {
            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }
            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (!isEmpty(document.forms[FormName].elements[x].value)) {
                    if (ValidateTimeFormat(document.forms[FormName].elements[x].value))
                        t = 1
                    else {
                        alert("Please use a correct Time Format! (HH:MM AM/PM)")
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                        document.forms[FormName].elements[x].focus()
                        document.forms[FormName].elements[x].select()
                        FormOk = false
                    }
                }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!O") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!O" || document.forms[FormName].elements[x].value == null || document.forms[FormName].elements[x].selectedIndex == 0) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if ((O_index == 0 && document.forms[FormName].elements[x + 1].name.substring(0, 4) != "fNew") || (document.forms[FormName].elements[x + 1].value == "" && document.forms[FormName].elements[x + 1].name.substring(0, 4) == "fNew")) {
                        alert('A required selection field was left blank please re-check required fields and try again.')
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                        window.scroll(0, 0)
                        document.forms[FormName].elements[x].focus()
                        FormOk = false
                        break
                    }
                }
                else {
                    alert('A required selection field was left blank please re-check required fields and try again.')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    FormOk = false
                }
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!B") {
            if (document.forms[FormName].elements[x].type == "radio") {
                var ctr = 0
                noradios = true
                currentfield = document.forms[FormName].elements[x].name
                for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                    if (document.forms[FormName].elements[t].name == currentfield) {
                        if (document.forms[FormName].elements[t].checked == true) {
                            noradios = false
                        }
                    }
                }
                if (noradios) {
                    alert('A required radio field was left unselected please re-check required fields and try again.')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    FormOk = false
                }
            }
        }

        //Parent Child Check
        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!P") {
            if ((!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].type != "checkbox") || (document.forms[FormName].elements[x].checked == true && document.forms[FormName].elements[x].type == "checkbox")) {
                var PC = x + 1
                while (document.forms[FormName].elements[PC].name.substring(0, 2) == "!C") {
                    if (isEmpty(document.forms[FormName].elements[PC].value) || document.forms[FormName].elements[PC].value == null) {
                        alert('A required field was left blank please re-check required fields and try again.')
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                        window.scroll(0, 0)
                        document.forms[FormName].elements[PC].focus()
                        FormOk = false
                        break
                    }
                    if (document.forms[FormName].elements[PC].type == "radio") {
                        var ctr = 0
                        noradios = true
                        currentfield = document.forms[FormName].elements[PC].name
                        for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                            if (document.forms[FormName].elements[t].name == currentfield) {
                                if (document.forms[FormName].elements[t].checked == true) {
                                    noradios = false
                                }
                            }
                        }
                        if (noradios) {
                            alert('A required radio field was left unselected please re-check required fields and try again.')
                            //check if there are any tabs and show the tab before setting the focus
                            RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                            window.scroll(0, 0)
                            document.forms[FormName].elements[PC].focus()
                            FormOk = false
                            break
                        }
                    }

                    PC++
                }
            }
        }

        //Password Validation Check
        if (document.forms[FormName].elements[x].name.substring(0, 3) == "!V1") {
            if (isEmpty(document.forms[FormName].elements[x].value)) {
                alert('A required field was left blank please re-check required fields and try again.')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }

            var currentSiteId = "";
            //Check to make sure the SiteID is being passed as a field
            if (document.getElementById("CurrentSiteID")) {
                currentSiteId = document.getElementById("CurrentSiteID").value;
            }

            // If this is the Krewe of Bonaparte site, then, for a temporary fix, allow 3-12 character passwords to be accepted;
            // otherwise, just make sure the password length is 5 - 10 characters in length.
            if (currentSiteId == "2020") {
                var minPassLength = 3;
                var maxPassLength = 12;
                if ((document.forms[FormName].elements[x].value.length < minPassLength || document.forms[FormName].elements[x].value.length > maxPassLength)) {
                    alert('The password must contain between ' + minPassLength + ' and ' + maxPassLength + ' characters');
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                    break;
                }
            }
            else {
                if ((document.forms[FormName].elements[x].value.length < 5 || document.forms[FormName].elements[x].value.length > 10)) {
                    alert('The password must contain between 5 and 10 characters')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false;
                    break;
                }
            }

            if ((document.forms[FormName].elements[x].value.indexOf(' ') != -1)) {
                alert('The password contains invalid characters - Please re-enter the password')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }

            if ((document.forms[FormName].elements[x + 1].name.substring(0, 3) == "!V2") && (document.forms[FormName].elements[x].value != document.forms[FormName].elements[x + 1].value)) {
                alert('The passwords do not match - please re-enter the password fields')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }
        }

        x++
    }

    return FormOk
} //eof IsFormComplete

function ValidateTimeFormat(time) {
    var pattern = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;   //defining pattern for time
    if (pattern.test(time)) {
        return true;
    }
    return false;
}

function EventsSubmitClick(FormName, AdminMode) {
    FormValidated = IsEventsFormComplete(FormName, AdminMode)

    if (FormValidated)
        if (document.forms[FormName].elements['!REmail'])
            FormValidated = VldEmail(FormName, "!REmail")

    if (FormValidated)
        if (document.forms[FormName].elements['Email'])
            FormValidated = VldEmail(FormName, "Email")

    if (FormValidated) {
        if (pageId != 0 && (pageId == 2160 || pageId == 1340 || pageId == 1130 || pageId == 1390 || pageId == 1400 || pageId == 1300 || pageId == 2292 || pageId == 2280 || pageId == 2282 || pageId == 2284 || pageId == 2286 || pageId == 2288 || pageId == 2290 || pageId == 2292 || pageId == 2294 || pageId == 2296 || pageId == 2298 || pageId == 2145)) {
            ChangeEscapeCharacters(FormName);
        }
        window.document.forms[FormName].submit();
    }

    passedSystemValidation = FormValidated;
}

// END #3262 -- Events Component ONLY

function RedesignSubmitClick(FormName, AdminMode) {
    FormValidated = RedesignIsFormComplete(FormName, AdminMode)

    if (FormValidated)
        if (document.forms[FormName].elements['!REmail'])
            FormValidated = VldEmail(FormName, "!REmail")

    if (FormValidated)
        if (document.forms[FormName].elements['Email'])
            FormValidated = VldEmail(FormName, "Email")

    if (FormValidated) {
        if (pageId != 0 && (pageId == 2160 || pageId == 1340 || pageId == 1130 || pageId == 1390 || pageId == 1400 || pageId == 1300 || pageId == 2292 || pageId == 2280 || pageId == 2282 || pageId == 2284 || pageId == 2286 || pageId == 2288 || pageId == 2290 || pageId == 2292 || pageId == 2294 || pageId == 2296 || pageId == 2298 || pageId == 2145)) {
            ChangeEscapeCharacters(FormName);
        }
        window.document.forms[FormName].submit();
    }

    passedSystemValidation = FormValidated;
}

function RedesignCheckAndShowTab(anyTabs, elementName) {
    if (anyTabs) {
        fieldParentTab = jQuery("input[name='" + elementName + "']").closest("[id^='tab']");
        if (fieldParentTab.length) {
            ReDesignShowTab(fieldParentTab.attr("id"));
        }

        if (elementName.substring(0, 3) == "!WT") {
            ReDesignShowTab("tab5");
        }
    }
}

function RedesignIsFormComplete(FormName, AdminMode) {
    var x = 0;
    var FormOk = true;
    var anyTabs = false;
    var numTabs = 0;
    var fieldName = "";
    var alertMessage = "";
    var result = "";
    var InputString = "";

    // Check to see if Required fields are filled in
    while ((x < document.forms[FormName].elements.length) && (FormOk)) {
        if (document.forms[FormName].elements[x].name.substring(0, 4) == "Tabs") {
            numTabs = document.forms[FormName].elements[x].value;
            anyTabs = true;
        }

        if (document.forms[FormName].elements[x].name.substring(0, 7) == "vPageID") {
            pageId = document.forms[FormName].elements['vPageID'].value;
        }

        // Security check for SQL Injection by a hacker
        if (!isEmpty(document.forms[FormName].elements[x].value) && AdminMode != null) {
            InputString = document.forms[FormName].elements[x].value.toLowerCase();
            fieldName = document.forms[FormName].elements[x].name; // the name of the current field

            //Commented out by rcf.  This line was causing multiple selects in firefox to behave incorrectly.
            //document.forms[FormName].elements[x].value=InputString
            if (FormName != "FormItemMaint" && FormName != "EmailFriend" && FormName != "EmailRegistration") {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/select|&gt|&lt|insert|union|update|delete|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Remove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/select|ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|insert|union|update|delete|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Select\"\n\"Insert\"\n\"Update\"\n\"Delete\"\n\"Drop\"\n\"Union\"\n\"<\"\n\">\"\n\"\.\.\"\nPlease try to replace any of those words with:\nChoose, Add, Revise, Less Than, More Than, Remove, or Consolidation.\nPlease try again."
                }
            }
            else {
                if (fieldName.substring(0, 3) == "!WT") {
                    var pattern = RegExp("/&gt|&lt|drop|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\nPlease try to replace any of those words with:\nRemove, or Consolidation.\nPlease try again."
                }
                else {
                    var pattern = RegExp("/ipt>|ipt\s>|<scrip|<\sscrip|&gt|&lt|drop|--|[\.]+[\.]|-\s-|@@|@\s@|1=1|1\s=1|1\s=\s1/gi");
                    alertMessage = "The input you supplied contains invalid characters or words.\nDue to security reasons the following words are not accepted:\n\"Drop\"\n\"<\"\n\">\"\n\"\.\.\"\nPlease try to replace any of those words with:\nLess Than, More Than, Remove, or Consolidation.\nPlease try again."
                }
            }
            result = pattern.exec(InputString);
            pattern.lastIndex = 0; //This line is important. The pattern search index needs to be reset after the initial search.

            if (result != null) {
                alert(alertMessage);

                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name);
                document.forms[FormName].elements[x].focus();
                document.forms[FormName].elements[x].select();
                FormOk = false;
                break;
            }

            if (result != null) {
                break;
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!R") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!R" || document.forms[FormName].elements[x].value == null) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if (O_selected == "" || O_selected == 0) {
                        alert('A required field was left blank please re-check required fields and try again. ')
                        window.scroll(0, 0)
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                        document.forms[FormName].elements[x].focus()
                        document.forms[FormName].elements[x].select()
                        FormOk = false
                        break;
                    }
                }
                else {
                    alert('A required field was left blank please re-check required fields and try again. ')
                    window.scroll(0, 0)
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                    break;
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("SpamTrap") > -1 && (!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].value != null)) {
                var URL_Link
                URL_Link = "/Includes/ValidateSpamTrapEntry.aspx?p1=" + document.forms[FormName].elements[x + 1].value + "&p3=" + document.forms[FormName].elements[x].value;
                xmlhttp = null
                // code for Mozilla, etc.
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest()
                }
                    // code for IE
                else if (window.ActiveXObject) {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
                }
                if (xmlhttp != null) {
                    xmlhttp.open("POST", URL_Link, false)
                    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xmlhttp.setRequestHeader('Content-length', URL_Link.length);
                    xmlhttp.send(URL_Link);
                    if (xmlhttp.status == 200) {
                        if (xmlhttp.responseText != "true") {
                            alert("The text you entered does not match that of the image\nPlease try again.")
                            document.forms[FormName].elements[x].focus()
                            document.forms[FormName].elements[x].select()
                            FormOk = false
                        }
                    }
                    else {
                        alert("Problem retrieving XML data")
                    }
                }
                else {
                    alert("Your browser does not support XMLHTTP.")
                }
            }

            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }

            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (IsTime(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Time Format! (HH:MM)")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }
        }
        else {
            if (document.forms[FormName].elements[x].name.indexOf("Date") > -1)
                if (IsDate(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Date Format! (mm/dd/yyyy) \n Date must be between 1/1/1900 and 12/31/2075.")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }
            if ((document.forms[FormName].elements[x].name.indexOf("Time") > -1) && (document.forms[FormName].elements[x].name.indexOf("Times") == -1) && (document.forms[FormName].elements[x].name.indexOf("AP") == -1) && (document.forms[FormName].elements[x].name.indexOf("TimeZone") == -1))
                if (IsTime(FormName, document.forms[FormName].elements[x].name))
                    t = 1
                else {
                    alert("Please use a correct Time Format! (HH:MM)")
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false
                }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!O") {
            if (isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].name.substring(0, 2) == "!O" || document.forms[FormName].elements[x].value == null || document.forms[FormName].elements[x].selectedIndex == 0) {
                if (document.forms[FormName].elements[x].type == "select-one") {
                    O_select = document.forms[FormName].elements[x];
                    O_index = O_select.selectedIndex;
                    O_selected = O_select.options[O_index].value;

                    if ((O_index == 0 && document.forms[FormName].elements[x + 1].name.substring(0, 4) != "fNew") || (document.forms[FormName].elements[x + 1].value == "" && document.forms[FormName].elements[x + 1].name.substring(0, 4) == "fNew")) {
                        alert('A required selection field was left blank please re-check required fields and try again.')
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)

                        window.scroll(0, 0)
                        document.forms[FormName].elements[x].focus()
                        FormOk = false
                        break
                    }
                }
                else {
                    alert('A required selection field was left blank please re-check required fields and try again.')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    FormOk = false
                }
            }
        }

        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!B") {
            if (document.forms[FormName].elements[x].type == "radio") {
                var ctr = 0
                noradios = true
                currentfield = document.forms[FormName].elements[x].name
                for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                    if (document.forms[FormName].elements[t].name == currentfield) {
                        if (document.forms[FormName].elements[t].checked == true) {
                            noradios = false
                        }
                    }
                }
                if (noradios) {
                    alert('A required radio field was left unselected please re-check required fields and try again.')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    FormOk = false
                }
            }
        }

        //Parent Child Check
        if (document.forms[FormName].elements[x].name.substring(0, 2) == "!P") {
            if ((!isEmpty(document.forms[FormName].elements[x].value) && document.forms[FormName].elements[x].type != "checkbox") || (document.forms[FormName].elements[x].checked == true && document.forms[FormName].elements[x].type == "checkbox")) {
                var PC = x + 1
                while (document.forms[FormName].elements[PC].name.substring(0, 2) == "!C") {
                    if (isEmpty(document.forms[FormName].elements[PC].value) || document.forms[FormName].elements[PC].value == null) {
                        alert('A required field was left blank please re-check required fields and try again.')
                        //check if there are any tabs and show the tab before setting the focus
                        RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                        window.scroll(0, 0)
                        document.forms[FormName].elements[PC].focus()
                        FormOk = false
                        break
                    }
                    if (document.forms[FormName].elements[PC].type == "radio") {
                        var ctr = 0
                        noradios = true
                        currentfield = document.forms[FormName].elements[PC].name
                        for (var t = 0; t < document.forms[FormName].elements.length; t++) {
                            if (document.forms[FormName].elements[t].name == currentfield) {
                                if (document.forms[FormName].elements[t].checked == true) {
                                    noradios = false
                                }
                            }
                        }
                        if (noradios) {
                            alert('A required radio field was left unselected please re-check required fields and try again.')
                            //check if there are any tabs and show the tab before setting the focus
                            RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                            window.scroll(0, 0)
                            document.forms[FormName].elements[PC].focus()
                            FormOk = false
                            break
                        }
                    }

                    PC++
                }
            }
        }

        //Password Validation Check
        if (document.forms[FormName].elements[x].name.substring(0, 3) == "!V1") {
            if (isEmpty(document.forms[FormName].elements[x].value)) {
                alert('A required field was left blank please re-check required fields and try again.')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }

            var currentSiteId = "";
            //Check to make sure the SiteID is being passed as a field
            if (document.getElementById("CurrentSiteID")) {
                currentSiteId = document.getElementById("CurrentSiteID").value;
            }

            // If this is the Krewe of Bonaparte site, then, for a temporary fix, allow 3-12 character passwords to be accepted;
            // otherwise, just make sure the password length is 5 - 10 characters in length.
            if (currentSiteId == "2020") {
                var minPassLength = 3;
                var maxPassLength = 12;
                if ((document.forms[FormName].elements[x].value.length < minPassLength || document.forms[FormName].elements[x].value.length > maxPassLength)) {
                    alert('The password must contain between ' + minPassLength + ' and ' + maxPassLength + ' characters');
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name);
                    window.scroll(0, 0);
                    document.forms[FormName].elements[x].focus();
                    document.forms[FormName].elements[x].select();
                    FormOk = false;
                    break;
                }
            }
            else {
                if ((document.forms[FormName].elements[x].value.length < 5 || document.forms[FormName].elements[x].value.length > 10)) {
                    alert('The password must contain between 5 and 10 characters')
                    //check if there are any tabs and show the tab before setting the focus
                    RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                    window.scroll(0, 0)
                    document.forms[FormName].elements[x].focus()
                    document.forms[FormName].elements[x].select()
                    FormOk = false;
                    break;
                }
            }

            if ((document.forms[FormName].elements[x].value.indexOf(' ') != -1)) {
                alert('The password contains invalid characters - Please re-enter the password')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }

            if ((document.forms[FormName].elements[x + 1].name.substring(0, 3) == "!V2") && (document.forms[FormName].elements[x].value != document.forms[FormName].elements[x + 1].value)) {
                alert('The passwords do not match - please re-enter the password fields')
                //check if there are any tabs and show the tab before setting the focus
                RedesignCheckAndShowTab(anyTabs, document.forms[FormName].elements[x].name)
                window.scroll(0, 0)
                document.forms[FormName].elements[x].focus()
                document.forms[FormName].elements[x].select()
                FormOk = false
                break
            }
        }

        x++
    }

    return FormOk
} //eof RedesignIsFormComplete

// -->