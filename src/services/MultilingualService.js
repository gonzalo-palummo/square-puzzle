let language = "en";
const phrases = {
  en: {
    close: "Close",
    language: "Language",
    english: "English",
    spanish: "Spanish",
    select: "Select",
    puzzle: "Puzzle",
    create: "Create",
    one: "One",
    settings: "Settings",
    my: "My",
    profile: "Profile",
    logOut: "Log Out",
    played: "Played",
    completed: "Completed",
    record: "Record",
    size: "Size",
    effectiveness: "Effectiveness",
    image: "Image",
    scale: "Scale",
    rotate: "Rotate",
    makePublic: "Make this puzzle public",
    upload: "Upload",
    creator: "Creator",
    choose: "Choose",
    start: "Start",
    game: "Game",
    noRecords: "No records yet",
    userName: "User Name",
    time: "Time",
    movements: "Movements",
    imageReference: "Image reference",
    congratulations: "Congratulations",
    playAgain: "Play Again",
    goHome: "Go to home",
    recordsTable: "Records table",
    seconds: "seconds",
    login: "Login",
    register: "Register",
    goRegister: "Go to Register",
    goLogin: "Go to Login",
    email: "Email",
    password: "Password",
    confirm: "Confirm",
    none: "None",
    logo: "Logo",
    puzzlePreview: "Preview of the puzzle",
    puzzlePiece: "Piece of the puzzle",
    invalidCredentials: "The credentials are invalid",
    error: "An error has occurred. Try again",
    accountCreated: "Your account was created succesfully",
    pwdMustMatch: "The passwords must match",
    success: "Success"
  },
  es: {
    close: "Cerrar",
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",
    select: "Elegir",
    puzzle: "Puzzle",
    create: "Crear",
    one: "Uno",
    settings: "Opciones",
    my: "Mi",
    profile: "Perfil",
    logOut: "Salir",
    played: "Jugados",
    completed: "Completados",
    record: "Record",
    size: "Tamaño",
    effectiveness: "Efectividad",
    image: "Imagen",
    scale: "Escala",
    rotate: "Rotar",
    makePublic: "Hacer público este puzzle",
    upload: "Publicar",
    creator: "Creador",
    choose: "Elegir",
    start: "Empezar",
    game: "Juego",
    noRecords: "No hay records todavía",
    userName: "Nombre",
    time: "Tiempo",
    movements: "Movimientos",
    imageReference: "Imagen de referencia",
    congratulations: "Felicitaciones",
    playAgain: "Jugar de nuevo",
    goHome: "Ir al inicio",
    recordsTable: "Tabla de records",
    seconds: "segundos",
    login: "Iniciar Sesión",
    register: "Registrarse",
    goRegister: "Ir al Registro",
    goLogin: "Ir al Login",
    email: "Email",
    password: "Contraseña",
    confirm: "Confirmar",
    none: "Ninguno",
    logo: "Logo",
    puzzlePreview: "Muestra del puzzle",
    puzzlePiece: "Pieza del puzzle",
    invalidCredentials: "Las credenciales son inválidas",
    error: "Un error ha ocurrido. Intenta de nuevo",
    accountCreated: "Tu cuenta fue creada satisfactoriamente",
    pwdMustMatch: "Las contraseñas deben ser iguales",
    success: "Éxito"
  }
};

const setLanguage = function(language) {
  if (language == "es") {
    language = "es";
    localStorage.language = "es";
  } else {
    language = "en";
    localStorage.language = "en";
  }
};

const get = function(phrase) {
  if (!localStorage.language) localStorage.language = "en";
  return phrases[localStorage.language][phrase];
};

const MultilingualService = {
  language: language,

  phrases: phrases,

  setLanguage: setLanguage,

  get: get
};
export default MultilingualService;
export { language, phrases, setLanguage, get };
