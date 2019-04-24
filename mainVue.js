let myVueSenate = new Vue({
    el: "#myApp",
    data: {
        members: [],
        checkboxes: [],
        stateSelected: "all",
        stats: {
            rep: 0,
            dem: 0,
            ind: 0,
        },
        repPct: [],
        demPct: [],
        indPct: [],
        search: "",
        currentSort: 'name',
        currentSortDir: 'asc',
        pageSize: 10,
        currentPage: 1,
    },
    methods: {
        getData() {
            let url;
            if (document.title.includes("Senate")) {

                url = "https://api.propublica.org/congress/v1/113/senate/members.json";
            } else {
                url = "https://api.propublica.org/congress/v1/113/house/members.json"
            }

            fetch(url, {
                    headers: {
                        'X-API-Key': 'oNV3jHdBROhphjdgWO8ONz24rCs3LB5BNaW4mGJw'
                    }
                })
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    myVueSenate.members = data.results[0].members;
                    myVueSenate.printStats();
                })
        },
        printStats() {

            for (i = 0; i < this.members.length; i++) {


                if (this.members[i].party == "R") {
                    this.stats.rep++;
                    this.repPct.push(this.members[i].votes_with_party_pct)
                }
                if (this.members[i].party == "D") {
                    this.stats.dem++;
                    this.demPct.push(this.members[i].votes_with_party_pct)

                }
                if (this.members[i].party == "I") {
                    this.stats.ind++;
                    this.indPct.push(this.members[i].votes_with_party_pct)

                }

            }
        },

        sort(s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        nextPage() {
            if ((this.currentPage * this.pageSize) < this.members.length) this.currentPage++;
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
    },
    computed: {
        filteredMembers() {
            return this.members.filter(member => {
                let filtro1 = this.checkboxes.includes(member.party) || this.checkboxes.length == 0;
                let filtro2 = this.stateSelected == member.state || this.stateSelected == "all";
                let filtro3 = (member.first_name.toLowerCase().includes(this.search.toLowerCase())) || (member.last_name.toLowerCase().includes(this.search.toLowerCase()));
                return filtro1 && filtro2 && filtro3
            }).sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },
        states() {
            return new Set(this.members.map(member => member.state).sort());
        },
        totalDem() {
            return this.demPct.reduce(function (a, b) {
                return a + b
            });
        },
        totalRep() {
            return this.repPct.reduce(function (a, b) {
                return a + b
            });
        },
        totalInd() {
            return this.indPct.reduce(function (a, b) {
                return a + b
            });
        },
        sortedMembers() {
            return [...this.members].sort(function (a, b) {
                return (b.missed_votes - a.missed_votes)
            }).slice(0, this.members.length * 0.1)
        },
        reversedMembers() {
            return [...this.members].sort(function (a, b) {
                return (a.missed_votes - b.missed_votes)
            }).slice(0, this.members.length * 0.1)
        },
        mostLoyalMembers() {
            return [...this.members].sort(function (a, b) {
                return (b.votes_with_party_pct - a.votes_with_party_pct)
            }).slice(0, this.members.length * 0.1)
        },
        leastLoyalMembers() {
            return [...this.members].sort(function (a, b) {
                return (a.votes_with_party_pct - b.votes_with_party_pct)
            }).slice(0, this.members.length * 0.1)
        },

    },

    created() {
        this.getData()
    }
});

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 1000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}