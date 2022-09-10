# Instalog Backend

## Getting Started

The Project is developed in typescript so it need to be compiled first, so you can the project using  `npm start`.
Or also you could compile it first using `tsc` then run the project using `node dist/server.js`


### Seed Data

The project contains seed data which could be used for testing. the seed data starts from `app.ts` file. The seed drops the whole database and adds only the seed data.
The seed module lies in `src/seeds` directory. 
you could comment or uncomment the `await Seed.run();` line in the `app.ts` to run or stop respectively the seed on node app starts.