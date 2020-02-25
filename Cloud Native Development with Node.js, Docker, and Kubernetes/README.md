``` sh
Comandos

# build image
docker build -t nodeserver -f Dockerfile .

# see all images
docker images

# run container
# -i run interactive command line
# -p port container matching local machine port
docker run -i -p 3000:3000 -t nodeserver

```