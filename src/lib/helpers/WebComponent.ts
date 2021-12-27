import { TemplateDelegate } from "handlebars";
import { BehaviorSubject, EMPTY, of, merge } from "rxjs";
import { bufferTime, mergeMap } from "rxjs/operators";
import { removeAllChildNodes } from "./elements";

type Props = Record<string, string>;

class WebComponent<State extends {} = {}> extends HTMLElement {
  private $templateElement = document.createElement("template");

  private state$: BehaviorSubject<State>;
  private props$: BehaviorSubject<Props>;

  template: TemplateDelegate | null = null;

  setState(newState: State) {
    const currentState = this.state$.value;
    this.state$.next({ ...currentState, ...newState });
  }

  set state(newState: State) {
    this.setState(newState);
  }

  get state() {
    return this.state$.value;
  }

  get props() {
    return this.props$.value;
  }

  set props(props: Props | {}) {}

  constructor() {
    super();
    this.state$ = new BehaviorSubject({} as State);
    this.props$ = new BehaviorSubject({});

    this.subscribe();
    this.render();
  }

  private subscribe<T>() {
    merge(this.props$, this.state$)
      .pipe(
        bufferTime(20),
        mergeMap((values) => {
          return values.length > 0 ? of(values[values.length - 1]) : EMPTY;
        })
      )
      .subscribe({
        next: () => this.render(),
        error: (error) => this.onError(error),
      });
  }

  onAttributeChange(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      const currentProps = this.props$.value;
      this.props$.next({ ...currentProps, [name]: newValue });
    }
  }

  onError(error: any) {
    console.error(error);
  }

  render() {
    try {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      if (this.template && this.shadowRoot) {
        this.$templateElement.innerHTML = this.template({
          state: this.state,
          props: this.props,
        });
        removeAllChildNodes(this.shadowRoot!);
        this.shadowRoot.appendChild(
          this.$templateElement.content.cloneNode(true)
        );
      }
    } catch (error) {
      this.onError(error);
    }
  }
}

export default WebComponent;
