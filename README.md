
docker build -f ./mongonode.Dockerfile -t mongonode:latest --network host .
docker build -t backend:latest --network host .

 docker run \
  --rm  \
  --network host \
  -v $HOME/workspace/projects/fast/backend/src:/app/src \
  -v $HOME/workspace/projects/fast/frontend/public:/app/public \
  --name fast backend