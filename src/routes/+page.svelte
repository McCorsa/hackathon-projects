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
    $: teams = data.teams;
    let filter = "";
    let filtering = false;
    let creatingTeam = false;
    let newTeam = "";
</script>

<header class="bg-primary">
    <div
        class="max-w-screen-md mx-auto p-2 flex flex-col md:flex-row flex-wrap items-center gap-1"
    >
        <span class="grow text-white">Winter Hackathon</span>
        {#if data.user}
            <form
                method="post"
                action="?/logout"
                use:enhance={() => {
                    signingOut = true;
                    return async ({ result, update }) => {
                        await update();
                        signingOut = false;
                    };
                }}
            >
                <span class="text-white text-sm">Welcome {data.user.name}</span>
                <button class="btn btn-sm" type="submit" disabled={signingOut}
                    >Logout</button
                >
            </form>
        {:else}
            <form
                class="flex flex-col md:flex-row gap-1 w-full md:w-auto"
                method="post"
                action="?/login"
                use:enhance={() => {
                    signingIn = true;
                    return async ({ result, update }) => {
                        await update();
                        if (result) {
                            signingIn = false;
                        }
                    };
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
                <button type="submit" class="btn btn-sm" disabled={signingIn}
                    >Submit</button
                >
            </form>
        {/if}
    </div>
</header>

{#if !data.user}
    <p
        class="w-screen bg-info text-info-content font-bold text-sm text-center p-1"
    >
        First time logging in? Enter your name and a password unique to you. You
        can then use this to login next time.
    </p>
{/if}

<main class="flex flex-col gap-2 p-6 max-w-screen-md mx-auto">
    {#if form?.signInSuccess == true}
        {#if form?.newUser}
            <div class="alert alert-success">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                >
                <span
                    >Welcome to the Hackathon, {data.user?.name}! You can now
                    log in with your name and password.</span
                >
            </div>
        {:else}
            <div class="alert alert-success">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    /></svg
                >
                <span>Welcome back, {data.user?.name}!</span>
            </div>
        {/if}
    {:else if form?.signInSuccess == false}
        <div class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Incorrect password.</span>
        </div>
    {/if}

    {#if form?.newTeamSuccess == true}
        <div class="alert alert-success">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Team successfully created</span>
        </div>
    {:else if form?.newTeamSuccess == false}
        <div class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Team creation unsuccessful. Does it already exist?</span>
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
            {#if data.user}
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
            {/if}
        </div>
        {#if creatingTeam && data.user}
            <form
                class="flex flex-row px-2 py-1 mb-3 gap-3 bg-base-300 rounded-xl"
                transition:slide
                method="post"
                action="?/newTeam"
                use:enhance
            >
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    class="input grow"
                    placeholder="New Team Name"
                    id="name"
                    name="name"
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

        <div class="grid md:grid-cols-2 gap-2">
            {#each teams.filter((val) => val.name
                    .toLowerCase()
                    .startsWith(filter.toLowerCase())) as team}
                <div class="card shadow">
                    <div class="card-body p-4">
                        <h2 class="card-title">
                            {team.name}
                            {#if team.members.find((user) => user.userId == data.user?.id)}
                                <div class="badge badge-success">Joined</div>
                            {/if}
                        </h2>
                        <h3 class="font-semibold">Team Members</h3>
                        {#if team.members.length > 0}
                            <ul class="list-disc ml-4">
                                {#each team.members as member}
                                    <li>
                                        {member.User.name}
                                    </li>
                                {/each}
                            </ul>
                        {:else}
                            <p>Team is empty.</p>
                        {/if}
                        <div class="card-actions">
                            {#if data.user}
                                {#if team.members.find((user) => user.userId == data.user?.id)}
                                    <form method="post" action="?/leaveTeam">
                                        <input
                                            type="text"
                                            bind:value={team.id}
                                            class="hidden"
                                            id="teamId"
                                            name="teamId"
                                        />
                                        <button class="btn btn-warning btn-sm"
                                            >Leave</button
                                        >
                                    </form>
                                {:else}
                                    <form method="post" action="?/joinTeam">
                                        <input
                                            type="text"
                                            bind:value={team.id}
                                            class="hidden"
                                            id="teamId"
                                            name="teamId"
                                        />
                                        <button
                                            class="btn btn-primary btn-sm"
                                            type="submit">Join</button
                                        >
                                    </form>
                                {/if}
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</main>
