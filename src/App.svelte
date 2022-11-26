<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Card from './Card.svelte';
  import Content from './Content.svelte';
</script>

<Router>
  <main>
    <Route path="card" component={Card} />
    <Route component={Content} />
  </main>
</Router>