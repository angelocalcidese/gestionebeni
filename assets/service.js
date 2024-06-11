var beni = [];
var users = [];
var idRow = null;
var category = [];
var typology = [];
var dataMod = [];
var d = new Date();
var day = d.getDate();
var idModkm = null;
var userAss = null;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (day < 10) {
    day = "0" + day;
}
var year = d.getFullYear();
var mounth = d.getMonth() + 1;
if (mounth < 10) {
    mounth = "0" + mounth;
}
var strDate = day + "/" + mounth + "/" + d.getFullYear();

function tablePagination() {
    var table = new DataTable('table.display');
}
function activeFilter() {
    var link = "/gestionebeni/";

    var stato = $("#input-stato-filter").val();
    var assegnatoa = $("#input-assegnatoa-filter").val();
    var categoria = $("#input-categoria-filter").val();
    var tipologia = $("#input-tipologia-filter").val();
    if ((stato != "") || (assegnatoa != "") || (categoria != "") || (tipologia != "")) {
        link += "?filter=on";
    }
    if (stato != "") { link += "&stato=" + stato; }
    if (assegnatoa != "") { link += "&asse=" + assegnatoa; }
    if (categoria != "") { link += "&cat=" + categoria; }
    if (tipologia != "") { link += "&type=" + tipologia; }

    window.location.href = link;
}

function activeOtherCatFilter() {
    var id = $("#input-categoria-filter").val();
    $("#input-tipologia-filter").val("");
    $("#input-tipologia-filter option").remove();
    var opt = '<option value="" selected>Seleziona</option>';

    if (id != "") {
        $("#input-tipologia-filter option").remove();
        var selType = searchCatType(id);
        for (var a = 0; a < selType.length; a++) {
            opt += '<option value ="' + selType[a].id + '">' + selType[a].voce + '</option>';
        }

        $("#input-tipologia-filter").prop("disabled", false);
    } else {
        $("#input-tipologia-filter").prop("disabled", true);
    }
    
    $("#input-tipologia-filter").append(opt);
}

function clearFilter() {
    $(".input-data-filter").val("");
    window.location.href = "/gestionebeni/";
}

function activeOtherCat() {
    var id = $("#input-categoria").val();
    $("#input-altro-type").val("");
    $("#input-tipologia").val("");
    $("#input-tipologia option").remove();
    var opt = '<option value="" selected>Seleziona</option><option value ="nuovo"> + Nuovo</option>';

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
            $("#input-tipologia option").remove();
            var selType = searchCatType(id);
            for (var a = 0; a < selType.length; a++){
                opt += '<option value ="' + selType[a].id + '">' + selType[a].voce + '</option>';
            }
            
            $("#input-tipologia").prop("disabled", false);
        } else {
            $("#input-tipologia").prop("disabled", true);
        }
    }
    $("#input-tipologia").append(opt);
}

function searchCatType(id) {
    var resp = [];
    for (var a = 0; a < typology.length; a++){
        if (id == typology[a].category) {
            resp.push(typology[a]);
        }
    }
    return resp;
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
    $("#input-assegnatoa").prop("disabled", false);
    $("#input-dataassegnazione").prop("disabled", false);
    $("#addGood").modal("show");
}

