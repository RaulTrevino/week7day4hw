const inputform = document.getElementById('inputform');
const seasonField = document.getElementById('szn-field');
const roundField = document.getElementById('round-field');
const driverTable = document.getElementById('driver-table');

const f1info = document.querySelector('#inputform')

f1info.addEventListener('submit', async (e) => {
    e.preventDefault();
    const season = seasonField.value
    const round =  roundField.value
    const racerinfo = await requestF1RaceInfo(season,round) //getting 7 drivers
    addf1racerinfo(racerinfo);
})
async function requestF1RaceInfo(season, round) {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`, {
        method: "GET"
    });
    if (res.ok) {
        const data = await res.json();
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7); ///only getting 7
    } else {
        window.alert('Bad Request');
        return null;
    }
}

console.log(requestF1RaceInfo('1993','1'))

function addf1racerinfo(getRacerInfo){
    for(const driver of getRacerInfo){
        const tablerow=document.createElement('tr')
        const tableposition=document.createElement('td')
        tableposition.innerText=driver.position
        
        const tableName=document.createElement('td')
        tableName.innerText=driver.Driver.givenName
        
        const tablefamilyName=document.createElement('td')
        tablefamilyName.innerText=driver.Driver.familyName
        
        const tableNationality=document.createElement('td')
        tableNationality.innerText=driver.Driver.nationality
        
        const tableSponsor=document.createElement('td')
        tableSponsor.innerText=driver.Constructors.name
        
        
        const tablepoints=document.createElement('td')
        tablepoints.innerText=driver.points
        tablerow.append(tableposition,tableName,tablefamilyName,tableNationality,tableSponsor,tablepoints)
        driverTable.appendChild(tablerow)
    }
    console.log(getRacerInfo)
    
}

// async function getf1racerstats(){
//    const information = document.getElementsByTagName('position','name','NationalitySponsorship','points')

//    for(const info of information){
//     info.addEventListener('click',async ()=>{
//         const{position,Name,NationalitynSponsor,Points} = getRacerInfo(info)
//         const url = await requestF1RaceInfo(position,Name,NationalitynSponsor,Points)
//         return{
//             givenName: MRData.StandingsTable.StandingsLists.DriverStandings.givenName,
//             position:MRData.StandingsTable.StandingsLists.DriverStandings.position,
//             NationalitynSponsorship:MRData.StandingsTable.StandingsLists.DriverStandings.nationality,
//             points:MRData.StandingsTable.StandingsLists.DriverStandings.points
//         }
        
        
//     })
//    }
// }
// console.log(getf1racerstats(givenName))


// tableName.innerHTML = '';
