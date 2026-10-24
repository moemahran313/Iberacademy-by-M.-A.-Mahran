import React, { useState, useEffect, useRef, useCallback, SyntheticEvent } from 'react';
import { ExamTelemetry } from '../types/dele';

interface UseExamIntegrityOptions {
  isExamActive: boolean;
  activeQuestionId?: string;
  maxTabSwitches?: number;
  onTabSwitchWarning?: (count: number) => void;
  onCertificateInvalidated?: (reason: string) => void;
}

export function useExamIntegrity({
  isExamActive,
  activeQuestionId,
  maxTabSwitches = 3,
  onTabSwitchWarning,
  onCertificateInvalidated
}: UseExamIntegrityOptions) {
  const [sessionId, setSessionId] = useState<string>('');
  const [startedAt, setStartedAt] = useState<string>('');
  const [tabSwitchesCount, setTabSwitchesCount] = useState<number>(0);
  const [totalCopyPasteAttempts, setTotalCopyPasteAttempts] = useState<number>(0);
  const [isCertificateEligible, setIsCertificateEligible] = useState<boolean>(true);
  const [isInvalidated, setIsInvalidated] = useState<boolean>(false);
  const [invalidationReason, setInvalidationReason] = useState<string | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeQuestionRef = useRef<string | undefined>(activeQuestionId);

  useEffect(() => {
    activeQuestionRef.current = activeQuestionId;
  }, [activeQuestionId]);

  // Reset or initialize session on exam start
  useEffect(() => {
    if (isExamActive) {
      const id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `exam-session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      setSessionId(id);
      setStartedAt(new Date().toISOString());
      setTabSwitchesCount(0);
      setTotalCopyPasteAttempts(0);
      setIsCertificateEligible(true);
      setIsInvalidated(false);
      setInvalidationReason(undefined);
      setShowWarningModal(false);
      setTimeSpentPerQuestion({});
    }
  }, [isExamActive]);

  // Track time spent on current question
  useEffect(() => {
    if (!isExamActive) return;

    const interval = setInterval(() => {
      const currentQ = activeQuestionRef.current;
      if (currentQ) {
        setTimeSpentPerQuestion(prev => ({
          ...prev,
          [currentQ]: (prev[currentQ] || 0) + 1
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamActive]);

  // Visibility state listener (Tab switch detection)
  useEffect(() => {
    if (!isExamActive) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setTabSwitchesCount(prev => {
          const newCount = prev + 1;
          if (newCount >= maxTabSwitches) {
            setIsCertificateEligible(false);
            setIsInvalidated(true);
            const reason = `Se ha excedido el número máximo de cambios de pestaña permitidos (${maxTabSwitches}). Se ha revocado la validez para el certificado oficial.`;
            setInvalidationReason(reason);
            if (onCertificateInvalidated) {
              onCertificateInvalidated(reason);
            }
          } else {
            setShowWarningModal(true);
            if (onTabSwitchWarning) {
              onTabSwitchWarning(newCount);
            }
          }
          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isExamActive, maxTabSwitches, onTabSwitchWarning, onCertificateInvalidated]);

  // Fullscreen sync
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Copy / Paste / Context Menu Prevention
  const handleCopyPasteEvent = useCallback((e: SyntheticEvent) => {
    if (!isExamActive) return;
    e.preventDefault();
    setTotalCopyPasteAttempts(prev => prev + 1);
  }, [isExamActive]);

  const requestFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
      } else if (!document.fullscreenElement && document.documentElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Browser or mobile device might not allow programmatically triggered fullscreen
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // ignore exit error
    }
  }, []);

  const dismissWarningModal = useCallback(() => {
    setShowWarningModal(false);
  }, []);

  const getTelemetryPayload = useCallback((finishedAtTime?: string): ExamTelemetry => {
    return {
      sessionId: sessionId || `session-${Date.now()}`,
      startedAt: startedAt || new Date().toISOString(),
      finishedAt: finishedAtTime || new Date().toISOString(),
      tabSwitchesCount,
      timeSpentPerQuestion,
      totalCopyPasteAttempts,
      isFullscreen,
      isCertificateEligible,
      isInvalidated,
      invalidationReason
    };
  }, [
    sessionId,
    startedAt,
    tabSwitchesCount,
    timeSpentPerQuestion,
    totalCopyPasteAttempts,
    isFullscreen,
    isCertificateEligible,
    isInvalidated,
    invalidationReason
  ]);

  // Save to Local Storage / Firestore fallback
  const saveTelemetry = useCallback((finishedAtTime?: string) => {
    const payload = getTelemetryPayload(finishedAtTime);
    try {
      const existing = JSON.parse(localStorage.getItem('dele_exam_telemetry') || '[]');
      existing.push(payload);
      localStorage.setItem('dele_exam_telemetry', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }
    return payload;
  }, [getTelemetryPayload]);

  return {
    containerRef,
    sessionId,
    startedAt,
    tabSwitchesCount,
    totalCopyPasteAttempts,
    isCertificateEligible,
    isInvalidated,
    invalidationReason,
    isFullscreen,
    showWarningModal,
    timeSpentPerQuestion,
    handleCopyPasteEvent,
    requestFullscreen,
    exitFullscreen,
    dismissWarningModal,
    getTelemetryPayload,
    saveTelemetry
  };
}
