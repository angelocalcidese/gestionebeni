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
var beniSel = [];
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
    var dataproduzione = $("#input-dataproduzione").val();
    var cespite = $("#input-cespite").val();
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
            data.dataproduzione = dataproduzione;
            data.cespite = cespite;
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
        data: JSON.stringify({ id: data.id, marca: data.marca, modello: data.modello, tipologia: data.tipologia, category: data.category, sn: data.sn, datainserimento: data.dataacquisto, assegnatoa: data.assegnatoa, dataassegnazione: data.dataassegnazione, stato: data.stato, valoreacquisto: data.valoreacquisto, note: data.note, cespite: data.cespite, dataproduzione: data.dataproduzione }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Bene modificato correttamente");
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

function searchCatVoice(id) {
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
    var note = $("#input-note").val();
    var dataproduzione = $("#input-dataproduzione").val();
    var cespite = $("#input-cespite").val();

    if (catid != null) { cat = catid; }
    if (typeid != null) { type = typeid; }

    $.ajax({
        method: "POST",
        url: "api/createGood.php",
        data: JSON.stringify({ marca: marca, modello: modello, tipologia: type, category: cat, sn: sn, datainserimento: dataacquisto, assegnatoa: assegnatoa, dataassegnazione: dataassegnazione, stato: stato, valoreacquisto: valoreacquisto, note: note, cespite: cespite, dataproduzione: dataproduzione }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Bene inserito correttamente");
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
    $("#view-category").text(searchCatVoice(good.category));
    $("#view-marca").text(good.marca);
    $("#view-modello").text(good.modello);
    $("#view-seriale").text(good.seriale);
    $("#view-datainserimento").text(good.datainserimento);
    $("#view-valoreacquisto").text(good.valoreacquisto);
    $("#view-dataassegnazione").text(good.dataassegnazione);
    $("#view-assegnatoa").html(searchUser(good.assegnatoa));
    $("#view-note").html(good.note);
    $("#view-cespite").html(good.cespite);
    $("#view-dataproduzione").html(good.dataproduzione);

    $('#viewGood').modal('show');
}

function controlSelGood(id) {
    var res = null;
    for (var b = 0; b < beniSel.length; b++) {
        if (id == beniSel[b].id) {
            res = b;
        }    
    } 
    return res;
}

function addListAss(id) {
    $("#rapid-btn-" + id).addClass("select-btn");
    
    for (var a = 0; a < beni.length; a++){
        if (id == beni[a].id) {
            search = controlSelGood(id);
           // console.log("SEARCH", search);
            if (search != null) {
                $("#rapid-btn-" + id).removeClass("select-btn");
                beniSel.splice(search, 1);
            } else {
               // console.log("aggiungo");
                beniSel.push(beni[a]);
            }
        }
    }
    if (beniSel.length > 0) {
        $("#btn-assegna-massa").prop("disabled", false);
    } else {
        $("#btn-assegna-massa").prop("disabled", true);
    }
    $("#assegna-counter").text(beniSel.length);
    //console.log("BENI: ", beniSel);
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
                //var element = '<td style="text-align:left;"><button type="button" class="btn btn-sm btn-outline-secondary" id="rapid-btn-' + riga.id + '" onClick="addAssignedView(' + riga.id + ')" ><i class="fa-solid fa-user-plus"></i></td>';
                var element = '<td style="text-align:left;"><button type="button" class="btn btn-sm btn-outline-secondary" title="' + riga.id + '" id="rapid-btn-' + riga.id + '" onClick="addListAss(' + riga.id + ')" ><i class="fa-solid fa-plus"></i></td>';
                element += '<td id="rapid-ass-' + riga.id + '">' + searchUser(riga.assegnatoa) + '</td>';
                element += "<td>" + riga.stato + "</td>";
                element += "<td>" + searchCatVoice(riga.category) + "</td>";
                element += "<td>" + searchType(riga.tipologia) + "</td>";
                element += "<td>" + riga.marca + "</td>";
                element += "<td>" + riga.modello + "</td>";
                element += "<td>" + riga.seriale + "</td>";
                //element += "<td>" + riga.datainserimento + "</td>";
                //element += '<td class="text-center">' + trueOrFalse(riga.accettato) + '</td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onClick="storyAssigned(' + riga.id + ')" ><i class="fa-solid fa-user"></i></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="openModRow(' + riga.id + ')"><i class="fa-solid fa-square-pen"></i></button></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="openDuplicate(' + riga.id + ')"><i class="fa-solid fa-copy"></i></button></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="viewGood(' + i + ')"><i class="fa-solid fa-eye"></i></button></td>';
                element += '<td class="text-center"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="delGood(' + riga.id + ')"><i class="fa-solid fa-trash"></i></button></td>';
                $("<tr/>").append(element).appendTo("#tabella");

                var element2 = "<td>" + riga.stato + "</td>";
                element2 += "<td>" + searchCatVoice(riga.category) + "</td>";
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
            
            tablePaginationNew();
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

function gestCatType() {
    $('#viewCatType').modal('show');
}

function yesDelete() {
    $.ajax({
        method: "POST",
        url: "api/deleteGood.php",
        data: JSON.stringify({ id: idRow }),
        dataType: 'json',
        success: function (data) {
            $("#alert-success-choice").removeClass("hide");
            $("#btn-yes-del").addClass("hide");
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error-choice").removeClass("hide");
            $("#alert-error-choice").text(error);
        }
    });
}

function delGood(id) {
    idRow = id;
    var data = searchData(id);
    console.log("DATA: ", data);
    $("#choice-title").text("Sei Sicuro di voler Eliminare questo bene?");
    $("#choice-text").html("<br><b>" + data.marca + " " + data.modello + "</b> Assegnato a: <b>" + searchUser(data.assegnatoa) + "</b><br><br>(Cancellando questo vene verrà eliminata la storia degli assegnatari per questo bene)");
    $('#modalChoice').modal('show');
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
    //$("#input-kmattuali").val(data.km);
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

function addAssignedView() {
    $("#bodyGoodAss").empty();
    for (var a = 0; a < beniSel.length; a++){
        var element = '<td>' + beniSel[a].marca + '</td><td>' + beniSel[a].modello + '</td><td>' + beniSel[a].seriale + '</td>';
        $("<tr/>").append(element).appendTo("#bodyGoodAss");
    }

    $("#input-assday").val(strDate);
    $("#user-assigned").val("0");
    $('#viewAss').modal('show');
}

function insAssStory() {
    var dipendente = $("#user-story").val();
    var day = $("#input-assgiorno").val();
    insAssegnatario(dipendente, day);
}

function insAssegnatario(dipendente, day, close) {
    
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
            if (close) closeModal();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });

}

var contaBeniSel = 0;
function insAssRapid() {

    if (contaBeniSel < beniSel.length) {
        var dipendente = $("#user-assigned").val();
        var day = $("#input-assday").val();
        $.ajax({
            method: "POST",
            url: "api/insertStoryMassiv.php",
            data: JSON.stringify({ bene: beniSel[contaBeniSel].id, da: day, dipendente: dipendente }),
            contentType: "application/json",
            success: function (data) {
                console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
                contaBeniSel++;
                insAssRapid();
                // if (close) closeModal();
            },
            error: function (error) {
                console.log("funzione chiamata quando la chiamata fallisce", error);
                $("#alert-error").removeClass("hide");
                $("#alert-error").text(error);
            }
        });
    } else {
        console.log("OK BENI GESTITI");
        $("#alert-success-massive").removeClass("hide");
        $("#alert-success-massive").text("Beni Assegnati correttamente");
        $("#view-assign-mass").addClass("hide");
        $("#tasto-assegna-tutti").addClass("hide");
        $("#butt-assign-mass").text("OK");
    }


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
    $("#input-cespite").val(data.cespite);
    $("#input-dataproduzione").val(data.dataproduzione);
    $('#addGood').modal('show');
}
function openDuplicate(id) {
    var data = searchData(id);
    $(".input-data").val("");
    $("#input-categoria").val(data.category);
    activeOtherCat();
    $("#input-tipologia").val(data.tipologia);
    $("#input-marca").val(data.marca);
    $("#input-modello").val(data.modello);
    //$("#input-sn").val(data.seriale);
    $("#input-dataacquisto").val(data.datainserimento);
    //$("#input-assegnatoa").val(data.assegnatoa);
    $("#input-assegnatoa").prop("disabled", false);
    //$("#input-dataassegnazione").val(data.dataassegnazione);
    $("#input-dataassegnazione").prop("disabled", false);
    $("#input-stato").val(data.stato);
    $("#input-valoreacquisto").val(data.valoreacquisto);
    //$("#input-note").val(data.note);
    $("#input-cespite").val(data.cespite);
    $("#input-dataproduzione").val(data.dataproduzione);
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
                $("#user-assigned").append(element);
            }
            
        }
    });
}

