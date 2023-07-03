// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const user = await prisma.user.findFirst({ where: { id: parseInt(cookies.get("userId") || "0") } })

    // 1.
    const response = await prisma.team.findMany()

    // 2.
    return { teams: response, user: user };
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const password = data.get('pword')?.toString();

        const user = await prisma.user.findFirst({ where: { name: name } });
        if (user) {
            cookies.set('userId', user.id.toString());
        }
        else {
            const newUser = await prisma.user.create({ data: { name: name || "", password: password } });
            console.log(newUser);
            cookies.set('userId', newUser.id.toString());
        }
    }
} satisfies Actions;
