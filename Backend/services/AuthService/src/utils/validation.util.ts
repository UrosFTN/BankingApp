export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  static validateRequiredFields(
    data: any,
    requiredFields: string[],
  ): { valid: boolean; message?: string } {
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        return { valid: false, message: `${field} is required` };
      }
    }
    return { valid: true };
  }
}