function filterType() {
    var id = $("#cat-select-filter").val();
    $(".cat-el").addClass("hide");

    if (id == "") {
        $(".cat-el").removeClass("hide");
    } else {
        $(".cat-" + id).removeClass("hide");
    }
}

function typeCall() {
    $.ajax({
        url: 'api/getType.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (type) {
            console.log("Type Rest", type.responseJSON);
            typology = type.responseJSON;
            if (type.responseJSON) {
                $("#list-type-mod").empty();
                for (i = 0; i < typology.length; i++) {
                    var riga = typology[i];

                    
                    var typeMod = '<li class="list-group-item cat-el cat-' + riga.category + '" ><div class="row"><div class="col-10"><input class="form-control form-control-sm" type="text" id="type-voice-' + riga.id + '" value="' + riga.voce + '"></div>';
                    typeMod += '<div class="col-2"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="modTypeVoice(' + riga.id + ')"><i class="fa-solid fa-square-pen"></i></button></div></div></li>';

                    $("#list-type-mod").append(typeMod);
                    
                }
            }
            filterType();
            goods();
        }
    });
}

function categoryCall(refresh) {
    $.ajax({
        url: 'api/getCategory.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (cat) {
            console.log("Category Resp.", cat.responseJSON);
            if (cat.responseJSON) {
                category = cat.responseJSON;
                $("#list-cat-mod").empty();
                //$("#cat-select-type").empty();
                $(".opt-cat").remove();
                for (i = 0; i < category.length; i++) {
                    var riga = category[i];
                    var element = "<option value='" + riga.id + "' class='opt-cat'>" + riga.voce + "</option>";

                    //if (!refresh) {
                        $("#input-categoria").append(element);
                        $("#input-categoria-filter").append(element);
                        $("#cat-select-filter").append(element);
                    //}
                    
                    $("#cat-select-type").append(element);
                    var catMod = '<li class="list-group-item"><div class="row"><div class="col-10"><input class="form-control form-control-sm" type="text" id="cat-voice-' + riga.id + '" value="' + riga.voce + '"></div>';
                    catMod += '<div class="col-2"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="modCatVoice(' + riga.id + ')"><i class="fa-solid fa-square-pen"></i></button></div></div></li>';
                    $("#list-cat-mod").append(catMod);
                }
            }
            
            typeCall();
        }
    });
}