function controlForm() {
    dataMod = [];
    var cat = $("#input-categoria").val();
    var catnew = $("#input-altro-cat").val();
    var type = $("#input-tipologia").val();
    var typenew = $("#input-altro-type").val();
    var marca = $("#input-marca").val();
    var modello = $("#input-modello").val();
    var sn = $("#input-sn").val();
    var dataacquisto = $("#input-dataacquisto").val();
    var assegnatoa = $("#input-assegnatoa").val();
    var dataassegnazione = $("#input-dataassegnazione").val();
    var stato = $("#input-stato").val();
    var valoreacquisto = $("#input-valoreacquisto").val();
    var note = $("#input-note").val();

    var count = 0;
    var html = "<ul>";
    if (stato == "") { html += "<li>Inserire lo stato del bene</li>"; count++; }
    if (cat == "") { html += "<li>Inserire Categoria</li>"; count++; }
    if (cat == "nuovo") {
        if (catnew == "") { html += "<li>Inserire Nuova Categoria</li>"; count++; }
        if (typenew == "") { html += "<li>Inserire Nuova Tipologia Bene</li>"; count++; }
    }
    if ((cat != "nuovo") && (type == "")) { html += "<li>Inserire Tipologia Bene</li>"; count++; }
    if ((type == "nuovo") && (typenew == "")) { html += "<li>Inserire Nuova Tipologia Bene</li>"; count++; }
    if (marca == "") { html += "<li>Inserire Marca</li>"; count++; }
    if (modello == "") { html += "<li>Inserire Modello</li>"; count++; }
    if ((assegnatoa != "") && (dataassegnazione == "")) { html += "<li>Inserire Data di assegnazione</li>"; count++; }
    if (valoreacquisto == "") { html += "<li>Inserire il valore d'acquisto</li>"; count++; }
    html += "</ul>";

    //console.log("typenew", typenew);
    if (count > 0) {
        $("#alert-error").removeClass("hide");
        $("#alert-error").empty();
        $("#alert-error").html(html);
    } else {
        $("#alert-error").empty();
        $("#alert-error").addClass("hide");
        if (idRow) {
            var data = searchData(idRow);
            data.stato = stato;
            data.marca = marca;
            data.modello = modello;
            data.tipologia = type;
            data.category = cat;
            data.sn = sn;
            data.dataacquisto = dataacquisto;
            if (data.assegnatoa != assegnatoa) {
                data.newassegnato = assegnatoa;
            } else {
                data.newassegnato = "";
            }
            data.assegnatoa = assegnatoa;
            data.dataassegnazione = dataassegnazione;
            data.stato = stato;
            data.valoreacquisto = valoreacquisto;
            data.note = note;
            if (catnew != "") {
                dataMod = data;
                createCat();
            } else if (typenew != "") {
                dataMod = data;
                createType(cat);
            } else {
                modRow(data);
            }       
        } else {
            $("#alert-error").addClass("hide");
            $("#alert-error").empty();
            if (catnew != "") {
                createCat();
            } else if (typenew != "") {
                //console.log("CREO TYPE");
                createType(cat);
            } else {
                addRow();
            }
        }
    }
}

