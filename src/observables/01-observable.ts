//PAra crear uno observable primero se trae de la libreria
import { Observable, Subscriber, Observer } from "rxjs";

const observable: Observer<string> = {
  next: value => console.log("siguiente [next:]", value),
  error: error => console.warn("error [obs]:", error),
  complete: () => console.info("Completado")
};

//modo antiguo
//const obs$ = Observable.create();

const obs$ = new Observable<string>(subs => {
  //permite crear subscripciones los que depden de este
  subs.next("Hola");
  subs.next("Mundo");
  //Forzar error
  // const a = undefined;
  //a.nombre = "lo";
  //despues del complete ya nada se mandara a los subscriptores
  subs.complete();
});

//obs$.subscribe(
//valor => console.log("next:", valor),
//error => console.warn("error:", error),
//() => console.info("Completado")
//);

obs$.subscribe(observable);
