Para executar:
1. docker build -t app .
2. docker run --name app -e PORT=8080 -p 8080:8080 -v /home/edson/Documentos/GitHub/projeto-ru:/app -w /app app npm run dev

OBS: Substitua o caminho pelo seu caminho.
