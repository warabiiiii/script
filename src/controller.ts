import { REGISTER_TIME, SHOW_MENU_TIME } from "./constants";
import { getState, sendSignal, setState } from "./state";

export const updateUsingTime = (deltaTime: number) => {
  const isUseDown = getState("isUseDown");
  if (isUseDown) {
    const nextUsingTime = (getState("usingTime") ?? 0) + deltaTime;
    setState("usingTime", nextUsingTime);
  } else {
    setState("usingTime", 0);
  }
};

export const updateUseEndedTime = (deltaTime: number) => {
  const isUseDown = getState("isUseDown");
  if (isUseDown) {
    setState("useEndedTime", 0);
  } else {
    const nextUseEndedTime = (getState("useEndedTime") ?? 0) + deltaTime;
    setState("useEndedTime", nextUseEndedTime);
  }
};

export const switchToSelectActionModeOnTimeElapsed = () => {
  const useType = getState("useType");
  if (useType === "selectAction") {
    return;
  }
  const usingTime = getState("usingTime") ?? 0;
  if (usingTime > SHOW_MENU_TIME) {
    $.log("switch to selectAction mode.");
    setState("useType", "selectAction", {
      signal: { send: true, key: "signal/set/useType/selectAction" },
    });
  }
};

export const switchToActionModeOnTimeElapsed = () => {
  const useType = getState("useType");
  if (useType !== "selectAction") {
    return;
  }
  const useEndedTime = getState("useEndedTime") ?? 0;
  if (useEndedTime > REGISTER_TIME) {
    $.log("switch to action mode.");
    setState("useType", "action", {
      signal: { send: true, key: "signal/set/useType/action" },
    });
  }
};

const rotateMode = () => {
  const currentActionType = getState("actionType");
  const nextActionType =
    currentActionType === 1
      ? 2
      : currentActionType === 2
      ? 3
      : currentActionType === 3
      ? 4
      : 1;
  $.log(`set actionType: ${nextActionType}`);
  setState("actionType", nextActionType, {
    stateCompat: { send: true },
    signal: { send: true, key: "signal/set/actionType" },
  });
};

export const onUse = (isDown: boolean) => {
  setState("isUseDown", isDown);
  if (!isDown) {
    return;
  }
  const useType = getState("useType");
  switch (useType) {
    case "action": {
      action();
      return;
    }
    case "selectAction": {
      rotateMode();
      return;
    }
  }
};

const action = () => {
  const actionType = getState("actionType");
  $.log(`action: ${actionType}`);
  shootAction();
};

const shootAction = () => {
  sendSignal("signal/action/shoot");
};
