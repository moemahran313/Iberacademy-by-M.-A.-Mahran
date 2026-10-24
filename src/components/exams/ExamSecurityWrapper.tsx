import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Info,
  CheckCircle,
  CopyX,
  Lock
} from 'lucide-react';
import { useExamIntegrity } from '../../hooks/useExamIntegrity';

interface ExamSecurityWrapperProps {
  children: ReactNode;
  isExamActive: boolean;
  activeQuestionId?: string;
  examTitle?: string;
  onTelemetryUpdate?: (telemetry: ReturnType<ReturnType<typeof useExamIntegrity>['getTelemetryPayload']>) => void;
}

export const ExamSecurityWrapper: React.FC<ExamSecurityWrapperProps> = ({
  children,
  isExamActive,
  activeQuestionId,
  examTitle = 'Examen Oficial DELE / SIELE',
  onTelemetryUpdate
}) => {
  const {
    containerRef,
    tabSwitchesCount,
    totalCopyPasteAttempts,
    isCertificateEligible,
    isInvalidated,
    invalidationReason,
    isFullscreen,
    showWarningModal,
    handleCopyPasteEvent,
    requestFullscreen,
    exitFullscreen,
    dismissWarningModal,
    getTelemetryPayload
  } = useExamIntegrity({
    isExamActive,
    activeQuestionId,
    maxTabSwitches: 3,
    onCertificateInvalidated: () => {
      if (onTelemetryUpdate) {
        onTelemetryUpdate(getTelemetryPayload());
      }
    }
  });

  return (
    <div
      ref={containerRef}
      onCopy={handleCopyPasteEvent}
      onPaste={handleCopyPasteEvent}
      onCut={handleCopyPasteEvent}
      onContextMenu={handleCopyPasteEvent}
      className="relative min-h-screen bg-stone-50 dark:bg-[#0f0e0d] text-stone-900 dark:text-stone-100 select-none"
    >
      {/* Top Exam Security Header Bar */}
      {isExamActive && (
        <div className="sticky top-0 z-40 bg-stone-900/95 text-stone-100 backdrop-blur-md px-4 py-2 border-b border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold">
              {isCertificateEligible ? (
                tabSwitchesCount === 0 ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Integridad Verificada</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Advertencia ({tabSwitchesCount}/3)</span>
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded-full">
                  <ShieldX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Certificado Revocado (Modo Práctica)</span>
                </span>
              )}
            </div>

            <span className="hidden sm:inline text-stone-400 border-l border-stone-800 pl-3">
              {examTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {totalCopyPasteAttempts > 0 && (
              <span className="inline-flex items-center gap-1 text-amber-300 bg-stone-800 px-2 py-0.5 rounded font-mono text-[11px]" title="Intentos de copiado/pegado bloqueados por la supervisión del examen">
                <CopyX className="w-3 h-3 text-amber-400" />
                <span>{totalCopyPasteAttempts} copiado bloqueado</span>
              </span>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={isFullscreen ? exitFullscreen : requestFullscreen}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Modo pantalla completa'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Salir de Pantalla Completa</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Pantalla Completa</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div>{children}</div>

      {/* Non-Blocking Tab Switch Warning Modal */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full bg-stone-900 text-stone-100 p-6 rounded-2xl border border-amber-500/40 shadow-2xl space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-header text-amber-400">
                    Advertencia de Supervisión de Examen
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Se ha detectado un cambio de pestaña o pérdida de foco en la ventana del navegador.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 text-xs text-stone-300 space-y-2 leading-relaxed">
                <div className="flex justify-between font-mono text-amber-300 font-bold border-b border-stone-700 pb-1.5">
                  <span>Registro de Integridad:</span>
                  <span>{tabSwitchesCount} de 3 advertencias</span>
                </div>
                <p>
                  Para garantizar la autenticidad del examen official, las salidas de la ventana son auditadas. <strong>Si cambias de pestaña 3 veces, la elegibilidad del certificado official será anulada</strong>.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={dismissWarningModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Entendido y Continuar Examen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Invalidation Notification Banner Modal */}
      <AnimatePresence>
        {isInvalidated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 max-w-lg w-full bg-stone-900 text-stone-100 p-5 rounded-2xl border border-rose-500/50 shadow-2xl space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
                <ShieldX className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-rose-400 font-header">
                  Certificación Oficial Invalidad
                </h4>
                <p className="text-xs text-stone-400">
                  {invalidationReason || 'Se ha superado el límite de abandono de pestaña.'}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-800 text-[11px] text-stone-300 leading-relaxed">
              💡 Puedes completar las preguntas y ver la puntuación didáctica, pero no se generará el distintivo official de certificación DELE/SIELE para esta sesión.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
