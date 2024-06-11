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
                                    <label for="input-sn" class="col-form-label">S/N:</label>
                                    <input type="text" class="form-control input-data" id="input-sn">
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
                                    <input type="text" class="form-control numberInput input-data" id="input-valoreacquisto">
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
                                    <button type="button" class="btn btn-outline-secondary" id="button-add-ass" onclick="insAssegnatario()">Assegna</button>
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
                            <p>Serial Number: <b><span class="view-good" id="view-seriale"></span></b></p>
                            <p>Marca: <b><span class="view-good" id="view-marca"></span></b></p>
                            <p>Modello: <b><span class="view-good" id="view-modello"></span></b></p>

                        </div>
                        <div class="col">
                            <p>Data d'acquisto: <b><span class="view-good" id="view-datainserimento"></span></b></p>
                            <p>Assegnato a: <b><span class="view-good" id="view-assegnatoa"></span></b></p>
                            <p>Data Assegnazione: <b><span class="view-good" id="view-dataassegnazione"></span></b></p>
                            <p>Valore d'acquisto: <b><span class="view-good" id="view-valoreacquisto"></span> </b></p>
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