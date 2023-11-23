import "./toggle-switch.scss";

export interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const BLOCK = "lib_toggle-switch";

export const ToggleSwitch = ({ isChecked, onToggle }: ToggleSwitchProps) => {
  return (
    <label className={`${BLOCK}_switch`}>
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className={`${BLOCK}_slider ${BLOCK}_slider_round`} />
    </label>
  );
};
