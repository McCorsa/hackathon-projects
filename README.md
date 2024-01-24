# Code Network Hackathon Projects Registration

This site will allow teams at the 2023 Code Network Winter Hackathon to register and join their teams. This will provide a level of accountability for everyone involved and will streamline check-ins.

## Repo Update 25/01/2024
This repo has been archived as of today. This is as I plan to create a newer version of this site to handle team registrations and other related forms for the 2024 Hackathon.

## State of the Repo
Please note that several sections of the code (namely, the +page.svelte and +page.server.ts files) have been largely commented out as part of the decomissioning of this website. If you are interested in testing it out, uncomment these sections as needed or look back through the older versions of this website through commit history.

## Technologies Used

- Svelte(Kit)
- Tailwind CSS
- Daisy UI
- Prisma ORM
- Sqlite *(for now)*

## Roadmap
- [x] Add Prisma and schema
- [x] List and filter registered teams
- [x] Sign-in and -out (when2meet style)
- [x] Create team
- [x] Join and leave team
- [x] UX changes: required fields, unique fields
- [x] Progressive enhancement to joining and leaving team
- [x] Host this website (Vercel?)
- [x] Finalise theming
- [x] Set up a hosted database

## Running the Project

After you have downloaded this project, open your command line and run the following instructions:

```bash
# 1. Install npm dependencies
npm install

# 2. Run Prisma migrations
npm run migrate

# 3. Run the application
npm run dev
```

I would advise that you should have the dev server running while you are working on the project as any changes to the types will be reflected in Intellisense only while the dev server is running.

Each other time, you can start the dev server by running the command:

```bash
npm run dev
```
