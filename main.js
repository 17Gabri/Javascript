


//Members
let members = data.results[0].members;

//Table from HTML
let tbody = document.getElementById("miTabla");


//Listeners
document.getElementById("rep").addEventListener("change", changeCB);
document.getElementById("dem").addEventListener("change", changeCB);
document.getElementById("ind").addEventListener("change", changeCB);
document.getElementById("selectstate").addEventListener("change", changeCB);
//We need to execute this function to see the first table
printTable();

// Function to print the table
function printTable() {
  let template = "";

  members.forEach(function (member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}



//Function executed when the cb are clicked
function changeCB() {
  let repCb = document.getElementById("rep");
  let demCb = document.getElementById("dem");
  let indCb = document.getElementById("ind");
  let checkeados = [];

  if (repCb.checked) {
    checkeados.push("R");
  }

  if (demCb.checked) {
    checkeados.push("D");
  }

  if (indCb.checked) {
    checkeados.push("I");
  }

  if (!repCb.checked && !demCb.checked && !indCb.checked) {
    checkeados.push("R");
    checkeados.push("D");
    checkeados.push("I");
  }

  let membersToPrint = [];

  members.forEach(function (member) {
    if (checkeados.includes(member.party) && (member.state == document.getElementById("selectstate").value
      || document.getElementById("selectstate").value == "Select")) {
      membersToPrint.push(member);
    }
  });

  console.log(membersToPrint);

  printNewTable(membersToPrint);
}

//Funcion para mostrar estados en selector

cargar();

function cargar() {
  let members = data.results[0].members //  Array de states
  let select = document.getElementById("selectstate"); //Seleccionamos el select


  Array.from(new Set(members //Crear Array, New Set elimina duplicados pero no es array
    .map(member => member.state) //cambiar valor del array por "state"
    .sort()))                 //ordenar array
    .forEach(state => {       //forEach para añadir las opciones del select
      let option = document.createElement("option"); //Creamos la opcion
      option.innerHTML = state; //Metemos el texto en la opción
      select.appendChild(option); //Metemos la opción en el select
    });
}


//Function that prints the new members
function printNewTable(miembrosAImprimir) {
  let template = "";

  miembrosAImprimir.forEach(function (member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}










// Plug -in Jquery Filtros

$(document).ready(function () {
  $('#tabla').DataTable();
});

// $(document).ready(function () {
//   $('#tabla').DataTable({
//     initComplete: function () {
//       this.api().columns([2]).every(function () {
//         let column = this;
//         let select = $('<select><option value=""></option></select>')
//           .appendTo($(column.header()))
//           .on('change', function () {
//             let val = $.fn.dataTable.util.escapeRegex(
//               $(this).val()
//             );

//             column
//               .search(val ? '^' + val + '$' : '', true, false)
//               .draw();
//           });

//         column.data().unique().sort().each(function (d, j) {
//           select.append('<option value="' + d + '">' + d + '</option>')
//         });
//       });
//     }
//   });
// });








