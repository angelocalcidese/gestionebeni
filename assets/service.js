var beni = [];
var users = [];
var idRow = null;
function tablePagination() {
    var table = new DataTable('table.display');
}
function activeOtherCat() {

    var id = $("#input-categoria").val();
    console.log(id);
    $("#input-altro-type").val("");
    $("#input-tipologia").val("");

    if (id == "nuovo") {
        $("#other-val-cat").removeClass("hide");
        $("#input-tipologia").prop("disabled", true);
        $("#other-val-type").removeClass("hide");
        $("#input-altro-cat").focus();
    } else {
        $("#other-val-cat").addClass("hide");
        $("#input-altro-cat").val("");
        $("#input-altro-type").val("");
        $("#other-val-type").addClass("hide");
        if (id != "") {
            $("#input-tipologia").prop("disabled", false);
        } else {
            ("#input-tipologia").prop("disabled", true);
        }
    }
}

function activeOtherType() {
    var id = $("#input-tipologia").val();
    if (id == "nuovo") {
        $("#other-val-type").removeClass("hide");
    } else {
        $("#other-val-type").addClass("hide");
        $("#input-altro-type").val("");
        
    }
}
function newGood() {
    $(".input-data").val("");
    $("#other-val-cat").addClass("hide");
    $("#other-val-type").addClass("hide");
    $("#alert-error").addClass("hide");
    $("#alert-error").empty();
    $("#addGood").modal("show");
}

function controlForm() {
    var cat = $("#input-categoria").val();
    var catnew = $("#input-altro-cat").val();
    var type = $("#input-tipologia").val();
    var typenew = $("#input-altro-type").val();
    var marca = $("#input-marca").val();
    var modello = $("#input-modello").val();
    var sn = $("#input-sn").val();
    var dataacquisto = $("#input-dataacquisto").val();

    var count = 0;
    var html = "<ul>";
    if (cat == "") { html += "<li>Inserire Categoria</li>"; count++; }
    if (cat == "nuovo") {
        if (catnew == "") { html += "<li>Inserire Nuova Categoria</li>"; count++; }
        if (typenew == "") { html += "<li>Inserire Nuova Tipologia Bene</li>"; count++; }
    }
    if ((cat != "nuovo") && (type == "")) { html += "<li>Inserire Tipologia Bene</li>"; count++; }
    if ((type == "nuovo") && (typenew = "")) { html += "<li>Inserire Nuova Tipologia Bene</li>"; count++; }
    if (marca == "") { html += "<li>Inserire Marca</li>"; count++; }
    if (modello == "") { html += "<li>Inserire Modello</li>"; count++; }
    html += "</ul>";
    if (count > 0) {
        $("#alert-error").removeClass("hide");
        $("#alert-error").empty();
        $("#alert-error").html(html);
    } else {
        $("#alert-error").empty();
        $("#alert-error").addClass("hide");
        if (idRow) {
            var data = searchData(idRow);
            data.typenew = typenew;
            data.catnew = catnew;
            data.marca = marca;
            data.modello = modello;
            data.tipologia = type;
            data.categoria = cat;
            data.sn = sn;
            data.dataacquisto = dataacquisto;
            modRow(data);
        } else {
            $("#alert-error").addClass("hide");
            $("#alert-error").empty();
            if (catnew != "") {
                createCat();
            } else if (typenew != "") {
                createType(cat)
            } else {
                addRow();
            }
        }
    }
}
function createCat() {
   var catnew = $("#input-altro-cat").val();

    $.ajax({
        method: "POST",
        url: "api/createCategory.php",
        data: JSON.stringify({ catnew: catnew }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione CATEGORY chiamata quando la chiamata ha successo (response 200)", data);
            createType(data)
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
}

function createType(catid) {
    var typenew = $("#input-altro-type").val();
    $.ajax({
        method: "POST",
        url: "api/createType.php",
        data: JSON.stringify({ idcat: catid, typenew: typenew }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione TYPE chiamata quando la chiamata ha successo (response 200)", data);
            //addRow(catid, data);
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
}

function addRow(catid, typeid) {
    var cat = $("#input-categoria").val();
    var catnew = $("#input-altro-cat").val();
    var type = $("#input-tipologia").val();
    var typenew = $("#input-altro-type").val();
    var marca = $("#input-marca").val();
    var modello = $("#input-modello").val();
    var sn = $("#input-sn").val();
    var dataacquisto = $("#input-dataacquisto").val();

    $.ajax({
        method: "POST",
        url: "api/createGood.php",
        data: JSON.stringify({ marca: marca, modello: modello, tipologia: type, category: cat, sn: sn, dataacquisto: dataacquisto, catnew: catnew, typenew: typenew}),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Veicolo inserito correttamente");
            $("#form-add").addClass("hide");
            $("#add-button").addClass("hide");
            cleanInput();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
}

function goods() { 
    $.ajax({
        url: 'api/getGoods.php', 
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (obj, stato) {
            console.log("RISPOSTA", obj.responseJSON);
            if (obj.responseJSON) {
              var righe = obj.responseJSON;
            beni = righe;
            for (i = 0; i < righe.length; i++) {
                var riga = righe[i];
                var element = "<td>" + riga.category + "</td>";
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
            
            tablePagination();

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
function typeCall() {
    $.ajax({
        url: 'api/getType.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (type) {
            console.log("RISPOSTA", type.responseJSON);
            type = type.responseJSON;
            /*if (type.responseJSON) {
                category = cat.responseJSON;
                for (i = 0; i < category.length; i++) {
                    var riga = category[i];
                    var element = "<option value='" + riga.id + "'>" + riga.voce + "</option>";

                    $("#input-categoria").append(element);
                }
            }*/

            goods();
        }
    });
}
function categoryCall() {
    $.ajax({
        url: 'api/getCategory.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (cat) {
            console.log("RISPOSTA", cat.responseJSON);
            if (cat.responseJSON) {
                category = cat.responseJSON;
                for (i = 0; i < category.length; i++) {
                    var riga = category[i];
                    var element = "<option value='" + riga.id + "'>" + riga.voce + "</option>";

                    $("#input-categoria").append(element);
                }
            }
            
            typeCall();
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
    categoryCall();

    new DateTime(document.getElementById('input-dataacquisto'), {
        format: 'DD/MM/YYYY'
    });
});
    
           