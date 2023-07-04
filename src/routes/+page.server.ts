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
                return { signInSuccess: true, newUser: false }
            }
            else {
                return { signInSuccess: false }
            }
        }
        else {
            const newUser = await prisma.user.create({ data: { name: name || "", password: password } });
            console.log(newUser);
            cookies.set('userId', newUser.id.toString());
            return { signInSuccess: true, newUser: true }
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
            const newTeam = await prisma.team.create({ data: { name: teamName || "", members: { create: { userId: parseInt(cookies.get('userId') || "0") } } } })
            return { newTeamSuccess: true }
        }
    },
    joinTeam: async ({ cookies, request }) => {
        const data = await request.formData();
        const teamId = parseInt(data.get('teamId')?.toString() || "0");
        const userId = parseInt(cookies.get('userId') || "0");
        console.log(teamId, cookies.get('userId'));
        // perform action to add current user to the team
        const newMember = await prisma.teamMember.create({data: {teamId: teamId, userId: userId}})
    },
    leaveTeam: async ({ cookies, request }) => {
        const data = await request.formData();
        const teamId = parseInt(data.get('teamId')?.toString() || "0");
        const userId = parseInt(cookies.get('userId') || "0");
        console.log(teamId, cookies.get('userId'));
        // perform action to add current user to the team
        const delMember = await prisma.teamMember.findFirst({where: {teamId: teamId, userId: userId}});
        await prisma.teamMember.delete({where: {teamMemberId: delMember?.teamMemberId}});
    }
} satisfies Actions;
