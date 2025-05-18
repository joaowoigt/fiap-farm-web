import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { UiError } from "../../domain/models/Error";

export default class RegisterObserver {
  private inputError: UiError = {
    show: false,
    message: "O nome de usuário deve ter pelo menos 3 caracteres",
  };

  constructor(
    state: React.Dispatch<React.SetStateAction<UiError>>,
    elementId: string,
    validation: (value: string) => { show: boolean; message: string }
  ) {
    this.init(state, elementId, validation);
  }

  private init(
    state: React.Dispatch<React.SetStateAction<UiError>>,
    elementId: string,
    validation: (value: string) => { show: boolean; message: string }
  ) {
    const inputElement = document.getElementById(elementId) as HTMLInputElement;
    const input$ = fromEvent(inputElement, "input").pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged()
    );

    const validation$ = input$.pipe(
      map((value: string) => {
        return validation(value);
      })
    );

    const subscription = validation$.subscribe((result: UiError) => {
      this.inputError = result;
      state(this.inputError);
    });

    return () => subscription.unsubscribe();
  }
}
