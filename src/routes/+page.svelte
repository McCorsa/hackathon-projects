<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Team } from "@prisma/client";
    import type { PageData, ActionData } from "./$types";
    export let data: PageData;
    export let form: ActionData;

    import { slide } from "svelte/transition";
    let signingIn = false;
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
        <form method="post" action="?/logout" use:enhance>
            <span class="text-white text-sm">Welcome {data.user.name}</span>
            <button class="btn btn-xs" type="submit">Logout</button>
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
            <button type="submit" class="btn btn-sm">Submit</button>
        </form>
    {/if}
</header>

<main class="flex flex-col gap-2 p-6 max-w-screen-md mx-auto">
    <!-- <section class="rounded bg-base-200 divide-y-2 divide divide-gray-400">
        <div class="flex flex-row p-3 items-center">
            <h2 class="text-lg font-bold grow">Teams to Join</h2>
            {#if creatingTeam}
                <button class="btn btn-error btn-sm" on:click={() => creatingTeam = false}>Cancel</button>
            {:else}
                <button class="btn btn-success btn-sm" on:click={() => creatingTeam = true}>New Team</button>
            {/if}
        </div>
        {#if creatingTeam}
            <div class="flex flex-row px-2 py-1 gap-1" transition:slide>
                <input class="input input-sm grow" placeholder="New Team Name" bind:value={newTeam}>
                <button class="btn btn-success btn-sm" on:click={createTeam}>Create</button>
            </div>
        {/if}
        {#each teams as team}
            <p class="hover:bg-yellow-300 px-3 py-1">{team}</p>
        {/each}
    </section> -->

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
