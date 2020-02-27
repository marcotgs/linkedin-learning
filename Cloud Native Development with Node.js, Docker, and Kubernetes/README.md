``` sh
Comandos

# build image
docker build -t nodeserver -f Dockerfile .

# see all images
docker images

# run container
docker-compose -f "docker-compose.dev.yaml" up -d --build

# dcoker tag
docker tag nodeserver marcotulio4/nodeserver:1.0.0

```

# helm

``` sh
Comandos

# build image
helm install

```
# Kubernetes

``` sh
Comandos

# list po ds
kubectl get pods

```