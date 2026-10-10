// === Lis pwodwi yo (pa kounye a, se ou menm ki ekri yo) ===
const pwodwiYo = [
  { non: "Mango", pri: 50, imaj: "https://via.placeholder.com/150" },
  { non: "Banann", pri: 30, imaj: "https://via.placeholder.com/150" },
  { non: "Zaboka", pri: 80, imaj: "https://via.placeholder.com/150" },
  { non: "Papay", pri: 60, imaj: "https://via.placeholder.com/150" },
  { non: "Kokoye", pri: 40, imaj: "https://via.placeholder.com/150" },
  { non: "Anana", pri: 100, imaj: "https://via.placeholder.com/150" }
];

// === Nimewo WhatsApp machann lan (chanje l) ===
const nimewoMachann = "8299224562"; // san + ak san espas

// === Panye a (sa kliyan an chwazi) ===
let panye = [];

// === Afiche pwodwi yo sou paj la ===
function afichePwodwi() {
  const lis = document.getElementById("lisPwodwi");
  lis.innerHTML = "";

  pwodwiYo.forEach((p, index) => {
    const kat = document.createElement("div");
    kat.className = "kat";
    kat.innerHTML = `
      <img src="${p.imaj}" alt="${p.non}">
      <h3>${p.non}</h3>
      <p class="pri">${p.pri} goud</p>
      <button onclick="ajouteNanPanye(${index})">Ajoute</button>
    `;
    lis.appendChild(kat);
  });
}

// === Ajoute yon pwodwi nan panye a ===
function ajouteNanPanye(index) {
  const pwodwi = pwodwiYo[index];
  const dejaLa = panye.find(item => item.non === pwodwi.non);

  if (dejaLa) {
    dejaLa. kantite += 1;
  } else {
    panye.push({ ...pwodwi, kantite: 1 });
  }

  afichePanye();
}

// === Afiche panye a ===
function afichePanye() {
  const rezime = document.getElementById("rezimeKòmand");

  if (panye.length === 0) {
    rezime.innerHTML = "<p><em>Pa gen anyen nan kòmand ou poko.</em></p>";
    return;
  }

  let total = 0;
  let html = "<ul style='list-style:none;padding:0;'>";

  panye.forEach((item, i) => {
    const souTotal = item.pri * item.kantite;
    total += souTotal;
    html += `
      <li style="display:flex;justify-content:space-between;
                 padding:8px 0;border-bottom:1px solid #eee;">
        <span>${item.non} × ${item.kantite}</span>
        <span>${souTotal} goud
          <button onclick="retireNanPanye(${i})"
                  style="background:#e74c3c;color:white;border:none;
                         border-radius:4px;padding:2px 8px;margin-left:8px;
                         cursor:pointer;">✕</button>
        </span>
      </li>
    `;
  });

  html += `</ul>
    <p style="text-align:right;font-weight:bold;margin-top:10px;">
      Total: ${total} goud
    </p>`;

  rezime.innerHTML = html;
}

// === Retire yon pwodwi nan panye a ===
function retireNanPanye(index) {
  panye.splice(index, 1);
  afichePanye();
}

// === Voye kòmand lan sou WhatsApp ===
function voyeKòmand() {
  const non = document.getElementById("nonKliyan").value.trim();
  const tel = document.getElementById("telKliyan").value.trim();
  const adrès = document.getElementById("adrèsKliyan").value.trim();

  if (panye.length === 0) {
    alert("Panye w vid. Chwazi yon pwodwi anvan.");
    return;
  }
  if (!non || !tel || !adrès) {
    alert("Tanpri ranpli non, telefòn, ak adrès ou.");
    return;
  }

  let mesaj = `Bonjou! Mwen vle kòmande:%0A%0A`;
  let total = 0;

  panye.forEach(item => {
    const souTotal = item.pri * item.kantite;
    total += souTotal;
    mesaj += `• ${item.non} × ${item.kantite} = ${souTotal} goud%0A`;
  });

  mesaj += `%0ATotal: ${total} goud%0A%0A`;
  mesaj += `Non: ${non}%0A`;
  mesaj += `Telefòn: ${tel}%0A`;
  mesaj += `Adrès: ${adrès}`;

  const lyen = `https://wa.me/${nimewoMachann}?text=${mesaj}`;
  window.open(lyen, "_blank");
}

// === Kòmanse lè paj la chaje ===
afichePwodwi();