function modRow(data) {
    console.log("DATA", data);
    $.ajax({
        method: "POST",
        url: "api/modGood.php",
        data: JSON.stringify({ id: data.id, marca: data.marca, modello: data.modello, tipologia: data.tipologia, category: data.category, sn: data.sn, datainserimento: data.dataacquisto, assegnatoa: data.assegnatoa, dataassegnazione: data.dataassegnazione, stato: data.stato, valoreacquisto: data.valoreacquisto, note: data.note }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Veicolo modificato correttamente");
            $("#form-add").addClass("hide");
            $("#add-button").addClass("hide");
            //cleanInput();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
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
            if (idRow) {
                dataMod.tipologia = data;
                dataMod.category = catid;
                modRow(dataMod);
            } else {
              addRow(catid, data);   
            }
           
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
}

function searchCat(id) {
    var resp = "";
    for (var a = 0; a < category.length; a++){
        if (id == category[a].id) {
            resp = category[a].voce;
        }
    }
    return resp;
}
function searchType(id) {
    var resp = "";
    for (var a = 0; a < typology.length; a++) {
        if (id == typology[a].id) {
            resp = typology[a].voce;
        }
    }
    return resp;
}

function addRow(catid, typeid) {

    var cat = $("#input-categoria").val();
    var type = $("#input-tipologia").val();
    var marca = $("#input-marca").val();
    var modello = $("#input-modello").val();
    var sn = $("#input-sn").val();
    var dataacquisto = $("#input-dataacquisto").val();
    var assegnatoa = $("#input-assegnatoa").val();
    var dataassegnazione = $("#input-dataassegnazione").val();
    var stato = $("#input-stato").val();
    var valoreacquisto = $("#input-valoreacquisto").val();

    if (catid != null) { cat = catid; }
    if (typeid != null) { type = typeid; }

    $.ajax({
        method: "POST",
        url: "api/createGood.php",
        data: JSON.stringify({ marca: marca, modello: modello, tipologia: type, category: cat, sn: sn, datainserimento: dataacquisto, assegnatoa: assegnatoa, dataassegnazione: dataassegnazione, stato: stato, valoreacquisto: valoreacquisto, note: note }),
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
function searchUser(id) {
    var res = " Non Assegnato ";
    for (var a = 0; a < users.length; a++){
        if (id == users[a].id) {
            res = users[a].nome + " " + users[a].cognome;
        }
    }
    return res;
}

function viewGood(id) {
    $(".view-good").text("");
    var good = beni[id];
    $("#view-stato").text(good.stato);
    $("#view-tipologia").text(searchType(good.tipologia));
    $("#view-category").text(searchCat(good.category));
    $("#view-marca").text(good.marca);
    $("#view-modello").text(good.modello);
    $("#view-seriale").text(good.seriale);
    $("#view-datainserimento").text(good.datainserimento);
    $("#view-valoreacquisto").text(good.valoreacquisto);
    $("#view-dataassegnazione").text(good.dataassegnazione);
    $("#view-assegnatoa").html(searchUser(good.assegnatoa));
    $("#view-note").html(good.note);

    $('#viewGood').modal('show');
}

function goods() { 

    var filter = urlParams.get('filter');
    var statofilter = urlParams.get('stato');
    var assegnatofilter = urlParams.get('asse');
    var catfilter = urlParams.get('cat');
    var typefilter = urlParams.get('type');
    $.ajax({
        url: 'api/getGoods.php', 
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ stato: statofilter, assegnatoa: assegnatofilter, category: catfilter, tipologia: typefilter, filter: filter }),
        complete: function (obj, stato) {
            console.log("RISPOSTA", obj.responseJSON);
            if (obj.responseJSON) {
              var righe = obj.responseJSON;
                beni = righe;
                 
            for (i = 0; i < righe.length; i++) {
                var riga = righe[i];
                var element = "<td>" + riga.stato + "</td>";
                element += "<td>" + searchCat(riga.category) + "</td>";
                element += "<td>" + searchType(riga.tipologia) + "</td>";
                element += "<td>" + riga.marca + "</td>";
                element += "<td>" + riga.modello + "</td>";
                element += "<td>" + riga.seriale + "</td>";
                element += "<td>" + riga.datainserimento + "</td>";
                element += "<td>" + searchUser(riga.assegnatoa) + "</td>";
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onClick="storyAssigned(' + riga.id + ')" ><i class="fa-solid fa-user"></i></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="openModRow(' + riga.id + ')"><i class="fa-solid fa-square-pen"></i></button></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="viewGood(' + i + ')"><i class="fa-solid fa-eye"></i></button></td>';
                $("<tr/>").append(element).appendTo("#tabella");

                var element2 = "<td>" + riga.stato + "</td>";
                element2 += "<td>" + searchCat(riga.category) + "</td>";
                element2 += "<td>" + searchType(riga.tipologia) + "</td>";
                element2 += "<td>" + riga.marca + "</td>";
                element2 += "<td>" + riga.modello + "</td>";
                element2 += "<td>" + riga.seriale + "</td>";
                element2 += "<td>" + riga.datainserimento + "</td>";
                element2 += "<td>" + searchUser(riga.assegnatoa) + "</td>";
                element2 += "<td>" + riga.dataassegnazione + "</td>";
                element2 += "<td>" + riga.valoreacquisto + "</td>";
                $("<tr/>").append(element2).appendTo("#tabella-export");
            }  
            }
            
            tablePagination();
            $("#input-stato-filter").val(statofilter);
            $("#input-assegnatoa-filter").val(assegnatofilter);
            $("#input-categoria-filter").val(catfilter);
            if (catfilter = ! "") {
                activeOtherCatFilter();
            }
            $("#input-tipologia-filter").val(typefilter);

        }
    });
}


function storyAssigned(id) {
    var data = searchData(id);

    $("#input-assgiorno").val(strDate);
    userAss = null;
    idRow = id;

    if (data.stato === "Attivo") {
        $("#button-add-ass").removeAttr("disabled");
        $("#display-add-ass").removeClass("hide");
    } else {
        $("#display-add-ass").addClass("hide");
        $("#button-add-ass").attr("disabled");
    }

    $("#bodyGuida").empty();
    $("#input-kmattuali").val(data.km);
    $.ajax({
        method: "POST",
        url: "api/readStory.php",
        data: JSON.stringify({ bene: id }),
        dataType: 'json',
        success: function (data) {
            console.log("STORY", data);
            for (var b = 0; b < data.length; b++) {
                var user = searchUser(data[b].dipendente);
                var dataa = "-";
                if (data[b].a) {
                    dataa = data[b].a;
                }
                var row = '<tr>';
                row += '<td>' + data[b].da + '</td>';
                row += '<td>' + dataa + '</td>';
                row += '<td>' + user + '</td>';
                row += '</tr > ';
                $("#bodyGuida").append(row);
                userAss = data[b].id;
            }
            $('#viewListEl').modal('show');

        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });


}

function insAssegnatario() {
    var dipendente = $("#user-story").val();
    var day = $("#input-assgiorno").val();

    $.ajax({
        method: "POST",
        url: "api/insertStory.php",
        data: JSON.stringify({ idex: userAss, bene: idRow, da: day, dipendente: dipendente }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success-guida").removeClass("hide");
            $("#alert-success-guida").text("Bene Assegnato correttamente");
            $("#view-assign").addClass("hide");
            $("#butt-assign").text("OK");
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });

}

function searchData(id) {
    var data = "";
    for (var a = 0; a < beni.length; a++) {
        if (id == beni[a].id) {
            data = beni[a];
        }
    }
    return data;
}

function openModRow(id) {
    var data = searchData(id);
    //console.log(data);
    idRow = data.id;
    $(".input-data").val("");
    $("#input-categoria").val(data.category);
    activeOtherCat();
    $("#input-tipologia").val(data.tipologia);
    $("#input-marca").val(data.marca);
    $("#input-modello").val(data.modello);
    $("#input-sn").val(data.seriale);
    $("#input-dataacquisto").val(data.datainserimento);
    $("#input-assegnatoa").val(data.assegnatoa);
    $("#input-assegnatoa").prop("disabled", true);
    $("#input-dataassegnazione").val(data.dataassegnazione);
    $("#input-dataassegnazione").prop("disabled", true);
    $("#input-stato").val(data.stato);
    $("#input-valoreacquisto").val(data.valoreacquisto);
    $("#input-note").val(data.note);
    $('#addGood').modal('show');
}

function usersCall() {
    
    
    $.ajax({
        url: 'api/getEmployees.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            console.log("RISPOSTA USER", user.responseJSON);
            users = user.responseJSON;
            for (i = 0; i < users.length; i++) {
                var riga = users[i];
                var element = "<option value='" + riga.id + "'>" + riga.nome + " " + riga.cognome + "</option>";
           
                $("#user-gest").append(element);
                $("#input-assegnatoa").append(element);
                $("#input-assegnatoa-filter").append(element);
                $("#user-story").append(element);
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
            typology = type.responseJSON;
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
                    $("#input-categoria-filter").append(element);
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
    new DateTime(document.getElementById('input-dataassegnazione'), {
        format: 'DD/MM/YYYY'
    });
    new DateTime(document.getElementById('input-assgiorno'), {
        format: 'DD/MM/YYYY'
    });
});
    
           