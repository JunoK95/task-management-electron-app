import React, { useCallback, useMemo, useRef, useState } from 'react';

import styles from './ColorPicker.module.scss';

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const isValidHex = (v: string) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);

const normalizeHex = (v: string) =>
  v.length === 4 ? `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}` : v.toLowerCase();

function hexToRgb(hex: string) {
  const v = hex.replace('#', '');
  const n = parseInt(
    v.length === 3
      ? v
          .split('')
          .map((c) => c + c)
          .join('')
      : v,
    16
  );
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v: max };
}

function hsvToRgb(h: number, s: number, v: number) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);
  const m = i % 6;
  const r = [v, q, p, p, t, v][m];
  const g = [t, v, v, q, p, p][m];
  const b = [p, p, t, v, v, q][m];
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export type ColorPickerProps = {
  value?: string;
  onChange?: (hex: string) => void;
  size?: number;
};

export default function ColorPicker({ value = '#3b82f6', onChange, size = 180 }: ColorPickerProps) {
  const { r, g, b } = hexToRgb(value);
  const initial = rgbToHsv(r, g, b);

  const [h, setH] = useState(initial.h);
  const [s, setS] = useState(initial.s);
  const [v, setV] = useState(initial.v);

  const [inputValue, setInputValue] = useState(value);

  const rgb = useMemo(() => hsvToRgb(h, s, v), [h, s, v]);
  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);

  const satRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const emit = useCallback(
    (nh = h, ns = s, nv = v) => {
      const { r, g, b } = hsvToRgb(nh, ns, nv);
      onChange?.(rgbToHex(r, g, b));
    },
    [h, s, v, onChange]
  );

  // --- commit input if valid hex
  const commitInput = useCallback(
    (raw: string) => {
      if (!isValidHex(raw)) return;
      const normalized = normalizeHex(raw);
      const { r, g, b } = hexToRgb(normalized);
      const hsv = rgbToHsv(r, g, b);
      setH(hsv.h);
      setS(hsv.s);
      setV(hsv.v);
      onChange?.(normalized);
    },
    [onChange]
  );

  const onSatPointer = (e: React.PointerEvent) => {
    const rect = satRef.current!.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width);
    const y = clamp((e.clientY - rect.top) / rect.height);
    setS(x);
    setV(1 - y);
    const rgbObj = hsvToRgb(h, x, 1 - y);
    setInputValue(rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b));
    emit(h, x, 1 - y);
  };

  const onHuePointer = (e: React.PointerEvent) => {
    const rect = hueRef.current!.getBoundingClientRect();
    const y = clamp((e.clientY - rect.top) / rect.height);
    const nh = 1 - y;
    setH(nh);
    const rgbObj = hsvToRgb(nh, s, v);
    setInputValue(rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b));
    emit(nh, s, v);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (isValidHex(val)) commitInput(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <div
          ref={satRef}
          className={styles.sat}
          style={{ width: size, height: size, background: `hsl(${h * 360},100%,50%)` }}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            onSatPointer(e);
          }}
          onPointerMove={(e) => e.buttons && onSatPointer(e)}
        >
          <div className={styles.satWhite} />
          <div className={styles.satBlack} />
          <div
            className={styles.satThumb}
            style={{ left: `calc(${s * 100}% - 0.5rem)`, top: `calc(${(1 - v) * 100}% - 0.5rem)` }}
          />
        </div>

        <div className={styles.side}>
          <div
            ref={hueRef}
            className={styles.hue}
            style={{ height: size }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              onHuePointer(e);
            }}
            onPointerMove={(e) => e.buttons && onHuePointer(e)}
          >
            <div className={styles.hueThumb} style={{ top: `calc(${(1 - h) * 100}% - 0.5rem)` }} />
          </div>
        </div>
      </div>

      <div className={styles.valueRow}>
        <div className={styles.preview} style={{ background: hex }} />
        <input className={styles.input} value={inputValue} onChange={onInputChange} />
      </div>
    </div>
  );
}
