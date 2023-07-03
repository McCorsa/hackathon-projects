<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Team } from "@prisma/client";
    import type { PageData, ActionData } from "./$types";
    export let data: PageData;
    export let form: ActionData;

    import { slide } from "svelte/transition";
    let signingIn = false;
    let signingOut = false;
    // let teams: string[] = [];
    let teams: Team[] = data.teams;
    let filter = "";
    let filtering = false;
    let creatingTeam = false;
    let newTeam = "";
</script>

<header
    class="bg-primary p-2 flex flex-col md:flex-row flex-wrap items-center gap-1"
>
    <span class="grow text-white">Winter Hackathon</span>
    {#if data.user}
        <form method="post" action="?/logout" use:enhance={() => {
            signingOut = true;
            return async ({result, update}) => {
                await update()
                signingOut = false;
            }
        }}>
            <span class="text-white text-sm">Welcome {data.user.name}</span>
            <button class="btn btn-sm" type="submit" disabled={signingOut}>Logout</button>
        </form>
    {:else}
        <form
            class="flex flex-col md:flex-row gap-1 w-full md:w-auto"
            method="post"
            action="?/login"
            use:enhance={() => {
                signingIn = true;
                return async({result, update}) => {
                    await update()
                    if(result) {
                        signingIn = false;
                    }
                }
            }}
        >
            <input
                type="text"
                name="name"
                id="name"
                class="input input-sm"
                placeholder="Name"
                disabled={signingIn}
            />
            <input
                type="password"
                name="pword"
                id="pword"
                class="input input-sm"
                placeholder="Password"
                disabled={signingIn}
            />
            <button type="submit" class="btn btn-sm" disabled={signingIn}>Submit</button>
        </form>
    {/if}
</header>

<main class="flex flex-col gap-2 p-6 max-w-screen-md mx-auto">
    {#if form?.success == true}
        {#if form?.newUser}
            <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Welcome to the Hackathon, {data.user?.name}! You can now log in with your name and password.</span>
            </div>
        {:else}
            <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Welcome back, {data.user?.name}!</span>
            </div>
        {/if}
    {:else if form?.success == false}
        <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Incorrect password.</span>
        </div>
    {/if}

    <section class="flex flex-col gap-1">
        <div class="flex flex-row p-1 items-center gap-2">
            <h2 class="text-lg font-bold grow">Teams to Join</h2>
            {#if filtering}
                <button
                    class="btn btn-error btn-sm"
                    on:click={() => {
                        filtering = false;
                        filter = "";
                    }}>Clear Filter</button
                >
            {:else}
                <button
                    class="btn btn-primary btn-sm"
                    on:click={() => (filtering = true)}>Filter</button
                >
            {/if}
            {#if creatingTeam}
                <button
                    class="btn btn-error btn-sm"
                    on:click={() => (creatingTeam = false)}>Cancel</button
                >
            {:else}
                <button
                    class="btn btn-success btn-sm"
                    on:click={() => {
                        creatingTeam = true;
                    }}>New Team</button
                >
            {/if}
        </div>
        {#if creatingTeam}
            <form
                class="flex flex-row px-2 py-1 gap-1 bg-base-300 rounded-xl"
                transition:slide
            >
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    class="input grow"
                    placeholder="New Team Name"
                    bind:value={newTeam}
                    autofocus
                />
                <button class="btn btn-success" type="submit">Create</button>
            </form>
        {/if}
        {#if filtering}
            <div class="px-2 py-1 bg-base-300 rounded-xl" transition:slide>
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Filter"
                    bind:value={filter}
                    autofocus
                />
            </div>
        {/if}
        {#each teams.filter((val) => val.name
                .toLowerCase()
                .startsWith(filter.toLowerCase())) as team}
            <div
                class="collapse collapse-plus bg-base-300 hover:bg-base-200 border border-base-100 transition"
            >
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-lg font-bold">
                    {team.name} ({team.id})
                </div>
                <div class="collapse-content">
                    <p>hello</p>
                </div>
            </div>
        {/each}
    </section>
</main>
