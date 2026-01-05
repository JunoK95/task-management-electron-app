import { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from 'react';

type AutoGrowTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoGrowTextarea = forwardRef<HTMLTextAreaElement, AutoGrowTextareaProps>(
  (props, forwardedRef) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (el: HTMLTextAreaElement | null) => {
      innerRef.current = el;

      if (typeof forwardedRef === 'function') {
        forwardedRef(el);
      } else if (forwardedRef) {
        forwardedRef.current = el;
      }
    };

    const resize = () => {
      const el = innerRef.current;
      if (!el) return;

      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
      resize();
    }, [props.value]);

    return (
      <textarea
        {...props}
        ref={setRefs}
        rows={1}
        onInput={(e) => {
          resize();
          props.onInput?.(e);
        }}
        style={{
          resize: 'none',
          overflow: 'hidden',
          ...props.style
        }}
      />
    );
  }
);

AutoGrowTextarea.displayName = 'AutoGrowTextarea';

export default AutoGrowTextarea;
