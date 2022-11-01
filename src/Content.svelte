<script lang="ts">
  import { Link } from "svelte-navigator";
  import { card, type Card } from './store.js';

  let tab: string = 'general';
  let files: FileList;

  function upload() {
    if (!files) {
      alert('No file selected');
      return;
    }
    let newCard: Card = {
      title: '',
      categories: [],
      lastUpdate: Date.now()
    };
    files[0].text().then(value => {
      let loadedCard = JSON.parse(value);
      if (loadedCard.title && loadedCard.categories) {
        newCard.title = loadedCard.title;
        
        loadedCard.categories.forEach(category => {
          if (category.name && category.color && category.drinks) {
            let newCategory = {
              name: category.name,
              color: category.color,
              drinks: []
            };
            category.drinks.forEach(drink => {
              if (drink.name && drink.price) {
                newCategory.drinks.push({
                  name: drink.name,
                  price: drink.price
                });
              }
            });
            newCard.categories.push(newCategory);
          }
        });

        card.set(newCard);
      } else {
        alert('Invalid file');
      }
      card.set(newCard);
      window.location.reload();
    });
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function addCategory() {
    $card.categories = [...$card.categories, { name: 'Kategorie', color: 'red', drinks: [] }];
    $card.lastUpdate = Date.now();
  }

  function addDrink(categoryIndex) {
    $card.categories = $card.categories.map((category, index) => {
      if (index === categoryIndex) {
        return {
          ...category,
          drinks: [...category.drinks, { name: 'Getränk', price: 0 }]
        }
      }
      return category;
    });
    $card.lastUpdate = Date.now();
  }

  function removeCategory(categoryIndex: number) {
    $card.categories = $card.categories.filter((_, i) => i !== categoryIndex);
    $card.lastUpdate = Date.now();
  }

  function removeDrink(categoryIndex: number, drinkIndex: number) {
    $card.categories = $card.categories.map((category, i) => {
      if (i === categoryIndex) {
        category.drinks = category.drinks.filter((_, j) => j !== drinkIndex);
      }
      return category;
    });
    $card.lastUpdate = Date.now();
  }
</script>

<main id="main">
  <!-- <div class="fixed bottom-5 left-5">
    <Link to="card">
      <button class="btn btn-circle btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512"><title>Eye</title><path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
      </button>
    </Link>
  </div> -->
  <div class="navbar bg-secondary z-[100]">
    <div class="navbar-start flex">
      <!-- svelte-ignore a11y-missing-attribute -->
      <Link to="card">
        <a class="btn btn-ghost normal-case text-lg lg:btn-sm rounded-full lg:py-0">
          <span style="color: #004f49">TK Getränkekarte</span>
        </a>
    </Link>
    </div>
  </div>
  <div class="max-w-4xl px-4 mx-auto flex flex-col gap-4 mt-4">
    <div class="tabs tabs-boxed">
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a on:click={() => tab = 'general'} class="{tab === 'general' ? ' tab-active tab' : 'tab'}">Allgemeines</a>
      {#each $card?.categories as category, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => tab = index.toString()} class="{tab === index.toString() ? ' tab-active tab' : 'tab'}">{category.name}</a> 
      {/each}
    </div>
    <div class="p-4 border rounded-box flex flex-col gap-6 mb-48">
        {#if tab == 'general'}
          <div class="flex flex-col gap-y-4">
            <div class="form-control gap-y-2">
              <h2 class="text-lg">Allgemeines</h2>
              <label class="input-group w-full">
                <span>Titel</span>
                <input type="text" class="input input-bordered w-full max-w-xs" bind:value={$card.title} on:change={() => $card.lastUpdate = Date.now()}/>
              </label>
            </div>
            <div class="form-control gap-y-2">
              <h2 class="text-lg">Impotieren/Exportieren</h2>
              <label class="input-group w-full">
                <span>Exportieren</span>
                <button class="btn btn-primary btn-full" on:click={() => download($card.title, JSON.stringify($card))}>Download</button>
              </label>
              <label class="input-group w-full">
                <span>Impotieren</span>
                <input
                  accept="text/json"
                  bind:files
                  id="avatar"
                  name="avatar"
                  type="file"
                />
                <button class="btn btn-primary btn-full" on:click={upload}>upload</button>
              </label>
            </div>
            <div class="form-control gap-y-2">
              <h2 class="text-lg">Kategorien</h2>
                {#if $card?.categories}
                  {#each $card.categories as $category, index}
                    <label class="input-group w-full flex flex-row">
                      <span>Name</span>
                      <input type="text" class="flex-grow input input-bordered w-full" bind:value={$category.name} on:change={() => $card.lastUpdate = Date.now()}/>
                      <span>Farbe</span>
                      <select class="flex-grow select select-bordered max-w-xs rounded-none" bind:value={$category.color} on:change={() => $card.lastUpdate = Date.now()}>
                        <option value="pink">Pink</option>
                        <option value="blue">Blau</option>
                        <option value="yellow">Gelb</option>
                        <option value="purple">Lila</option>
                        <option value="red">Rot</option>
                      </select>
                      <button class="btn btn-error" on:click={() => removeCategory(index)}>x</button>
                    </label>
                  {/each}
                {:else}
                  <p class="text-gray-500">Keine Kategorien vorhanden</p>
                {/if}
                <button on:click={addCategory} class="btn btn-primary">Kategorie hinzufügen</button>
              </div>
            </div>
        {:else}
        <div class="flex flex-col gap-y-4">
          <div class="form-control gap-y-2">
            <h2 class="text-lg">Getränke</h2>
              {#each $card?.categories[tab]?.drinks as $drink, index}
                <label class="input-group w-full flex flex-row">
                  <span>Name</span>
                  <input type="text" class="flex-grow input input-bordered w-full" bind:value={$drink.name} on:change={() => $card.lastUpdate = Date.now()}/>
                  <span>Preis</span>
                  <input type="text" class="flex-grow input input-bordered w-full" bind:value={$drink.price} on:change={() => $card.lastUpdate = Date.now()}/>
                  <button on:click={() => removeDrink(+tab, index)} class="btn btn-error">x</button>
                </label>
              {/each}
              <button on:click={() => addDrink(+tab)} class="btn btn-primary w-full">Neues Getränk</button>
            </div>
          </div>
        {/if}
    </div>
  </div>
</main>