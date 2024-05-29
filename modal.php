<div class="modal fade" id="addGood" tabindex="-1" aria-labelledby="addGoodLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
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
                                    <input type="text" class="form-control input-data" id="input-dataacquisto">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  onclick="closeModal()">Chiudi</button>
                <button type="button" class="btn btn-primary" id="add-button" onclick="controlForm()">Crea</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="viewGestEl" tabindex="-1" aria-labelledby="viewGestElLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewGestElLabel">
                    <i class="fa-solid fa-user-plus"></i>
                    Gestisci Beni assegnati al dipendente
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <label>Seleziona un Dipendente</label>
                            <select class="form-select" id="user-gest" onChange="openListGoods()">
                                <option selected>Seleziona</option>
                            </select>
                        </div>
                        <div class="col-md-7 ms-auto hide" id="monitor-good">
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="start-add-good-to-employee" onClick="goodAssingenedStep1()">
                                <i class="fa-solid fa-user-plus"></i>
                                Assegna Bene
                            </button>
                            <select class="form-select hide" id="tipologia-add-to-employee" onChange="goodAssingenedStep2()">
                                <option selected>Seleziona Tipologia</option>
                                <option value="1">Monitor</option>
                                <option value="2">Laptop</option>
                                <option value="3">PC Fisso</option>
                                <option value="4">Smartphone</option>
                                <option value="5">Altro</option>
                            </select>
                            <table class="table hide" id="add-good-to-employee">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipologia</th>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modello</th>
                                        <th scope="col">S.N.</th>
                                        <th scope="col">Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">pc fisso</th>
                                        <td>Lenovo</td>
                                        <td>A-2134</td>
                                        <td>S151515151616771717</td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                                <i class="fa-solid fa-plus"></i>
                                        </td>
                                        </button>
                                    </tr>
                                </tbody>
                            </table>

                            <button type="button" class="btn btn-sm btn-outline-secondary mt-2 hide" id="button-remove-add-goods" onClick="goodAssingenedRemove()">
                                <i class="fa-solid fa-rotate-right"></i>
                                Annulla Assegnazione
                            </button>

                            <table class="table" id="added-goods-to-employee">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipologia</th>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Modello</th>
                                        <th scope="col">S.N.</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Monitor</th>
                                        <td>Hitachi</td>
                                        <td>A-2134</td>
                                        <td>S151515151616771717</td>
                                        <td><i class="fa-solid fa-trash"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">pc fisso</th>
                                        <td>Dell</td>
                                        <td>M-4321</td>
                                        <td>G166373838383929292</td>
                                        <td><i class="fa-solid fa-trash"></i></td>
                                    </tr>
                                </tbody>
                            </table>

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
<div class="modal fade" id="viewListEl" tabindex="-1" aria-labelledby="viewListElLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewListElLabel">
                    <i class="fa-solid fa-computer"></i>
                    <span id="titolo-bene"></span>
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-9 ms-auto " id="monitor-good">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Assegnato dal</th>
                                        <th scope="col">restituito</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Cognome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>10/01/2023</th>
                                        <td>20/10/2023</td>
                                        <td>Mario</td>
                                        <td>Rossi</td>
                                    </tr>
                                    <tr>
                                        <th>21/10/2023</th>
                                        <td>-</td>
                                        <td>Franco</td>
                                        <td>Bianchi</td>
                                    </tr>
                                </tbody>
                            </table>
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