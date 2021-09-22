// Luxon DateTime
var DateTime = luxon.DateTime;

const tormentorNames = [
    "Kazj The Sentinel",
    "Promathiz",
    "Sentinel Shakorzeth",
    "Intercessor Razzra",
    "Gruukuuek the Elder",
    "Algel the Haunter",
    "Malleus Grakizz",
    "Gralebboih",
    "The Mass of Souls",
    "Manifestation of Pain",
    "Versya the Damned",
    "Zul'gath the Flayer",
    "Golmak The Monstrosity",
    "Sentinel Pyrophus",
    "Mugrem the Soul Devourer"
]

function refreshTable() {
    var oldTbl = document.getElementById("MyTable");
    if (oldTbl != null) {
        oldTbl.remove();
    }

    createTormentorsTable();
}

function createTormentorsTable() {
    const baseTime = DateTime.local(2021, 8, 9, 15, 0, 0, 0, {zone: "utc"}); // 08/09/2021 3:00:00 PM GMT
    //const baseTime2 = DateTime.local(2021, 9, 21, 19, 0, 0, 0, {zone: "utc"}); // 09/21/2021 7:00:00 PM GMT
    const baseTormentorIdx = 0;
    //const baseTormentor2 = tormentorNames[8];
    const milliSecondsBetweenTormentors = 1000 * 60 * 60 * 2; // 2 hours. Tormentors appear every other hour.
    //const milliSecondsBetweenTormentors = 1000; // 2 hours. Tormentors appear every other hour.

    const serverTimeZone = "America/Los_Angeles";
    const userTimeZone = DateTime.now().zoneName;
    
    const currentTime = DateTime.utc();
    
    const tormentorsPassed = Math.floor((currentTime.toMillis() - baseTime.toMillis()) / milliSecondsBetweenTormentors);
    
    const offsetStartTimeUTC = DateTime.fromMillis(baseTime.toMillis() + ((milliSecondsBetweenTormentors) * tormentorsPassed));
    const currentTormentor = (baseTormentorIdx + tormentorsPassed) % tormentorNames.length;


    var body = document.body;
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "MyTable");
    tbl.style.width = "auto";

    var header = tbl.createTHead();
    var header_row = header.insertRow();
    header_row.style.fontWeight = "bold";

    var tormentor_header = header_row.insertCell();
    tormentor_header.appendChild(document.createTextNode("Tormentor"));

    var user_time_header = header_row.insertCell();
    user_time_header.appendChild(document.createTextNode("Your Time"));

    var server_time_header = header_row.insertCell();
    server_time_header.appendChild(document.createTextNode("Server Time"));

    var tbody = tbl.createTBody();


    let acurrentTormentorIdx = ((currentTormentor + tormentorNames.length) - 1) % tormentorNames.length;

    const atormentorTime = baseTime.plus({milliseconds: tormentorsPassed * milliSecondsBetweenTormentors}).minus({milliseconds: milliSecondsBetweenTormentors})

    var atr = tbody.insertRow();
    var atd1 = atr.insertCell();
    atd1.appendChild(document.createTextNode(tormentorNames[acurrentTormentorIdx]));
    atd1.style.border = "1px solid red";
    var atd2 = atr.insertCell();
    atd2.appendChild(document.createTextNode(atormentorTime.setZone(userTimeZone).toLocaleString({...DateTime.DATETIME_SHORT, weekday: "long"})));
    atd2.style.border = "1px solid red";
    var atd3 = atr.insertCell();
    atd3.appendChild(document.createTextNode(atormentorTime.setZone(serverTimeZone).toLocaleString({...DateTime.DATETIME_SHORT, weekday: "long"})));
    atd3.style.border = "1px solid red";


    let color = "green";
    for (let i = 0; i < tormentorNames.length; i++) {
        let currentTormentorIdx = (currentTormentor + i) % tormentorNames.length;

        const tormentorTime = baseTime.plus({milliseconds: tormentorsPassed * milliSecondsBetweenTormentors}).plus({milliseconds: milliSecondsBetweenTormentors * i})

        var tr = tbody.insertRow();
        var td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(tormentorNames[currentTormentorIdx]));
        td1.style.border = "1px solid " + color;
        var td2 = tr.insertCell();
        td2.appendChild(document.createTextNode(tormentorTime.setZone(userTimeZone).toLocaleString({...DateTime.DATETIME_SHORT, weekday: "long"})));
        td2.style.border = "1px solid " + color;
        var td3 = tr.insertCell();
        td3.appendChild(document.createTextNode(tormentorTime.setZone(serverTimeZone).toLocaleString({...DateTime.DATETIME_SHORT, weekday: "long"})));
        td3.style.border = "1px solid " + color;

        color = "black";
    }

    body.appendChild(tbl);
}

createTormentorsTable();