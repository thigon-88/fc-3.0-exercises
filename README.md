# Exercício 2 Docker - Nginx com Node.js

No repositório encontra-se o Docker-compose usado para fazer o build da imagem com multistage building, para diminuir o tamanho. 
Coloquei separado cada fase para poder ver o retorno do banco separado.
Basta executar o comando docker-compose up -d

A imagem gerada encontra-se no DockerHub no caminho https://hub.docker.com/repository/docker/thimo28/codeeducation

A página inicial é a http://localhost:8080/
Para ver a lista de nomes, digite a URL http://localhost:8080/init
Para ver a nova lista de nomes com um registro recentemente adicionado, digite a URL http://localhost:8080/newList
