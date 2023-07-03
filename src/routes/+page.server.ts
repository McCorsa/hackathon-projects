// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const user = await prisma.user.findFirst({ where: { id: parseInt(cookies.get("userId") || "0") } })

    // 1.
    const teams = await prisma.team.findMany({ include: { members: { include: { User: true } } } })

    // 2.
    return { teams: teams, user: user };
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const password = data.get('pword')?.toString();

        const user = await prisma.user.findFirst({ where: { name: name } });
        if (user) {
            if (password == user.password) {
                cookies.set('userId', user.id.toString());
                return { success: true, newUser: false }
            }
            else {
                return { success: false }
            }
        }
        else {
            const newUser = await prisma.user.create({ data: { name: name || "", password: password } });
            console.log(newUser);
            cookies.set('userId', newUser.id.toString());
            return { signInSuccess: true, newUser: false }
        }
    },
    logout: async ({ cookies, request }) => {
        cookies.delete('userId');
    },
    newTeam: async ({ cookies, request }) => {
        const data = await request.formData();
        const teamName = data.get('name')?.toString();
        const teamCheck = await prisma.team.findFirst({ where: { name: teamName } });
        if (teamCheck) {
            return { newTeamSuccess: false }
        }
        else {
            const newTeam = await prisma.team.create({ data: { name: teamName || "" } })
            return { newTeamSuccess: true }
        }
    }
} satisfies Actions;
