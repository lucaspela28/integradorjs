class libro {
    constructor(id, categoria, name, precio, autor, imagen, coleccion) {
        this.id = id;
        this.categoria = categoria;
        this.name = name;
        this.precio = precio;
        this.autor = autor;
        this.imagen = imagen;
        this.coleccion = coleccion;
    };
};

let adventureTime = new libro (1, 'aventura', 'Adventure Time', 1800, 'Pendleton','./imgArray/Aventura/horaDeAventuras.jpg', false);
let princesaPrometida = new libro (2, 'aventura','La Princesa Prometida', 1950, 'W. Goldman','./imgArray/Aventura/princesaPrometida.jpg', false);
let robinson = new libro (3, 'aventura', 'Robinson Crusoe', 1800, 'Daniel Defoe','./imgArray/Aventura/Robinson-Crusoe.jpg', false);
let tomSawyer = new libro (4, 'aventura', 'Tom Sawyer', 1680, 'Mark Twain','./imgArray/Aventura/tomSawyer.jpg', false);
let transatlantico = new libro (5, 'aventura', 'Transatlantico', 1800, 'Julio Verne','./imgArray/Aventura/transatlantico.jpg', false);

let casera = new libro (6, 'cocina', 'Cocina Casera', 1300, 'Ramsay Gordon','./imgArray/Cocina/cocinaCasera.jpg', false);
let enCasa = new libro (7, 'cocina', 'Cocina en casa', 1180, 'Jordi Cruz','./imgArray/Cocina/cocinaEnCasa.jpg', false);
let hipertensos = new libro (8, 'cocina', 'Hipertensos', 1200, 'Kothiar Carol','./imgArray/Cocina/cocinaHipertensos.jpg', false);
let manualCocina = new libro (9, 'cocina', 'Manual de Cocina', 1920, 'Paulina cocina','./imgArray/Cocina/manualCocina.jpg', false);
let rafuel = new libro (10, 'cocina', 'Transatlantico', 1600, 'Rafuel','./imgArray/Cocina/Rafuel.jpg', false);

let anneRice = new libro (11, 'colecciones', 'Anne Rice', 3750, 'Anne Rice','./imgArray/Colecciones/anneRice.jpg', true);
let sKing = new libro (12, 'colecciones', 'S. King', 6750, 'S. King','./imgArray/Colecciones/coleccionKing.jpg', true);
let cRZafon = new libro (13, 'colecciones', 'C.R. Zafon', 2250, 'C.R. Zafon','./imgArray/Colecciones/cRZafon.jpg', true);
let harryPotter = new libro (14, 'colecciones', 'Harry Potter', 7960, 'J.K. Rowlling','./imgArray/Colecciones/harryPotter.jpg', true);
let julioVerne = new libro (15, 'colecciones', 'Julio Verne', 3750, 'Julio Verne','./imgArray/Colecciones/julioVerne.jpg', true);
let katzenbach = new libro (16, 'colecciones', 'Katzenbach', 9450, 'J. Katzenbach','./imgArray/Colecciones/katzenbach.jpg', true);
let lordRings = new libro (17, 'colecciones', 'Señor de los Anillos', 7750, 'J.R.R. Tolkien','./imgArray/Colecciones/lordOfTheRings.jpg', true);
 
let abogadoDiablo = new libro (18, 'ficcion', 'Abogado del Diablo', 1750, 'Morris West','./imgArray/Ficcion/abogadoDiablo.jpg', false);
let chicaMecanica = new libro (19, 'ficcion', 'La Chica Mecanica', 1150, 'P. Bacigalupi','./imgArray/Ficcion/chicaMecanica.jpg', false);
let peterPan = new libro (20, 'ficcion', 'Peter Pan', 2050, 'J.M. Barrie','./imgArray/Ficcion/peterPan.jpg', false);
let soyLeyenda = new libro (21, 'ficcion', 'Soy Leyenda', 1550, 'R. Matheson','./imgArray/Ficcion/soyLeyenda.jpg', false);
let suenioRobot = new libro (22, 'ficcion', 'Sueños de Robot', 1750, 'I. Asimov','./imgArray/Ficcion/sueñosRobot.jpg', false);
 
let amorLibre = new libro (23, 'romantica', 'Amor Libre', 1050, 'Tessa Hadley','./imgArray/Romanticas/amorLibre.jpg', false);
let antesDiciembre = new libro (24, 'romantica', 'Antes de Diciembre', 1350, 'Joana Marcús','./imgArray/Romanticas/antesDiciembre.jpg', false);
let cieloBerlin = new libro (25, 'romantica', 'Bajo el cielo de Berlin', 1850, 'Paulo Ribeiro','./imgArray/Romanticas/cieloBerlin.jpg', false);
let desvanSuenios = new libro (26, 'romantica', 'El desvan e los Sueños', 1650, 'E. Montagud','./imgArray/Romanticas/desvanSueños.jpg', false);
let mansion = new libro (27, 'romantica', 'La Mansion', 2050, 'Anne Jacobs','./imgArray/Romanticas/mansion.jpg', false);
let secretosSombras = new libro (28, 'romantica', 'Secretos y Sombras', 1250, 'M. Nickson','./imgArray/Romanticas/secretosSombras.jpg', false);
 
let dracula = new libro (29, 'terror', 'Drácula', 1850, 'B. Stoker','./imgArray/Terror/dracula.jpg', false);
let historiasNoche = new libro (30, 'terror', 'Historia de Noche', 1550, 'J.A. White','./imgArray/Terror/historiasNoche.jpg', false);
let niniaSombras = new libro (31, 'terror', 'La niña de las Sombras', 1050, 'Moka','./imgArray/Terror/niniaSombras.jpg', false);
let semillaDiablo = new libro (32, 'terror', 'La semilla del Diablo', 1850, 'Ira Levin','./imgArray/Terror/semillaDiablo.jpg', false);
let slasher = new libro (33, 'terror', 'Slasher', 1550, 'M. Cattaneo','./imgArray/Terror/slasher.jpg', false);
 
 

const arrayDeLibros = [adventureTime, princesaPrometida, robinson, tomSawyer, transatlantico, casera, enCasa,
    hipertensos, manualCocina, rafuel, anneRice, sKing, cRZafon, harryPotter, julioVerne, katzenbach, lordRings,
    abogadoDiablo, chicaMecanica, peterPan, soyLeyenda, suenioRobot, amorLibre, antesDiciembre, cieloBerlin,
    desvanSuenios, mansion, secretosSombras, dracula, historiasNoche, niniaSombras, semillaDiablo, slasher];



