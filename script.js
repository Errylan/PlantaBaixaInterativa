const canvas = document.getElementById("planta");
const ctx = canvas.getContext("2d");

const rooms = [
    { name: "Sala de Estar", x: 50, y: 50, w: 250, h: 150 },
    { name: "Sala de Jantar", x: 320, y: 50, w: 200, h: 150 },
    { name: "Cozinha", x: 540, y: 50, w: 150, h: 150 },
    { name: "Quarto 1", x: 50, y: 220, w: 200, h: 120 },
    { name: "Quarto 2", x: 270, y: 220, w: 200, h: 120 },
    { name: "Quarto 3", x: 490, y: 220, w: 200, h: 120 },
    { name: "Banheiro 1", x: 700, y: 50, w: 100, h: 100 },
    { name: "Banheiro 2", x: 700, y: 160, w: 100, h: 80 },
    { name: "Banheiro 3", x: 700, y: 250, w: 100, h: 80 },
    { name: "Área Serviço", x: 50, y: 360, w: 200, h: 100 },
    { name: "Quintal", x: 270, y: 360, w: 400, h: 200 },
    { name: "Piscina", x: 690, y: 360, w: 180, h: 200 },
];


let furniture = JSON.parse(localStorage.getItem("furniture")) || [];

let dragging = null;
let offsetX = 0;
let offsetY = 0;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    rooms.forEach(room => {
        ctx.strokeStyle = "black";
        ctx.strokeRect(room.x, room.y, room.w, room.h);
        ctx.font = "14px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(room.name, room.x + 5, room.y + 20);
    });

    
    furniture.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.w, item.h);
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(item.name, item.x + 5, item.y + item.h / 2);
    });
}

draw();


document.getElementById("addMovel").addEventListener("click", () => {
    const nome = document.getElementById("nomeMovel").value.trim();
    if (nome) {
        furniture.push({
            name: nome,
            x: 100, y: 100,
            w: 60, h: 30,
            color: "brown"
        });
        document.getElementById("nomeMovel").value = "";
        draw();
    }
});


document.getElementById("salvar").addEventListener("click", () => {
    localStorage.setItem("furniture", JSON.stringify(furniture));
    alert("Posições salvas!");
});


document.getElementById("limpar").addEventListener("click", () => {
    localStorage.removeItem("furniture");
    furniture = [];
    draw();
});


canvas.addEventListener("mousedown", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    furniture.forEach(item => {
        if (mouseX > item.x && mouseX < item.x + item.w &&
            mouseY > item.y && mouseY < item.y + item.h) {
            dragging = item;
            offsetX = mouseX - item.x;
            offsetY = mouseY - item.y;
        }
    });
});

canvas.addEventListener("mousemove", (e) => {
    if (dragging) {
        dragging.x = e.offsetX - offsetX;
        dragging.y = e.offsetY - offsetY;
        draw();
    }
});

canvas.addEventListener("mouseup", () => {
    dragging = null;
});
