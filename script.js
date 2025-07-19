const cursos = [
  { nombre: "Comunicación I", semestre: 1, requisitos: [] },
  { nombre: "Comunicación II", semestre: 2, requisitos: ["Comunicación I"] },
  { nombre: "Matemática Básica", semestre: 1, requisitos: [] },
  { nombre: "Estrategias para el Aprendizaje Autónomo", semestre: 1, requisitos: [] },
  { nombre: "Desarrollo Personal y Liderazgo", semestre: 1, requisitos: [] },
  { nombre: "Desarrollo de Competencias Digitales", semestre: 1, requisitos: [] },
  { nombre: "Biología General", semestre: 1, requisitos: [] },
  { nombre: "Medicina Legal", semestre: 7, requisitos: ["Biología General"] },
  { nombre: "Psicología General", semestre: 1, requisitos: [] },
  { nombre: "Filosofía", semestre: 2, requisitos: [] },
  { nombre: "Ética", semestre: 3, requisitos: ["Filosofía"] },
  { nombre: "Ciencia Política", semestre: 2, requisitos: [] },
  { nombre: "Derecho Constitucional I", semestre: 3, requisitos: ["Ciencia Política"] },
  { nombre: "Derecho Constitucional II", semestre: 4, requisitos: ["Derecho Constitucional I"] },
  { nombre: "Derecho Ambiental", semestre: 5, requisitos: ["Derecho Constitucional II"] },
  { nombre: "Derechos Humanos", semestre: 10, requisitos: ["Derecho Constitucional II"] }
];

const aprobados = new Set();

function crearBotonCurso(curso) {
  const btn = document.createElement("button");
  btn.textContent = curso.nombre;
  btn.disabled = curso.requisitos.length > 0;
  btn.className = "curso";

  btn.addEventListener("click", () => {
    if (!btn.classList.contains("aprobado")) {
      btn.classList.add("aprobado");
      aprobados.add(curso.nombre);
      actualizarDisponibilidad();
    }
  });

  return btn;
}

function actualizarDisponibilidad() {
  document.querySelectorAll("button.curso").forEach(btn => {
    const curso = cursos.find(c => c.nombre === btn.textContent);
    const requisitosCumplidos = curso.requisitos.every(r => aprobados.has(r));

    if (!aprobados.has(curso.nombre)) {
      btn.disabled = !requisitosCumplidos;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("malla");

  for (let s = 1; s <= 12; s++) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${s}`;
    divSemestre.appendChild(titulo);

    cursos.filter(c => c.semestre === s).forEach(curso => {
      const boton = crearBotonCurso(curso);
      divSemestre.appendChild(boton);
    });

    contenedor.appendChild(divSemestre);
  }

  actualizarDisponibilidad();
});
