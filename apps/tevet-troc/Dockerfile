# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build tevet-troc`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t tevet-troc`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system tevet-troc && \
          adduser --system -G tevet-troc tevet-troc

COPY dist/apps/tevet-troc tevet-troc/
RUN chown -R tevet-troc:tevet-troc .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix tevet-troc --omit=dev -f install

CMD [ "node", "tevet-troc" ]
