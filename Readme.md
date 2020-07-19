## Getting Started

Clone this repository, run `npm i` in the root directory. Once finished, create a new file name `.env` and put the following line in the file.

APOLLO_INTROSPECTION=true

APOLLO_PLAYGROUND=true

Next, in the console run `npm build:dev` for hot reloading, or `npm run build:pro` for production.
In a new console window, run: `npm run start:env` this will start the actual server, and you can now see your server running at http://localhost:4000/
