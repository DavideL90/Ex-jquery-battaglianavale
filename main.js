$(document).ready(function(){
  var tabella = $('#table');
  generateTable(tabella);
  chooseelementOfTable(tabella);
  console.log(tabella);
  $('td.col').click(function(){
    $(this).css('background-color', 'red');
  });
});

//genero una tabella 8x8
function generateTable(table){
  for (var r = 0; r < 8; r++) {
    table.append('<tr>' + '</tr>');
    table.children('tr:nth-child(' + (r + 1) + ')').addClass('row' + " " + (r + 1));
    for (var c = 0; c < 8; c++) {
      var nthRow = table.children('tr:nth-child(' + (r + 1) + ')');
      nthRow.append('<td>' + '</td>');
      nthRow.children('td:nth-child(' + (c + 1) + ')').addClass('col' + " " + (c + 1));
    }
  }
}
//scelgo gli elementi della tabella che diventeranno verdi all'attivazione
function chooseElementOfTable(table){
  var randomNumber = Math.floor(Math.random() * 8) + 1;
  console.log()
}
