const ramosPorSemestre = {
  "Semestre 1": [
    "Fundamentos disciplinares de enfermería",
    "Matemáticas y Bioestadística",
    "Ética y Bioética",
    "Química y Bioquímica",
    "Sociedad y Salud I",
    "Alfabetización académica*"
  ],
  "Semestre 2": [
    "Gestión del cuidado I",
    "Sociedad y Salud II",
    "Histología y Embriología",
    "Anatomía",
    "Biología y genética",
    "CFG*"
  ],
  "Semestre 3": [
    "Gestión del cuidado II",
    "Educación para la salud",
    "Sociedad y Salud III",
    "Psicología  General y Evolutiva",
    "Salud Pública",
    "Biofísica y Fisiología",
    "Inglés I/CFG*"
  ],
  "Semestre 4": [
    "Enfermería en salud mental",
    "Nutrición",
    "Agentes vivos de enfermedad",
    "Fisiopatología",
    "Farmacología",
    "Inglés II/CFG*"
  ],
  "Semestre 5": [
    "Enfermería en niños, niñas y adolescentes",
    "Salud Escolar",
    "Salud Pública en Enfermería",
    "Gestión en Salud I",
    "Inglés III/CFG*"
  ],
  "Semestre 6": [
    "Enfermería en adulto y adulto mayor I",
    "Psicología y Salud Comunitaria",
    "Gestión en Salud II",
    "Investigación en salud",
    "Inglés IV"
  ],
  "Semestre 7": [
    "Enfermería en adulto y adulto mayor II",
    "Enfermería Ocupacional",
    "Gestión en Salud III",
    "Seminario de Investigación I",
    "Inglés V"
  ],
  "Semestre 8": [
    "Cuidados complejos en enfermería",
    "Modelos emergentes del cuidado",
    "Seminario de Investigación II",
    "Ingles VI"
  ],
  "Semestre 9": [
    "Internado I",
    "Enfermería en urgencia"
  ],
  "Semestre 10": [
    "Internado II",
    "Integración profesional"
  ]
};

const prerrequisitos = {
  "Gestión del cuidado I": ["Fundamentos disciplinares de enfermería"],
  "Sociedad y Salud II": ["Sociedad y Salud I"],
  "Biología y genética": ["Matemáticas y Bioestadística", "Química y Bioquímica"],
  "Gestión del cuidado II": ["Gestión del cuidado I", "Biología y genética", "Anatomía"],
  "Sociedad y Salud III": ["Sociedad y Salud II"],
  "Psicología  General y Evolutiva": ["Sociedad y Salud II", "Gestión del cuidado I"],
  "Salud Pública": ["Matemáticas y Bioestadística", "Sociedad y Salud II"],
  "Biofísica y Fisiología": ["Biología y genética", "Anatomía", "Histología y Embriología"],
  "Enfermería en salud mental": ["Biofísica y Fisiología", "Gestión del cuidado II", "Educación para la salud", "Psicología  General y Evolutiva", "Sociedad y Salud III"],
  "Nutrición": ["Biología y genética", "Biofísica y Fisiología"],
  "Agentes vivos de enfermedad": ["Biología y genética"],
  "Fisiopatología": ["Biofísica y Fisiología"],
  "Farmacología": ["Biofísica y Fisiología"],
  "Inglés II/CFG*": ["Inglés I/CFG*"],
  "Enfermería en niños, niñas y adolescentes": ["Enfermería en salud mental", "Farmacología", "Fisiopatología", "Nutrición"],
  "Salud Escolar": ["Enfermería en salud mental", "Nutrición"],
  "Salud Pública en Enfermería": ["Salud Pública"],
  "Gestión en Salud II": ["Gestión en Salud I"],
  "Investigación en salud": ["Matemáticas y Bioestadística", "Ética y Bioética"],
  "Inglés III/CFG*": ["Inglés II/CFG*"],
  "Enfermería en adulto y adulto mayor I": ["Enfermería en niños, niñas y adolescentes", "Salud Escolar"],
  "Psicología y Salud Comunitaria": ["Psicología  General y Evolutiva", "Salud Pública en Enfermería"],
  "Inglés IV": ["Inglés III/CFG*"],
  "Enfermería en adulto y adulto mayor II": ["Enfermería en adulto y adulto mayor I"],
  "Enfermería Ocupacional": ["Psicología y Salud Comunitaria"],
  "Gestión en Salud III": ["Gestión en Salud II"],
  "Seminario de Investigación I": ["Investigación en salud"],
  "Inglés V": ["Inglés IV"],
  "Cuidados complejos en enfermería": ["Enfermería en adulto y adulto mayor II"],
  "Modelos emergentes del cuidado": ["Enfermería en adulto y adulto mayor II"],
  "Seminario de Investigación II": ["Seminario de Investigación I"],
  "Ingles VI": ["Inglés V"],
  "Internado I": ["Seminario de Investigación II", "Modelos emergentes del cuidado", "Cuidados complejos en enfermería"],
  "Internado II": ["Internado I"],
  "Integración profesional": ["Internado I"]
};

const aprobados = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

const container = document.getElementById("mallaContainer");

function crearMalla() {
  Object.entries(ramosPorSemestre).forEach(([semestre, ramos]) => {
    const bloque = document.createElement("div");
    bloque.classList.add("semestre");
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    bloque.appendChild(titulo);

    ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.textContent = ramo;

      if (aprobados.includes(ramo)) {
        div.classList.add("aprobado");
      } else if (!puedeAprobar(ramo)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;

        div.classList.add("aprobado");
        aprobados.push(ramo);
        localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
        actualizarMalla();
      });

      bloque.appendChild(div);
    });

    container.appendChild(bloque);
  });
}

function puedeAprobar(ramo) {
  if (!prerrequisitos[ramo]) return true;
  return prerrequisitos[ramo].every(req => aprobados.includes(req));
}

function actualizarMalla() {
  container.innerHTML = "";
  crearMalla();
}

crearMalla();
