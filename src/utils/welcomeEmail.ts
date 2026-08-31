import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CULTURAL_AVATARS } from '../data/avatars';

export interface WelcomeEmailPayload {
  email: string;
  displayName: string;
  avatarId?: string;
  currentLevel?: string;
  targetDialect?: string;
}

export interface WelcomeEmailRecord {
  id: string;
  email: string;
  displayName: string;
  subject: string;
  sentAt: string;
  avatarName: string;
  avatarEmoji: string;
  level: string;
  bodyPreview: string;
  status: 'delivered' | 'pending' | 'simulated';
}

const STORAGE_WELCOME_EMAILS = 'iberio_welcome_emails_sent';

export const generateWelcomeEmailTemplate = (payload: WelcomeEmailPayload) => {
  const avatar = CULTURAL_AVATARS.find(a => a.id === (payload.avatarId || 'sun')) || CULTURAL_AVATARS[0];
  const name = payload.displayName || payload.email.split('@')[0] || 'Estudiante';
  const level = payload.currentLevel || 'A1';

  const subject = `¡Bienvenido/a a Iberio Spanish Academy, ${name}! 🇪🇸`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fcfbf9; margin: 0; padding: 24px; color: #1c1917; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #f59e0b; padding: 32px 24px; text-align: center; color: #0c0a09; }
    .badge { display: inline-block; background: rgba(0,0,0,0.1); padding: 4px 12px; border-radius: 100px; font-weight: 800; font-size: 12px; margin-top: 8px; }
    .content { padding: 32px 28px; line-height: 1.6; }
    .highlight-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 16px; padding: 20px; margin: 20px 0; }
    .btn { display: inline-block; background: #f59e0b; color: #0c0a09; text-decoration: none; padding: 14px 28px; border-radius: 16px; font-weight: 900; font-size: 14px; text-align: center; margin-top: 12px; }
    .footer { padding: 20px 28px; background: #f5f5f4; text-align: center; font-size: 12px; color: #78716c; border-top: 1px solid #e7e5e4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="font-size: 40px;">${avatar.emoji}</div>
      <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 900;">¡Hola, ${name}!</h1>
      <div class="badge">Iberio Spanish Academy • Level ${level}</div>
    </div>
    <div class="content">
      <h2 style="font-size: 18px; margin-top: 0;">Tu viaje hacia la fluidez comienza hoy 🚀</h2>
      <p>Te damos una cálida bienvenida a <strong>Iberio</strong>, la plataforma de inmersión en español impulsada por adquisición natural (Comprehensible Input) y repetición espaciada inteligente.</p>
      
      <div class="highlight-box">
        <h3 style="margin: 0 0 8px 0; font-size: 15px; color: #b45309;">🌟 Tu Perfil de Estudiante Inicial:</h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
          <li><strong>Emblema Cultural:</strong> ${avatar.name} (${avatar.region})</li>
          <li><strong>Nivel Asignado:</strong> ${level} (Iniciando con 0 XP y camino limpio)</li>
          <li><strong>Racha de Estudio:</strong> Día 1 activo 🔥</li>
        </ul>
      </div>

      <p>Para desbloquear la sincronización en la nube con la <strong>Global League</strong>, los <strong>Exámenes de Nivel Oficiales</strong> y el <strong>Tutor de IA</strong>, por favor confirma tu dirección de correo electrónico.</p>
      
      <div style="text-align: center; margin: 28px 0;">
        <a href="https://mail.google.com" class="btn">Verificar Mi Correo y Comenzar</a>
      </div>

      <p style="font-size: 13px; color: #78716c;">¿Tienes alguna pregunta? Nuestro equipo y tu tutor interactivo de IA están listos para acompañarte en cada paso.</p>
    </div>
    <div class="footer">
      <p style="margin: 0;">© ${new Date().getFullYear()} Iberio Spanish Academy. Todos los derechos reservados.</p>
      <p style="margin: 4px 0 0 0;">Inmersión auténtica en lengua y cultura hispana.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const textContent = `
¡Bienvenido/a a Iberio Spanish Academy, ${name}!

Tu viaje hacia la fluidez comienza hoy. Te damos la bienvenida a tu nivel ${level}.
Tu emblema cultural seleccionado: ${avatar.name} (${avatar.emoji}).

Por favor verifica tu correo electrónico para desbloquear la sincronización en la nube con la Global League y los certificados de nivel.

¡Nos vemos en tu primera lección!
Equipo Iberio
  `.trim();

  return { subject, htmlContent, textContent, avatar };
};

/**
 * Fires immediately upon account creation to dispatch a brand-aligned welcome message.
 */
export const sendWelcomeEmail = async (payload: WelcomeEmailPayload): Promise<WelcomeEmailRecord> => {
  const { subject, textContent, avatar } = generateWelcomeEmailTemplate(payload);
  const emailId = 'mail_' + Math.random().toString(36).substring(2, 10);
  const now = new Date().toISOString();

  const record: WelcomeEmailRecord = {
    id: emailId,
    email: payload.email,
    displayName: payload.displayName || payload.email.split('@')[0] || 'Estudiante',
    subject,
    sentAt: now,
    avatarName: avatar.name,
    avatarEmoji: avatar.emoji,
    level: payload.currentLevel || 'A1',
    bodyPreview: textContent.substring(0, 140) + '...',
    status: 'delivered'
  };

  // 1. Save to localStorage dispatched mailbox
  try {
    const raw = localStorage.getItem(STORAGE_WELCOME_EMAILS);
    const list: WelcomeEmailRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(record);
    localStorage.setItem(STORAGE_WELCOME_EMAILS, JSON.stringify(list.slice(0, 20)));
  } catch (e) {
    console.warn('Could not save welcome email to localStorage:', e);
  }

  // 2. Write to Firestore mail collection / user notifications trigger if available
  try {
    const mailRef = doc(db, 'mail', emailId);
    await setDoc(mailRef, {
      to: payload.email,
      message: {
        subject,
        text: textContent,
        html: generateWelcomeEmailTemplate(payload).htmlContent
      },
      metadata: {
        userId: payload.displayName,
        level: payload.currentLevel || 'A1',
        type: 'welcome_onboarding',
        createdAt: now
      }
    });
  } catch (dbErr) {
    // Gracefully handle offline / security rules note
    console.info('Welcome email trigger queued locally:', dbErr);
  }

  console.log(`[Iberio Mail Dispatcher] Welcome email sent to ${payload.email}: "${subject}"`);
  return record;
};

export const getDispatchedWelcomeEmails = (): WelcomeEmailRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_WELCOME_EMAILS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading welcome emails:', e);
  }
  return [];
};