function searchCat(val) {
    var resp = false;
    for (var a = 0; a < category.length; a++){
        var cat = category[a].voce;
        if (val.toLowerCase() == cat.toLowerCase()) {
            resp = true;
        }
    }
    return resp;
}
function createCatNew() {
    var catnew = $("#cat-voice-new").val();

    if (searchCat(catnew)) {
        //console.log("CATEGORIA ESISTENTE");
        $("#alert-error-cat-new").text("Categoria già esistente");
        $("#alert-error-cat-new").removeClass("hide");
        setTimeout(closeAlarm, 2000);
    } else {
        //console.log("CATEGORIA NON ESISTENTE");
        $.ajax({
            method: "POST",
            url: "api/createCategory.php",
            data: JSON.stringify({ catnew: catnew }),
            contentType: "application/json",
            success: function (data) {
                console.log("funzione CATEGORY chiamata quando la chiamata ha successo (response 200)", data);
                $("#alert-success-cat-new").removeClass("hide");
                setTimeout(closeAlarm, 1000);
                categoryCall(true);
                $("#cat-voice-new").val("");
            },
            error: function (error) {
                console.log("funzione chiamata quando la chiamata fallisce", error);
                $("#alert-error").removeClass("hide");
                $("#alert-error").text(error);
            }
        });
    }   
}

