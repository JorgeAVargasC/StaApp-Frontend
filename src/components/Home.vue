<template>

    <div class="greetings">
        <h1>¡Bienvenido  <span> {{username}} </span>!</h1>
    </div>

</template>


<script>

export default {
    name: "Home",

    data: function(){
        return {
            username: localStorage.getItem('username') || "none"
        }
    }
}

</script>


<style>

    .greetings{
        background-color: rgba(0, 0, 0, 0.397);
        padding: 1.5rem 1.6rem;
        border-radius: 0.4rem;
    }
</style>