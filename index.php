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

        </div>

        <!--<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button type="button" class="btn btn-sm btn-outline-secondary" onClick="newGood()">
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
        <?php include("modal.php"); ?>
        <h2>Beni aziendali</h2>
        <div class="table-responsive small">
          <table class="table table-striped display" id="tabella">
            <thead>
              <tr>
                <th scope="col">Categoria</th>
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
  <?php include("../portale/javascript.php"); ?>
  <?php include("../portale/footer.php"); ?>
</body>

</html>