const port = 2000

var ticketSubmitForm = document.getElementById("ticketSubmitForm");
ticketSubmitForm.addEventListener('submit', submitForm);

// With the new snow API this is obsolete
async function fetchSnowData(){
    const response = await fetch(`http://${window.location.hostname}:${port}/data`)
    const responseArray = await response.json()

    //Recently Submitted
    const table = document.getElementById("recentlySubmittedTable");
    const headers = Object.keys(responseArray[0])
    const headerTR = document.createElement("tr");
    headers.forEach(h => {
        const headerTH = document.createElement("th");
        headerTH.innerHTML = h
        headerTR.appendChild(headerTH);
    })
    table.appendChild(headerTR)

    responseArray.forEach(obj => {
        const values = Object.values(obj)
        const tr = document.createElement("tr");
        values.forEach(value => {
            const td = document.createElement("td");
            td.innerHTML = value
            tr.appendChild(td);
        })
        table.appendChild(tr);
    })

    // Known Issues
    const table2 = document.getElementById("knownIssuesTable");
    const headers2 = Object.keys(responseArray[0])
    const headerTR2 = document.createElement("tr");
    headers2.forEach(h => {
        const headerTH = document.createElement("th");
        headerTH.innerHTML = h
        headerTR2.appendChild(headerTH);
    })
    table2.appendChild(headerTR2)

    const filteredArray = responseArray.filter(z => z["Short Description"].toLowerCase().includes("known issue"))
    filteredArray.forEach(obj => {
        const values = Object.values(obj)
        const tr = document.createElement("tr");
        values.forEach(value => {
            const td = document.createElement("td");
            td.innerHTML = value
            tr.appendChild(td);
        })
        table2.appendChild(tr);
    })
}

async function submitForm(event){
    event.preventDefault();

    var textarea = document.getElementById("shortDescription");
    const description = textarea.value
    textarea.value = ""

    const response = await fetch(`http://${window.location.hostname}:${port}/sql`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shortDescription: description
        })
    })

    textarea.value = ""
    const ticketNumber = await response.text()
    console.log(ticketNumber)
}