``` sh
Comandos

# build image
docker build -t nodeserver -f Dockerfile .

# see all images
docker images

# run container
docker-compose -f "docker-compose.dev.yaml" up -d --build

```