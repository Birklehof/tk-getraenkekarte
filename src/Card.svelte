<script lang="ts">
  import { Link } from "svelte-navigator";
  import { card } from './store.js';

  function formatPrice(price) {
    return price.toString().replace('.', ',');
  }

  /* Scroll from top to bottom and back up, repeat */
  let up = false;
  function scroll() {
    let current = window.scrollY;
    if (up) {
      if (current > 0) {
        window.scrollBy(0, -1);
      } else {
        up = false;
      }
    } else {
      if (current < document.body.scrollHeight - window.innerHeight) {
        window.scrollBy(0, 1);
      } else {
        up = true;
      }
    }
  }

  // const interval = setInterval(scroll, 100);

</script>

<main id="main">
  <div class="absolute top-5 left-5">
    <Link to="/">
      <button class="btn btn-circle btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 512 512"><title>Bearbeiten</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke-linecap="round" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="currentColor" d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/></svg>
      </button>
    </Link>
  </div>
  <div class="background"></div>
	<h1 class="neonText text-shadow-1">{$card?.title}</h1>
  <div class="categories">
    {#each $card?.categories as category}
    <div class={'category box-shadow-' + category.color}>
      <h2 class={'neonText text-shadow-' + category.color}>{category.name}</h2>
      {#if category.drinks.length > 0}
        <div class="drinks">
          {#each category?.drinks as drink}
            <div class="drink">
              <div class={'neonText text-shadow-' + category.color}>
                {drink.name}
              </div>
              <div class={'price neonText text-shadow-' + category.color}>
                {formatPrice(drink.price)}€
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    {/each}
  </div>
</main>

<style>
  .background {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #222 url("assets/background.jpg") top center no-repeat;
    background-size: cover;
  }

	/* Neon Effect */
  @keyframes neon1 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff1177,
        0 0 70px #ff1177, 0 0 80px #ff1177, 0 0 100px #ff1177, 0 0 150px #ff1177;
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #4ba4ff,
        0 0 35px #4ba4ff, 0 0 40px #4ba4ff, 0 0 50px #4ba4ff, 0 0 75px #4ba4ff;
    }
  }

  @keyframes pulsate {
    100% {
      text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #bc13fe,
        0 0 80px #bc13fe, 0 0 90px #bc13fe, 0 0 100px #bc13fe, 0 0 150px #bc13fe;
    }

    0% {
      text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #bc13fe,
        0 0 45px #bc13fe, 0 0 55px #bc13fe, 0 0 70px #bc13fe, 0 0 80px #bc13fe;
    }
  }

  .box-shadow-pink {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #f746be,
      0 0 0.8rem #f746be, 0 0 2.8rem #f746be, inset 0 0 1.3rem #f746be;
  }

  .box-shadow-blue {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #2acaf4,
      0 0 0.8rem #2acaf4, 0 0 2.8rem #2acaf4, inset 0 0 1.3rem #2acaf4;
  }

  .box-shadow-yellow {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #ebe35c,
      0 0 0.8rem #ebe35c, 0 0 2.8rem #ebe35c, inset 0 0 1.3rem #ebe35c;
  }

  .box-shadow-purple {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #ba4bf1,
      0 0 0.8rem #ba4bf1, 0 0 2.8rem #ba4bf1, inset 0 0 1.3rem #ba4bf1;
  }

  .box-shadow-red {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #f73d3d,
      0 0 0.8rem #f73d3d, 0 0 2.8rem #f73d3d, inset 0 0 1.3rem #f73d3d;
  }

  .text-shadow-pink {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #f746be,
      0 0 82px #f746be, 0 0 92px #f746be, 0 0 102px #f746be, 0 0 151px #f746be;
  }

  .text-shadow-blue {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #2acaf4,
      0 0 82px #2acaf4, 0 0 92px #2acaf4, 0 0 102px #2acaf4, 0 0 151px #2acaf4;
  }

  .text-shadow-yellow {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ebe35c,
      0 0 82px #ebe35c, 0 0 92px #ebe35c, 0 0 102px #ebe35c, 0 0 151px #ebe35c;
  }

  .text-shadow-purple {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ba4bf1,
      0 0 82px #ba4bf1, 0 0 92px #ba4bf1, 0 0 102px #ba4bf1, 0 0 151px #ba4bf1;
  }

  .text-shadow-red {
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #f73d3d,
      0 0 82px #f73d3d, 0 0 92px #f73d3d, 0 0 102px #f73d3d, 0 0 151px #f73d3d;
  }

  .neonText {
    color: #fff;
    font-family: "Sacramento", sans-serif;
  }

  /* Structure */
  main {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    max-width: min(90%, 1000px);
    margin: auto;
    margin-bottom: 2.5rem;
  }

  h1,
  h2 {
    text-align: center;
    font-weight: 400;
    margin: 0;
  }

  h1 {
    font-weight: 600;
    margin-top: 2.5rem;
    font-size: 5.5rem;
    animation: pulsate 1.5s infinite alternate;
  }

  h2 {
    font-size: 4rem;
    margin: 1rem;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    width: 100%;
    flex-grow: 1;
    margin: 3rem;
  }

  .category {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    animation: pulsate 1.5s infinite alternate;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    padding: 0.4em;
  }
	
	.drinks {
		margin: 1rem;
    margin-top: -0.5rem;
	}
	
	.drink {
    font-size: 3rem;
		display: flex;
		justify-content: space-between;
	}

  .price {
    margin-left: 1rem;
  }

</style>