<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php include("../portale/head.php"); ?>

<body>
  <?php include("../portale/header.php"); ?>

  <div class="container-fluid">
    <div class="row">
      <?php include("../portale/menu.php"); ?>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Gestione</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
              <svg class="bi">
                <use xlink:href="#calendar3" />
              </svg>
              This week
            </button>
          </div>
        </div>

        <!--<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addUser" data-bs-whatever="@mdo">
                <i class="fa-solid fa-file-circle-plus"></i>
                Nuovo Bene
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary" onClick="gestUserEl()">
                <i class="fa-solid fa-user-plus"></i>
                Gestisci Beni assegnati al Dipendente
              </button>
            </div>
          </div>
        </div>


        <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addUserLabel">Nuovo Veicolo</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="inputname" class="col-form-label">Tipologia:</label>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Seleziona</option>
                      <option value="1">Furgone</option>
                      <option value="2">Autovettura</option>
                      <option value="3">Camion</option>
                      <option value="4">Ciclomotore</option>
                      <option value="5">Altro</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="inputsurname" class="col-form-label">Marca:</label>
                    <input type="text" class="form-control" id="inputsurname">
                  </div>
                  <div class="mb-3">
                    <label for="inputcf" class="col-form-label">Modello:</label>
                    <input type="text" class="form-control" id="inputcf">
                  </div>
                  <div class="mb-3">
                    <label for="inputnascita" class="col-form-label">Targa:</label>
                    <input type="text" class="form-control" id="inputnascita">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-primary">Crea</button>
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
        <h2>Beni aziendali</h2>
        <div class="table-responsive small">
          <table class="table table-striped table-sm" id="tabella">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tipologia</th>
                <th scope="col">Marca</th>
                <th scope="col">Modello</th>
                <th scope="col">S/N</th>
                <th scope="col">Data acquisto</th>
                <th scope="col">Assegnato a</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
  <!-- jQuery library -->
  <script src="assets/jquery/jquery-3.7.1.min.js"></script>
  <script src="assets/jquery-ui/jquery-ui.js"></script>
  <script src="assets/jquery-ui/datepicker-it.js"></script>
  <script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/fontawesome/js/all.min.js"></script>
  <script src="assets/service.js"></script>
  <script>
    $(document).ready(function() {
      $("#inputnascita").datepicker($.datepicker.regional['it']);
      $("#inputeng").datepicker($.datepicker.regional['it']);
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>
  <script src="dashboard.js"></script>
</body>

</html>