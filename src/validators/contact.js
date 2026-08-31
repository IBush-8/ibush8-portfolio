const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(body) {
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const message = String(body?.message ?? '').trim();

  const errors = {};

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Name must be between 2 and 80 characters.';
  }
  if (!emailRegex.test(email) || email.length > 160) {
    errors.email = 'Please provide a valid email address.';
  }
  if (message.length < 10 || message.length > 4000) {
    errors.message = 'Message must be between 10 and 4000 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { name, email, message }
  };
}
