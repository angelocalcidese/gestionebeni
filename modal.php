<div class="modal fade" id="addGood" tabindex="-1" aria-labelledby="addGoodLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addGoodLabel">Creazione Nuovo Bene</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-primary hide" id="alert-success" role="alert"></div>
                <div class="alert alert-danger hide" id="alert-error" role="alert"></div>
                <form id="form-add">
                    <div class=" container">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label for="input-stato" class="col-form-label">Stato:</label>
                                    <select class="form-select input-data" id="input-stato">
                                        <option value="" selected>Seleziona</option>
                                        <option value="Attivo">Attivo</option>
                                        <option value="Guasto">Guasto</option>
                                        <option value="Dismesso/venduto">Dismesso/venduto</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="input-categoria" class="col-form-label">Categoria:</label>
                                    <select class="form-select input-data" onchange="activeOtherCat()" id="input-categoria">
                                        <option value="" selected>Seleziona</option>
                                        <option value="nuovo">+ Nuovo</option>
                                    </select>
                                </div>
                                <div class="mb-3 hide" id="other-val-cat">
                                    <label for="input-altro-cat" class="col-form-label ">Nuova Categoria:</label>
                                    <input type="text" class="form-control  input-data" id="input-altro-cat">
                                </div>
                                <div class="mb-3">
                                    <label for="input-tipologia" class="col-form-label">Tipologia:</label>
                                    <select class="form-select input-data" onchange="activeOtherType()" id="input-tipologia" disabled="disabled">
                                        <option value="" selected>Seleziona</option>
                                        <option value="nuovo">+ Nuovo</option>
                                    </select>
                                </div>
                                <div class="mb-3 hide" id="other-val-type">
                                    <label for="input-altro-type" class="col-form-label ">Nuova Tipologia:</label>
                                    <input type="text" class="form-control input-data" id="input-altro-type">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="input-marca" class="col-form-label">Marca:</label>
                                    <input type="text" class="form-control input-data" id="input-marca">
                                </div>
                                <div class="mb-3">
                                    <label for="input-modello" class="col-form-label">Modello:</label>
                                    <input type="text" class="form-control input-data" id="input-modello">
                                </div>
                                <div class="mb-3">
                                    <label for="input-sn" class="col-form-label">S.N./Targa/IMEI:</label>
                                    <input type="text" class="form-control input-data" id="input-sn">
                                </div>
                                <div class="mb-3">
                                    <label for="input-sn" class="col-form-label">Cespite:</label>
                                    <input type="text" class="form-control input-data" id="input-cespite">
                                </div>
                                <div class="mb-3">
                                    <label for="input-dataacquisto" class="col-form-label">Data d'acquisto</label>
                                    <input type="text" class="form-control format-data input-data" maxlength="10" id="input-dataacquisto">
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="input-assegnatoa" class="col-form-label">Assegna a:</label>
                                    <select class="form-select input-data" id="input-assegnatoa">
                                        <option value="" selected>Non Assegnato</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="input-dataassegnazione" class="col-form-label">Data assegnazione</label>
                                    <input type="text" class="form-control format-data input-data" maxlength="10" id="input-dataassegnazione">
                                </div>
                                <div class="mb-3">
                                    <label for="input-valoreacquisto" class="col-form-label">Valore d'acquisto (euro):</label>
                                    <input type="text" class="form-control input-data" id="input-valoreacquisto">
                                </div>
                                <div class="mb-3">
                                    <label for="input-dataacquisto" class="col-form-label">Data Produzione</label>
                                    <input type="text" class="form-control format-data input-data" maxlength="10" id="input-dataproduzione">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3">
                                <label for="input-note" class="form-label">Note:</label>
                                <textarea class="form-control" id="input-note" rows="4" maxlength="3000"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Chiudi</button>
                <button type="button" class="btn btn-primary" id="add-button" onclick="controlForm()">Invia</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="viewListEl" tabindex="-1" aria-labelledby="viewListElLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewListElLabel">
                    <span id="titolo-bene">Assegnatari Bene</span>
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-primary hide" id="alert-success-guida" role="alert"></div>
                    <div class="alert alert-danger hide" id="alert-error-guida" role="alert"></div>
                    <div id="view-assign">

                        <div class="row">


                            <div class="col-md ms-auto " id="monitor-good">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Assegnato dal</th>
                                            <th scope="col">restituito il </th>
                                            <th scope="col">Dipendente</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyGuida">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="display-add-ass">
                            <div class="row">
                                <p class="h6">Assegna Bene</p>
                                <div class="col">
                                    <label for="user-story" class="col-form-label">Nuovo assegnatario:</label>
                                    <select class="form-select" id="user-story">
                                        <option value="0" selected>Nessuno</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="input-assgiorno" class="col-form-label">dal giorno :</label>
                                    <input type="text" class="form-control format-data" id="input-assgiorno" pattern="^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*" maxlength="10" placeholder="dal giorno">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col">
                                    <button type="button" class="btn btn-outline-secondary" id="button-add-ass" onclick="insAssStory()">Assegna</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="butt-assign" data-bs-dismiss="modal" onClick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="viewAss" tabindex="-1" aria-labelledby="viewAssLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewAssLabel">
                    <span id="titolo-bene">Assegna i beni selezionati</span>
                </h1>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="alert alert-primary hide" id="alert-success-massive" role="alert"></div>
                    <div class="alert alert-danger hide" id="alert-error-massive" role="alert"></div>
                    <div id="view-assign-mass">
                        <div class="row">


                            <div class="col-md ms-auto" id="monitor-good">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Marca</th>
                                            <th scope="col">Modello</th>
                                            <th scope="col">S/N</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodyGoodAss">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="display-add-ass">
                            <div class="row">
                                <div class="col">
                                    <label for="user-assigned" class="col-form-label">Nuovo assegnatario:</label>
                                    <select class="form-select" id="user-assigned">
                                        <option value="0" selected>Nessuno</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="input-assday" class="col-form-label">dal giorno :</label>
                                    <input type="text" class="form-control format-data" id="input-assday" pattern="^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*" maxlength="10" placeholder="dal giorno">
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" id="tasto-assegna-tutti" onclick="insAssRapid()">Assegna Tutti</button>
                <button type="button" class="btn btn-secondary" id="butt-assign-mass" data-bs-dismiss="modal" onClick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="viewGood" tabindex="-1" aria-labelledby="viewGoodLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewGoodLabel">Visualizza dati bene</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col">
                            <p>Stato: <b><span class="view-good" id="view-stato"></span></b></p>
                            <p>Categoria: <b><span class="view-good" id="view-category"></span></b></p>
                            <p>Tipologia: <b><span class="view-good" id="view-tipologia"></span></b></p>
                            <p>S.N./Targa/IMEI: <b><span class="view-good" id="view-seriale"></span></b></p>
                            <p>Cespite: <b><span class="view-good" id="view-cespite"></span></b></p>
                            <p>Marca: <b><span class="view-good" id="view-marca"></span></b></p>
                            <p>Modello: <b><span class="view-good" id="view-modello"></span></b></p>

                        </div>
                        <div class="col">
                            <p>Data d'acquisto: <b><span class="view-good" id="view-datainserimento"></span></b></p>
                            <p>Assegnato a: <b><span class="view-good" id="view-assegnatoa"></span></b></p>
                            <p>Data Assegnazione: <b><span class="view-good" id="view-dataassegnazione"></span></b></p>
                            <p>Valore d'acquisto: <b><span class="view-good" id="view-valoreacquisto"></span> </b></p>
                            <p>Data Produzione: <b><span class="view-good" id="view-dataproduzione"></span> </b></p>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col">
                            <p>Note: <br>
                                <span class="view-good" id="view-note"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalChoiceAcc" tabindex="-1" aria-labelledby="choiceModalKm" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
            <div class="modal-body p-4 text-center">
                <h5 class="mb-0">Seleziona l'utente a cui va richiesta l'accettazione dei beni</h5>
                <select class="form-select mt-4" id="input-usergoods">
                    <option selected>Seleziona</option>
                </select>
            </div>
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick="goodsAcc()"><strong>Cerca</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" onclick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCSV" tabindex="-1" aria-labelledby="csvModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
            <div class="modal-body p-4 text-center">
                <h5 class="mb-0">Carica XLSX</h5>

                <div class="alert alert-primary  mt-3 hide" id="alert-success-csv" role="alert">File caricato con successo</div>
                <div class="alert alert-danger  mt-3 hide" id="alert-error-csv" role="alert"> Caricare file Valido
                    <ul class="list-group list-group-flush" id="error-csv"></ul>
                </div>

                <div class="spinner-border mb-3 mt-3 hide" id="spinner-modal" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="mb-3 mt-3" id="import-csv-input">
                    <a href="template.xlsx" target="_blank" class="mt-3"><i class="fa-regular fa-file"></i> Scarica Template</a>
                    <input class="form-control mt-3" type="file" id="import-csv">
                </div>
            </div>
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end button-send" id="send-csv-file" onClick="yesSendCsv()" disabled><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 button-close-send " onclick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalChoice" tabindex="-1" aria-labelledby="choiceModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
            <div class="modal-body p-4 text-center">
                <h5 class="mb-0" id="choice-title"></h5>
                <div class="alert alert-primary  mt-3 hide" id="alert-success-choice" role="alert">File cancellato con successo</div>
                <div class="alert alert-danger  mt-3 hide" id="alert-error-choice" role="alert"></div>
                <p class="mb-0" id="choice-text"></p>
                <input type="hidden" id="input-id">
            </div>
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" id="btn-yes-del" onclick="yesDelete()"><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" onclick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="viewCatType" tabindex="-1" aria-labelledby="viewCatTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewCatTypeLabel">Gestisci Voci Categorie e Tipologie</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col border border-primary rounded pt-3 mx-1 ">
                            <div class="alert alert-primary mt-3 hide" id="alert-success-cat-new" role="alert">Categoria Creata con successo</div>
                            <h6>Crea Categoria</h6>
                            <ul class="list-group mb-3">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-10">
                                            <input class="form-control form-control-sm" type="text" id="cat-voice-new" value="">
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="createCatNew()"><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="alert alert-primary mt-3 hide" id="alert-success-cat" role="alert">Categoria Modificata con successo</div>
                            <h6>Modifica Nome Categorie</h6>
                            <ul class="list-group mb-3" id="list-cat-mod"></ul>
                        </div>
                        <div class="col border border-primary rounded pt-3 mx-1">
                            <div class="alert alert-primary mt-3 hide" id="alert-success-type-new" role="alert">Tipologia Creata con successo</div>
                            <div class="alert alert-danger mt-3 hide" id="alert-error-type-new" role="alert">Selezionare la Categoria</div>
                            <h6>Crea Tipologia</h6>
                            <ul class="list-group mb-3">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-5">
                                            <select class="form-select form-select-sm" id="cat-select-type">
                                                <option selected value="">Sel. Categoria</option>
                                            </select>
                                        </div>
                                        <div class="col-5">
                                            <input class="form-control form-control-sm" type="text" id="type-voice-new" placeholder="nome Tipologia" value="">
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="createTypeNew()"><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <h6>Filtra per</h6>
                            <ul class="list-group mb-3">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col">
                                            <select class="form-select form-select-sm" id="cat-select-filter" onchange="filterType()">
                                                <option selected value="">Tutti</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="alert alert-primary mt-3 hide" id="alert-success-type" role="alert">Tipologia Modificata con successo</div>
                            <h6>Modifica Nome Tipologie</h6>
                            <ul class="list-group mb-3" id="list-type-mod"></ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>