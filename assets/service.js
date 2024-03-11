var beni = [];
var users = [];
function goods() { 
    $.ajax({
        url: 'api/getGoods.php', 
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (obj, stato) {
            console.log("RISPOSTA", obj.responseJSON);
           
            var righe = obj.responseJSON;
            beni = righe;
            for (i = 0; i < righe.length; i++) {
                var riga = righe[i];
                var element = "<td>" + riga.id + "</td>";
                element += "<td>" + riga.tipologia + "</td>";
                element += "<td>" + riga.marca + "</td>";
                element += "<td>" + riga.modello + "</td>";
                element += "<td>" + riga.seriale + "</td>";
                element += "<td>" + riga.datainserimento + "</td>";
                element += "<td>" + riga.assegnatoa + "</td>";
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="gestListEl(' + riga.id + ')"><i class="fa-solid fa-list"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-user-plus"></i></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-square-pen"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
                $("<tr/>")
                    .append(element)
                    .appendTo("#tabella");
            }

        }
    });
}

function usersCall() {
    $.ajax({
        url: 'api/getEmployees.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            console.log("RISPOSTA", user.responseJSON);
            users = user.responseJSON;
            for (i = 0; i < users.length; i++) {
                var riga = users[i];
                var element = "<option value='" + riga.id + "'>" + riga.nome + " " + riga.cognome + "</option>";
           
                $("#user-gest")
                    .append(element);
            }
            
        }
    });
}

function gestUserEl(id) {
    $('#user-gest').val("");
    $("#monitor-good").addClass("hide");
    if (id) { 
        console.log(id);
        $('#user-gest').val(id);
        openListGoods();
    }
    $('#viewGestEl').modal('show');
}

function viewUser(user) { 
    console.log(beni[user]);
    var utente = beni[user - 1];
    
}

function openListGoods() { 
    goodAssingenedRemove();
    var valore = $("#user-gest").val();
    console.log("utente: ", valore);
    $("#monitor-good").removeClass("hide");
}

function gestListEl(id) { 
    for (var a = 0; a < beni.length; a++){
        if (beni[a].id == id) {
            var titolo = beni[a].marca + " - " + beni[a].modello + " - " + beni[a].seriale;
            $("#titolo-bene").text(titolo);
            $('#viewListEl').modal('show');
        }
    }
    
}

function goodAssingenedStep1() { 
    $("#added-goods-to-employee").addClass("hide");
    $("#start-add-good-to-employee").addClass("hide");
    $("#tipologia-add-to-employee").removeClass("hide");
    $("#button-remove-add-goods").removeClass("hide");
}

function goodAssingenedStep2() {
    $("#tipologia-add-to-employee").addClass("hide");
    $("#add-good-to-employee").removeClass("hide");
}

function goodAssingenedRemove() { 
    $("#added-goods-to-employee").removeClass("hide");
    $("#start-add-good-to-employee").removeClass("hide");
    $("#tipologia-add-to-employee").addClass("hide");
    $("#add-good-to-employee").addClass("hide");
    $("#button-remove-add-goods").addClass("hide");
}

$(document).ready(function () {
    usersCall();
    goods();
});
    
           