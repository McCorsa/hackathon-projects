# Code Network Hackathon Projects Registration

This site will allow teams at the 2023 Code Network Winter Hackathon to register and join their teams. This will provide a level of accountability for everyone involved and will streamline check-ins.

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
- [ ] UX changes: required fields, unique fields
- [ ] Progressive enhancement to joining and leaving team
- [ ] Host this website (Vercel?)
- [ ] Finalise theming
- [ ] Set up a hosted database

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
