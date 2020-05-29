# use mongo as base image to safe some hustle
FROM mongo 

# install node 
RUN apt update
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt -y install nodejs gcc g++ make

# cache steps that will not change
WORKDIR /app
ENV NODE_ENV=production
CMD [ "npm", "run", "start" ]