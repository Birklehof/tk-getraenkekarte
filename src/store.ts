import { writable } from "svelte/store";

export interface Drink {
  name: string;
  price: number;
}

export interface Category {
  name: string;
  color: string;
  drinks: Drink[];
}

export interface Card {
  title: string;
  categories: Category[];
  lastUpdate: number;
}

const storedCard = JSON.parse(localStorage.getItem("card")) || {
  title: "TK Getränke",
  categories: [],
};
export const card = writable<Card>(storedCard);
card.subscribe((value) => {
  localStorage.setItem("card", JSON.stringify(value));
});
