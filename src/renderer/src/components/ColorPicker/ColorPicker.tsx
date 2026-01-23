import React, { useCallback, useMemo, useRef, useState } from 'react';

import { accentOptions } from '@/styles/themeColors';
import {
  clamp,
  hexToRgb,
  hsvToRgb,
  isValidHex,
  normalizeHex,
  rgbToHex,
  rgbToHsv
} from '@/utils/colorAndHex';

import styles from './ColorPicker.module.scss';

export type ColorPickerProps = {
  value?: string;
  onChange?: (hex: string) => void;
  size?: number;
  recommendedColors?: string[];
};

const defaultRecommendedColors = accentOptions.map((color) => color.value);

export default function ColorPicker({
  value = '#3b82f6',
  recommendedColors = defaultRecommendedColors,
  onChange,
  size = 180
}: ColorPickerProps) {
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
          style={
            {
              '--hue': `${h * 360}deg`,
              width: size,
              height: size
            } as React.CSSProperties
          }
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            onSatPointer(e);
          }}
          onPointerMove={(e) => e.buttons && onSatPointer(e)}
        >
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
      {recommendedColors && (
        <div className={styles.recommendedColors}>
          {recommendedColors.map((color) => (
            <div
              key={color}
              className={styles.recommendedColor}
              style={{ background: color }}
              onClick={() => {
                setInputValue(color);
                commitInput(color);
              }}
            />
          ))}
        </div>
      )}
      <div className={styles.valueRow}>
        <div className={styles.preview} style={{ background: hex }} />
        <input className={styles.input} value={inputValue} onChange={onInputChange} />
      </div>
    </div>
  );
}
