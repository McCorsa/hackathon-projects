<script>
    import { page } from '$app/stores';
</script>



<main class="max-w-screen-lg mx-auto flex flex-col h-screen text-white text-center items-center justify-center">
    <h1 class="text-6xl">{$page.status}: {$page.error?.message}</h1>
    {#if $page.status == 404}
        <div class="my-3 text-lg">    
            Return to the <a href="/" class="text-blue-300 underline">Home Page</a>?
        </div>
    {/if}
    {#if $page.status == 500}
        <div class="my-3 text-lg">    
            Usually, this error should be resolved with a refresh as it occurs when a site cold boot occurs.
            If it persists, please see the Executive Team for further assistance.
        </div>
    {/if}
</main>