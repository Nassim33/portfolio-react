import { startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export default function TransitionLink({ to, onClick, ...props }: LinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      {...props}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        startTransition(() => navigate(to));
      }}
    />
  );
}