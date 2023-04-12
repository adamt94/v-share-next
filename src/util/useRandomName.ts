import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

var nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
  ]; 
  
  function capitalizeFLetter(input: string): string {
    let string = input;
    string = string[0].toUpperCase() + string.slice(1);
    return string;
  }
  
  export function useRandomName(): string {
    
   const [name, setName] = useLocalStorage("name", "");
    useEffect(() => {
      if (!name) {
        const generateName = async () => {
          let finalName = "";
          finalName += nameList[Math.floor(Math.random() * nameList.length)];
          finalName += nameList[Math.floor(Math.random() * nameList.length)];
          if (Math.random() > 0.5) {
            finalName += nameList[Math.floor(Math.random() * nameList.length)];
          }
  
          const numOfWords = Math.floor(Math.random() * 3) + 1;
  
          try {
            const res = await fetch(
              `https://random-word-api.herokuapp.com/word?number=${numOfWords}`
            );
            const response = (await res.json()) as string[];
            const joinedResponse = response.map(capitalizeFLetter).join("");
            setName(joinedResponse);
          } catch (error) {
            setName(finalName);
          }
        };
  
        generateName();
      }
    }, [name]);
  
    return name;
  }
  
  
  
  
  
  
  
  
  