FROM mongonode

# copy stuff and install dependecies
# this is less likely to change
COPY ./package.json ./.auth.json /app/
RUN cd /app && npm i