export function validateGradePayload(body: any) {
  if (!body || !Array.isArray(body.answers)) {
    return { valid: false, message: "Invalid payload: 'answers' must be an array." };
  }
  for (const a of body.answers) {
    if (a.id === undefined || a.value === undefined) {
      return { valid: false, message: 'Each answer must include id and value.' };
    }
  }
  return { valid: true };
}
