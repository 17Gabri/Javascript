let members = data.results[0].members;



let tbodyStats = document.getElementById("miTablaStats");
let tbodyLeastLoyal = document.getElementById("miTablaLeastLoyal");
let tbodyMostLoyal = document.getElementById("miTablaMostLoyal");


let stats = {
    rep: 0,
    dem: 0,
    ind: 0,
}


let repPct = [];
let demPct = [];
let indPct = [];

// Funcion para añadir valor al JSON

printStats();

function printStats() {

    for (i = 0; i < members.length; i++) {


        if (members[i].party == "R") {
            stats.rep++;
            repPct.push(members[i].votes_with_party_pct)
        }
        if (members[i].party == "D") {
            stats.dem++;
            demPct.push(members[i].votes_with_party_pct)

        }
        if (members[i].party == "I") {
            stats.ind++;
            indPct.push(members[i].votes_with_party_pct)

        }

    }
}

let sumaRep = repPct.reduce(function (a, b) { return a + b });
let sumaDem = demPct.reduce(function (a, b) { return a + b });






//Funcion para printar la tabla


printTableStats();

function printTableStats() {
    let template = "";


    template += `
    <tr>
        <td>Democrats</td>
        <td>${stats.dem}</td>
        <td>${(sumaDem / demPct.length).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Republicans</td>
        <td>${stats.rep}</td>
        <td>${(sumaRep / repPct.length).toFixed(2)}</td>
  
      </tr>
      <tr>
        <td>Independents</td>
        <td>${stats.ind}</td>
        <td>${(indPct.length).toFixed(2)}</td>
  
      </tr>
      <tr>
        <td>Total</td>
        <td>${stats.dem + stats.rep + stats.ind}</td>
        <td>${(((sumaDem / demPct.length) + (sumaRep / repPct.length)) / 3).toFixed(2)}</td>
      </tr>`;

    tbodyStats.innerHTML = template;
}


members.sort(function (a, b) {
    return (a.votes_with_party_pct - b.votes_with_party_pct)
})

printBottomLoyalty()

function printBottomLoyalty() {
    let template = "";

    for (i = 0; i < (data.results[0].num_results * 0.1); i++) {

        template += `
      <tr>
        <td><a href="${members[i].url}">${members[i].first_name} ${members[i].middle_name || ""} ${members[i].last_name}</a></td>
        <td>${members[i].total_votes}</td>
        <td>${members[i].votes_with_party_pct}</td>
      </tr>`
    };
    tbodyLeastLoyal.innerHTML = template;
}

//Ordenar array segun uno de sus campos
members.sort(function (a, b) {
    return (b.votes_with_party_pct - a.votes_with_party_pct)
})

printTopLoyalty()

function printTopLoyalty() {
    let template = "";

    for (i = 0; i < (data.results[0].num_results * 0.1); i++) {

        template += `
      <tr>
        <td><a href="${members[i].url}">${members[i].first_name} ${members[i].middle_name || ""} ${members[i].last_name}</a></td>
        <td>${members[i].total_votes}</td>
        <td>${members[i].votes_with_party_pct}</td>
      </tr>`
    };
    tbodyMostLoyal.innerHTML = template;
}