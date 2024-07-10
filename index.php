<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php include("../portale/head.php"); ?>

<body>
  <?php include("../portale/header.php"); ?>

  <div class="container-fluid">
    <div class="row">
      <?php include("../portale/menu.php"); ?>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-page">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Gestione</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="exportXLS('beniaziendali', 'tabella-export')"><i class="fa-solid fa-download"></i> Export .xls</button>
              <button type="button" class="btn btn-sm btn-outline-secondary" style="margin-left:5px;" id="button-exp-veicoli" onclick="importCSV()"><i class="fa-solid fa-upload"></i>Import Beni</button>
            </div>

          </div>
        </div>

        <!--<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button type="button" class="btn btn-sm btn-outline-secondary" onClick="newGood()">
                <i class="fa-solid fa-file-circle-plus"></i>
                Nuovo Bene
              </button>
              <!--<button type="button" class="btn btn-sm btn-outline-secondary" onClick="acceptGoods()">
                <i class="fa-solid fa-handshake"></i>
                Richiedi Accettazione Beni
              </button>-->
              <button type="button" class="btn btn-sm btn-outline-secondary" onClick="gestCatType()">
                <i class="fa-solid fa-square-pen"></i>
                Gest. Categorie e Tipologie
              </button>
              <!-- <button type="button" class="btn btn-sm btn-outline-secondary" onClick="assegnaBeni()">
                <i class="fa-solid fa-pen-to-square"></i>
                Mod. Voci Categorie
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary" onClick="assegnaBeni()">
                <i class="fa-solid fa-pen-to-square"></i>
                Mod. Voci Tipologie
              </button>-->
              <button type="button" id="btn-assegna-massa" class="btn btn-sm btn-outline-secondary" onClick="addAssignedView()" disabled>
                <i class="fa-solid fa-plus-minus"></i>
                Riassegna Beni Selezionati
              </button>

              <!--<button type="button" class="btn btn-sm btn-outline-secondary" onClick="gestUserEl()">
                <i class="fa-solid fa-user-plus"></i>
                Gestisci Beni assegnati al Dipendente
              </button>-->
            </div>
          </div>
        </div>
        <?php include("modal.php"); ?>
        <h2>Beni aziendali</h2>
        <div class="container mt-5 mb-5">
          <div class="row">
            <div class="col">
              <h5>Filtri Semplici: </h5>
            </div>
            <div class="col">
              <select class="form-select form-select-sm input-data-filter" id="input-stato-filter">
                <option value="" selected>Stato</option>
                <option value="Attivo">Attivo</option>
                <option value="Guasto">Guasto</option>
                <option value="Dismesso/venduto">Dismesso/venduto</option>
              </select>
            </div>
            <div class="col">
              <select class="form-select form-select-sm input-data-filter" id="input-assegnatoa-filter">
                <option value="" selected>Assegnato a</option>
              </select>
            </div>
            <div class="col">
              <select class="form-select form-select-sm input-data-filter" id="input-categoria-filter" onchange="activeOtherCatFilter()">
                <option value="" selected>Categoria</option>
              </select>
            </div>
            <div class=" col">
              <select class="form-select form-select-sm input-data-filter" id="input-tipologia-filter" disabled="disabled">
                <option value="" selected>Tipologia</option>
              </select>
            </div>
            <div class="col">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="activeFilter()">Filtra <i class="fa-solid fa-filter"></i></button>
            </div>
            <div class="col">
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="clearFilter()">Cancella Filtri <i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
        </div>
        <div class="table-responsive hide">
          <table class="table table-striped " id="tabella-export">
            <thead>
              <tr>
                <th scope="col">Stato</th>
                <th scope="col">Categoria</th>
                <th scope="col">Tipologia</th>
                <th scope="col">Marca</th>
                <th scope="col">Modello</th>
                <th scope="col">S.N./Targa/IMEI</th>
                <th scope="col">Data acquisto</th>
                <th scope="col">Assegnato a</th>
                <th scope="col">Data Assegnazione</th>
                <th scope="col">Valore d'acquisto</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div class="table-responsive">
          <table class="table table-striped display" id="tabella" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Sel.</th>
                <th scope="col">Assegnato</th>
                <th scope="col">Stato</th>
                <th scope="col">Categoria</th>
                <th scope="col">Tipologia</th>
                <th scope="col">Marca</th>
                <th scope="col">Modello</th>
                <th scope="col">S.N./Targa/IMEI</th>
                <th scope="col" data-bs-toggle="tooltip" data-bs-placement="top" title="Assegna Bene e Vissualizza Storia">Story</th>
                <th scope="col" data-bs-toggle="tooltip" data-bs-placement="top" title="Modifica Bene">Mod.</th>
                <th scope="col" data-bs-toggle="tooltip" data-bs-placement="top" title="Visualizza Dettaglio Bene">Dett.</th>
                <th scope="col" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancella Bene">Canc.</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
  <?php include("../portale/javascript.php"); ?>
  <?php include("../portale/footer.php"); ?>
</body>

</html>