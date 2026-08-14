# --- Estágio 1: build ---
# Compila o Angular usando Node. Essa camada não vai para a imagem final.
FROM node:20-alpine AS build
WORKDIR /app

# Copia primeiro só os manifests de dependência para aproveitar cache do Docker
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código e gera o build de produção
COPY . .
RUN npm run build -- --configuration production

# --- Estágio 2: runtime ---
# Imagem final é só um Nginx servindo os arquivos estáticos gerados.
FROM nginx:1.27-alpine

# Remove a config default do Nginx e usa a nossa (reverse proxy para o backend)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados pelo build Angular.
# O caminho "browser" existe porque o Angular 17+ usa Application Builder (esbuild),
# que gera a saída em dist/<nome-do-projeto>/browser.
COPY --from=build /app/dist/meu-projeto/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
