import { Observable, Subject, Observer } from "rxjs";

const observer: Observer<any> = {
  next: value => console.log("[next:]", value),
  error: error => console.warn("[obs]:", error),
  complete: () => console.info("Completado")
};

const interbalo$ = new Observable<number>(subs => {
  const intervalID = setInterval(() => subs.next(Math.random()), 1000);

  return () => {
    clearInterval(intervalID);
    console.log("intervalo destruido");
  };
});

//Subject
/**
 * 1- casteo multiple (manda lo mismo a todos los substrictores)
 * 2- Tambien es un observer
 * 3- Next,error y cumplete
 */
const subject$ = new Subject();
const subscription = interbalo$.subscribe(subject$);

const sub1 = subject$.subscribe(observer);
const sub2 = subject$.subscribe(observer);
setTimeout(() => {
  subject$.next(10);
  subject$.complete();
  subscription.unsubscribe();
}, 3500);

//Subscripcion
/*
const sub1 = interbalo$.subscribe(rnd => console.log("subs1", rnd));
const sub2 = interbalo$.subscribe(rnd => console.log("subs2", rnd));
*/
