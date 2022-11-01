type State = {
  isUseDown: boolean;
  usingTime: number;
  useEndedTime: number;
  useType: "action" | "selectAction";
  actionType: 1 | 2 | 3 | 4;
};

type Signal =
  | "signal/action/shoot"
  | "signal/set/actionType"
  | "signal/set/useType/action"
  | "signal/set/useType/selectAction";

export const sendSignal = (signal: Signal) => {
  $.sendSignalCompat("this", signal);
};

const isCompatSendable = (value: unknown): value is CompatSendable => {
  return (
    typeof value === "number" ||
    typeof value === "boolean" ||
    value instanceof Vector2 ||
    value instanceof Vector3
  );
};

type Option = {
  stateCompat?: {
    send: true;
  };
  signal?: {
    send: true;
    key: Signal;
  };
};
export const setState = <T extends keyof State>(
  key: T,
  value: State[T],
  option?: Option,
) => {
  $.state[key] = value;

  if (option?.stateCompat?.send) {
    if (isCompatSendable(value)) {
      const stateCompatKey = `state/${key}`;
      $.setStateCompat("this", stateCompatKey, value);
    } else {
      $.log(`setStateCompat: ${key} is not CompatSendable`);
    }
  }
  if (option?.signal?.send) {
    sendSignal(option.signal.key);
  }
};
export const getState = <T extends keyof State>(
  key: T,
): State[T] | undefined => {
  return $.state[key] as State[T] | undefined;
};