function searchTypeExist(cat, val) {
    var resp = false;
    for (var a = 0; a < typology.length; a++) {
        var type = typology[a].voce;
        if ((val.toLowerCase() == type.toLowerCase()) && (cat == typology[a].category)) {
            resp = true;
        }
    }
    return resp;
}

function createTypeNew() {
    var catid = $("#cat-select-type").val();
    $("#alert-error-type-new").text("Selezionare Categoria");
    console.log("CATID", catid);

    if (catid != "") {
        var typenew = $("#type-voice-new").val();

        if (searchTypeExist(catid, typenew)) {
            //console.log("CATEGORIA ESISTENTE");
            $("#alert-error-type-new").text("Tipologia già esistente");
            $("#alert-error-type-new").removeClass("hide");
            setTimeout(closeAlarm, 2000);
        } else {
            $.ajax({
                method: "POST",
                url: "api/createType.php",
                data: JSON.stringify({ idcat: catid, typenew: typenew }),
                contentType: "application/json",
                success: function (data) {
                    console.log("funzione TYPE chiamata quando la chiamata ha successo (response 200)", data);
                    $("#alert-success-type-new").removeClass("hide");
                    setTimeout(closeAlarm, 1000);
                    $("#cat-select-type").val("");
                    $("#type-voice-new").val("");
                    typeCall();
                },
                error: function (error) {
                    console.log("funzione chiamata quando la chiamata fallisce", error);
                    $("#alert-error").removeClass("hide");
                    $("#alert-error").text(error);
                }
            });
        }

    } else {
        $("#alert-error-type-new").removeClass("hide");
        setTimeout(closeAlarm, 2000);
    }

}


function modCatVoice(id) {
    var voice = $("#cat-voice-" + id).val();

    if (searchCat(voice)) {
        $("#alert-error-cat-new").text("Categoria già esistente");
        $("#alert-error-cat-new").removeClass("hide");
        setTimeout(closeAlarm, 2000);
    } else {
        $.ajax({
            method: "POST",
            url: "api/renameCat.php",
            data: JSON.stringify({ id: id, voice: voice }),
            dataType: 'json',
            success: function (data) {
                $("#alert-success-cat").removeClass("hide");
                setTimeout(closeAlarm, 1000);
                categoryCall(true);
            },
            error: function (error) {
                console.log("funzione chiamata quando la chiamata fallisce", error);
                $("#alert-error").removeClass("hide");
                $("#alert-error").text(error);
            }
        });
    }
}

