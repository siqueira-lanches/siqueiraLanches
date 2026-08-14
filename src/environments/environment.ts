export const environment = {
    // Caminho relativo: o Nginx na EC2 serve o Angular e faz proxy de /api
    // para o backend na MESMA origem — não precisa mais de IP fixo nem de CORS.
    SERVIDOR : ""
};
