import { Observable, Subscriber, Observer } from "rxjs";

const observable: Observer<number> = {
  next: value => console.log("[next:]", value),
  error: error => console.warn("[obs]:", error),
  complete: () => console.info("Completado")
};

const intervalo$ = new Observable<number>(sucscriber => {
  let cont = 0;
  const interval = setInterval(() => {
    cont++;
    sucscriber.next(cont);
  }, 1000);

  setTimeout(() => {
    //esta funcion dispara el return
    sucscriber.complete();
  }, 2500);
  return () => {
    //con esto detiene la ejecucion de la funcion
    clearInterval(interval);
  };
});

const subs1 = intervalo$.subscribe(observable);
const subs2 = intervalo$.subscribe(observable);
const subs3 = intervalo$.subscribe(observable);

subs1.add(subs2).add(subs3);

setTimeout(() => {
  // subs1.unsubscribe();
  // subs2.unsubscribe();
  // subs3.unsubscribe();

  console.log("alto total");
}, 4000);
