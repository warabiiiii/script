import {
  onUse,
  switchToActionModeOnTimeElapsed,
  switchToSelectActionModeOnTimeElapsed,
  updateUseEndedTime,
  updateUsingTime,
} from "./controller";

$.onUpdate((deltaTime) => {
  updateUsingTime(deltaTime);
  updateUseEndedTime(deltaTime);
  switchToSelectActionModeOnTimeElapsed();
  switchToActionModeOnTimeElapsed();
});

$.onUse((isDown) => {
  onUse(isDown);
});
