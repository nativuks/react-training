import { useState } from "react";

export function Button1() {
     let counterClick = 0;
     const[counter, setCounter] = useState(0);

     function incrementCounter() {
         
         setCounter(counter+1);
         console.log(counter);
     }
     function handleClick() {
        counterClick++;
        console.log(counterClick);
     }
    return(
        <><button onClick={incrementCounter}>
           {counter}
        </button>
        <button onClick={handleClick}>click</button>
        </>
    );
}