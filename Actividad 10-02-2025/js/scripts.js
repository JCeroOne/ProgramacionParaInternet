// Toast

const toastLiveExample = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
setTimeout(() => {
    toastBootstrap.show();
}, 5000);

// MAP

const map = L.map("map").setView([21.110380321984294, -89.61122196364184], 7);
L.tileLayer(`https://api.mapbox.com/styles/v1/jceroone/clrz25kzw01bc01nl64nl6xlx/tiles/512/{z}/{x}/{y}?access_token=${API}`, {
    maxZoom: 19,
    minZoom: 6,
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://apps.mapbox.com/feedback/">Improve this map</a>'
}).addTo(map);

// Fake warnings

const Advisories = [
    {
        id: "tstm003",
        name: "Potencial de tormentas #003",
        type: "watch",
        desc: "Se espera la formación de tormentas severas en el centro, oriente y sur de la Península esta tarde.",
        validity: {start: "11/02/2024, 11:30h", end: "12/02/2024, 00:00h"},
        polygon: [[20.136942096659514, -87.41678156043142], [20.05719026098424, -88.44891806714128], [19.57783240453534, -89.53984715967637], [18.8993904863478, -89.97752529859764], [18.25541334995095, -90.45439850602466], [17.745968937118214, -90.41520344880784], [17.770853906178022, -89.08910401297176], [17.938736642403057, -89.06297397482719], [17.83926969938425, -88.85393366967077], [18.416635131045496, -88.45545058796633], [18.435227954477952, -88.16802016837624], [18.317439514827523, -88.01123993950893], [18.06920217455712, -87.97204488229208], [18.15612542712418, -87.76300457713566], [19.047652608984226, -87.44944411940102], [19.627063628402816, -87.3122614191421]]
    }, {
        id: "heat008",
        name: "Calor extremo #008",
        type: "heat",
        desc: "Se esperan temperaturas máximas de 35 a 39°C desde este miércoles, con sensación térmica superior a 40°C.",
        validity: {start: "12/02/2024, 12:00h", end: "17/02/2024, 12:00h"},
        polygon: [[21.096847667131993, -90.30415077741151], [21.34043324302083, -89.69009488101449], [21.431673897166505, -88.8735311889972], [21.589689229413356, -88.62529582662394], [21.650418543841646, -88.12882510187742], [21.346517722643945, -88.16148764955813], [20.834546947298264, -88.53384069311802], [20.49303734583994, -88.9606175995156], [19.929521968632123, -89.54725368699408], [19.516444214069413, -90.31403786432817], [19.647005040692527, -90.73900258911576], [19.864370287961265, -90.6697148622482], [20.038048399448158, -90.58656959000717], [20.76538602183221, -90.5219010449308]]
    }, {
        id: "tstm045",
        name: "Alerta por tormenta #045",
        type: "warning",
        desc: "Tormenta severa observada cerca de Chetumal, Quintana Roo, con movimiento hacia el este-noreste.",
        validity: {end: "11/02/2024, 15:45h"},
        polygon: [[18.535581235250568, -88.21276895252173], [18.457304615832673, -88.27103275366574], [18.541105300000005, -88.7006539690167], [18.738896045283735, -88.52624601673]]
    }, {
        id: "tstm046",
        name: "Alerta por tormenta #046",
        desc: "Tormenta severa observada cerca de Noh-Bec, Quintana Roo, con movimiento hacia el este.",
        type: "warning",
        validity: {end: "11/02/2024, 15:15h"},
        polygon: [[18.991840703761056, -88.10050880370837], [19.282457513185403, -87.9851523628258], [19.37576104563653, -88.52897558412921], [19.074926225374153, -88.58940038649625]]
    }, {
        id: "tstm047",
        name: "Alerta por tormenta #047",
        type: "warning",
        desc: "Tormenta severa observada cerca de Xpujil, Campeche, con movimiento hacia el este-noreste.",
        validity: {end: "11/02/2024, 17:00h"},
        polygon: [[18.54023121059304, -89.29704027916304], [18.40392050573054, -89.33623533637987], [18.45969706714157, -89.71185463470783], [18.73830714666833, -89.6301982655061]]
    }
]

Advisories.forEach(a => {
    let p = L.polygon(a.polygon, {color: `${(adv => {
        if(adv.type == "watch") return "#ff0";
        if(adv.type == "heat") return "#f80";
        else return "#f00";
    })(a)}`});
    p.bindPopup(`<div class="advisory-popup">
            <h2>${(a.type == "warning") ? "<i class='fa-solid fa-triangle-exclamation'></i> " : " "}${a.name}</h2>
            <p>
                ${(a.type != "warning") ? `<strong>Válido desde:</strong> ${a.validity.start}<br/>` : ""}
                <strong>Válido hasta:</strong> ${a.validity.end}<br/><br/>
                ${a.desc}
            </p>
            <a href="#" class="btn btn-${(adv => {
                if(adv.type != "warning") return "warning";
                else return "danger";
            })(a)}">Ver detalles</a>
        </div>`);
    p.addTo(map);
});