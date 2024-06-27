export function ToggleButton({
  disabledTitle,
  activeTitle,
  isToggled,
  disabled,
  children,
  onClick,
  className,
}) {
  const buttonStyles = "py-1.5 px-2 text-sm sm:text-base sm:px-4 rounded-xl ";
  const activeButtonStyles =
    buttonStyles +
    "hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
  const disabledButtonStyles = buttonStyles + "text-gray-500 ";

  return (
    <button
      title={disabled ? disabledTitle : activeTitle}
      onClick={onClick}
      disabled={disabled}
      className={
        className +
        " " +
        (disabled
          ? disabledButtonStyles
          : activeButtonStyles +
            (isToggled
              ? "bg-neutral-800 text-gray-100 hover:bg-gray-900"
              : undefined))
      }
    >
      {children}
    </button>
  );
}
