'use client';

import { useMemo, useState } from 'react';
import { FormSchema } from '@/types/forms';

export function useFormNavigation(schema: FormSchema | null) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  const parts = useMemo(() => schema?.parts ?? [], [schema]);
  const currentPart = parts[currentPartIndex] ?? null;

  function goToPart(index: number) {
    if (index >= 0 && index < parts.length) {
      setCurrentPartIndex(index);
    }
  }

  function goNext() {
    goToPart(currentPartIndex + 1);
  }

  function goBack() {
    goToPart(currentPartIndex - 1);
  }

  return {
    parts,
    currentPart,
    currentPartIndex,
    isFirst: currentPartIndex === 0,
    isLast: currentPartIndex === Math.max(parts.length - 1, 0),
    goToPart,
    goNext,
    goBack
  };
}
