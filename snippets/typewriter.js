import "./styles.css";

import { fromEvent, from, zip, interval } from "rxjs";
import { map, pluck, debounceTime, switchMap, scan } from "rxjs/operators";

const input = document.getElementById("input");
const output = document.getElementById("output");

const input$ = fromEvent(input, "input").pipe(
  pluck("target", "value"), // get target.value
  debounceTime(1000), // wiat typing is done
  // switch map returns new stream
  switchMap(text =>
    zip(
      // if all below emit, emit a value
      from(text), // transform text to stream
      interval(200) // emmit value every 200ms
    ).pipe(
      map(([letter]) => letter), // take head (2nd is interval no)
      scan((acc, curr) => acc + curr), // as array's reduce
      map(text => (output.innerText = text)) // update output
    )
  )
);

input$.subscribe();