function modTypeVoice(id) {
    var voice = $("#type-voice-" + id).val();
    $.ajax({
        method: "POST",
        url: "api/renameType.php",
        data: JSON.stringify({ id: id, voice: voice }),
        dataType: 'json',
        success: function (data) {
            $("#alert-success-type").removeClass("hide");
            setTimeout(closeAlarm, 1000);
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
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

/** CARICA CSV */
var countControl = 0;
var countAdd = 0;
var errorCsv = true;
var elencoEl = [];

function addFileElement() {
    $("#error-csv").empty();
    $("#alert-error-csv").addClass("hide");
    errorCSVText = "";
    if (countAdd < elencoEl.length) {
        
        console.log("ELEMENTO ", elencoEl[countAdd]);
        $.ajax({
              method: "POST",
              url: "api/createGood.php",
              data: JSON.stringify({ marca: elencoEl[countAdd].marca, modello: elencoEl[countAdd].modello, tipologia: elencoEl[countAdd].tipologia, category: elencoEl[countAdd].categoria, sn: elencoEl[countAdd].sn, datainserimento: elencoEl[countAdd].datacquisto, assegnatoa: elencoEl[countAdd].assegnatoa, dataassegnazione: elencoEl[countAdd].dataassegnazione, stato: elencoEl[countAdd].stato, valoreacquisto: elencoEl[countAdd].valoreacquisto, note: "" }),
              contentType: "application/json",
              success: function (data) {
                  console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
             
            countAdd++;
            addFileElement();
         },
          error: function (error) {
              console.log("funzione chiamata quando la chiamata fallisce", error);
              $("#alert-error-csv").removeClass("hide");
              $("#alert-error-csv").text(error);
          }
      });
        
    } else {
        $("#spinner-modal").addClass("hide");
        $("#alert-success-csv").removeClass("hide");
    }
}

function controlXLS() {
    
    if ((countControl < importXLS.length) && errorCsv) {
        importXLS[countControl].categoria = searchElement(category, "voce", importXLS[countControl].categoria);
        importXLS[countControl].tipologia = searchElement(typology, "voce", importXLS[countControl].tipologia);
        var assegnatoOrigin = importXLS[countControl].assegnatoa;

        console.log("assegnatoOrigin", importXLS[countControl].assegnatoa);
        importXLS[countControl].assegnatoa = searchUserName(importXLS[countControl].assegnatoa);
        
        var riga = countControl + 1;
        if ((importXLS[countControl].categoria == "") || (importXLS[countControl].stato == "") || (importXLS[countControl].tipologia == "")) {
            errorCsv = false;
            console.log("errore (categoria, stato, tipologia) alla riga " + countControl, importXLS[countControl]);
            errorCSVText += '<li class="list-group-item">categoria, stato, tipologia: alla riga ' + riga + ' errati o non esistenti</li>';
        }
        if ((assegnatoOrigin != "Non Assegnato")) {
            if ((assegnatoOrigin != "") && (importXLS[countControl].assegnatoa == "") ) {
                errorCsv = false;
                console.log("Assegnato a: alla riga " + countControl, importXLS[countControl]);
                errorCSVText += '<li class="list-group-item">Assegnato a: alla riga  ' + riga + ' errato o non esistente</li>';
            }
        }
        

        elencoEl.push(importXLS[countControl])
        countControl++;
       
        controlXLS();
        
    } else if (countControl == importXLS.length) { 
        console.log("CONTROLLO SUPERATO");
        //console.log(elencoEl);
        addFileElement();
    } else {
        $("#error-csv").html(errorCSVText);
        $("#spinner-modal").addClass("hide");
        $("#alert-error-csv").removeClass("hide");

    }
    
}

document.querySelector('#import-csv').addEventListener('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
        var arrayBuffer = this.result,
            array = new Uint8Array(arrayBuffer),
            binaryString = String.fromCharCode.apply(null, array);

        /* Call XLSX */
        var workbook = XLSX.read(binaryString, {
            type: "binary"
        });

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, {
            raw: true
        }));
        importXLS = XLSX.utils.sheet_to_json(worksheet, {
            raw: true
        });
        if (importXLS.length > 0) {
            $("#send-csv-file").prop("disabled", false);
        } else {
            $("#alert-error-csv").removeClass("hide");
        }

    }
    reader.readAsArrayBuffer(this.files[0]);
});

$(document).ready(function () {
    usersCall();
    categoryCall();

    new DateTime(document.getElementById('input-dataacquisto'), {
        format: 'DD/MM/YYYY'
    });
    new DateTime(document.getElementById('input-dataassegnazione'), {
        format: 'DD/MM/YYYY'
    });
    new DateTime(document.getElementById('input-dataproduzione'), {
        format: 'DD/MM/YYYY'
    });
    new DateTime(document.getElementById('input-assgiorno'), {
        format: 'DD/MM/YYYY'
    });
    new DateTime(document.getElementById('input-assday'), {
        format: 'DD/MM/YYYY'
    });
    $("#input-dataacquisto").change(function () {
        $("#input-dataproduzione").val($(this).val());
    });
});
    
           