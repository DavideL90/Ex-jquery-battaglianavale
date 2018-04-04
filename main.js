$(document).ready(function(){
  var tabella = $('#table');
  //genero contatori per tenere traccia del punteggio dei singoli quadrati
  var contRed = 0;
  var contGreen = 0;
  //mostro sullo schermo il punteggio iniziale di 0 quadrati
  $('#cont-red').html(contRed);
  $('#cont-green').html(contGreen);
  //genero una tabella
  generateTable(tabella);
  //scelgo casualmente 15 elementi da trovare
  chooseElementOfTable(tabella);
  //genero un array per tenere traccia degli elementi già cliccati e per non conteggiarli
  var clickedElements = [];
  $('td.col').click(function(){
    //assegno la riga e la colonna cliccate a due variabili
    var riga = $(this).parent().attr('class');
    var colonna = $(this).attr('class');
    //genero la variabile isFound per vedere se è stato già cliccato un elemento
    var isFound = false;
    //creo un oggetto da inserire nell'array
    var cliccato = {
      'riga' : riga,
      'colonna' : colonna
    };
    //se l'array è vuoto ci pusho l'oggetto senza ulteriori controlli
    if(clickedElements.length == 0){
      clickedElements.push(cliccato);
    }
    else{
      var contatore = 0;
      //faccio un ciclo per controllare che l'elemento cliccato non sia già stato cliccato
      do{
        //se la riga e la colonna sono all'interno dell'array di oggetti, allora il quadrato è stato cliccato
        if((clickedElements[contatore].riga == riga) && (clickedElements[contatore].colonna == colonna)){
          isFound = true;
        }
        else{
          contatore++;
        }
      }while((contatore < clickedElements.length) && (!isFound));
      //se siamo usciti dal ciclo e l'elemento non è stato trovato allora si pusha dentro l'array altrimenti si manda un alert
      if(!isFound){
        clickedElements.push(cliccato);
      }
      else{
        alert("Hai già cliccato sulla casella!");
      }
    }
    //se isFound non è stato trovato, quindi è false, allora incremento il contatore e coloro il quadrato
    if (!isFound) {
      if($(this).hasClass("bomb")){
        $(this).css('background', 'linear-gradient(#ea8f8f, #ff4949)');
        contRed++;
        $('#cont-red').html(contRed);
      }
      else{
        $(this).css('background', 'linear-gradient(#72bf99, #51d160)');
        contGreen++;
        $('#cont-green').html(contGreen);
      }
    }
  });
});

//genero una tabella 8x8
function generateTable(table){
  for (var r = 0; r < 8; r++) {
    table.append('<tr>' + '</tr>');
    table.children('tr:nth-child(' + (r + 1) + ')').addClass('row' + ' ' + (r + 1));
    for (var c = 0; c < 8; c++) {
      var nthRow = table.children('tr:nth-child(' + (r + 1) + ')');
      nthRow.append('<td>' + '</td>');
      nthRow.children('td:nth-child(' + (c + 1) + ')').addClass('col' + ' ' + (c + 1));
    }
  }
}
//scelgo gli elementi della tabella che diventeranno verdi all'attivazione
function chooseElementOfTable(table){
  //genero due numeri casuali per le righe e le colonne
  var randomRowNumber = Math.floor(Math.random() * 8) + 1;
  var randomColNumber = Math.floor(Math.random() * 8) + 1;
  //creo un array di oggetti per tenere in memoria quali caselle della tabella sono già uscite
  var arrayLanci = [{
    'riga' : randomRowNumber,
    'colonna' : randomColNumber
  }];
  //aggiungo la classe bomb all'elemento sorteggiato
  var nthRow = table.children('tr:nth-child(' + randomRowNumber + ')');
  nthRow.children('td:nth-child(' + randomColNumber + ')').addClass(' ' + 'bomb');
  //faccio un ciclo per scegliere le 15 caselle
  for (var i = 1; i < 15; i++) {
    randomRowNumber = Math.floor(Math.random() * 8) + 1;
    randomColNumber = Math.floor(Math.random() * 8) + 1;
    var count = 0;
    //controllo che il nuovo 'lancio' non sia già uscito
    do{
      if((randomRowNumber == arrayLanci[count].riga) && (randomColNumber == arrayLanci[count].colonna)){
        randomRowNumber = Math.floor(Math.random() * 8) + 1;
        randomColNumber = Math.floor(Math.random() * 8) + 1;
        count = 0;
      }
      else{
        count++;
      }
    }while(count < arrayLanci.length);
    var lancio = {
      'riga' : randomRowNumber,
      'colonna' : randomColNumber
    }
    arrayLanci.push(lancio);
    nthRow = table.children('tr:nth-child(' + randomRowNumber + ')');
    nthRow.children('td:nth-child(' + randomColNumber + ')').addClass(' ' + 'bomb');
  }
}
