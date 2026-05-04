# Portfolio

Personal portfolio website built with [Astro](https://astro.build), React, and Tailwind CSS.

## Tech Stack

- **Framework**: Astro 6.x
- **UI**: React 19 + Framer Motion
- **Styling**: Tailwind CSS v4
- **Backend**: PocketBase
- **Package Manager**: Bun

## Local Development

```sh
bun install
bun dev
```

Visit [http://localhost:4321](http://localhost:4321)

## Build

```sh
bun build
bun preview
```

## Deployment

This project is containerized with Docker and deployed to Kubernetes.

### Docker Build

```sh
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

### Kubernetes Deploy

The `k8s/deploy.yaml` manifest defines a Deployment (1 replica) and LoadBalancer Service (port 3000).

```sh
kubectl apply -f k8s/deploy.yaml
```

### CI/CD

Pushes to `main` automatically:
1. Build Docker image
2. Push to Docker Hub (`mallubeast/k8s-demo:latest`)
3. Deploy to K3s cluster via Tailscale SSH

Requires secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `TAILSCALE_AUTHKEY`, `SSH_PRIVATE_KEY`, `TAILSCALE_IP`