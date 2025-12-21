/**
 * NBS IPS QR Code Parser
 * Parses NBS IPS QR format with pipe-delimited key:value pairs
 */

export interface NBSIpsQRData {
  currency: string;
  recipientAccount: string;
  recipientName: string;
  amount: number;
  paymentCode?: string;
  model?: string;
  callNumber?: string;
  purpose?: string;
}

/**
 * Parse NBS IPS QR code data
 * Format: K|C:currency|R:recipientAccount|N:recipientName|I:purpose|P:amount|S:paymentCode|SF:paymentCode|RO:callNumber
 * Example: K|C:RSD|R:265123456789|N:John Doe|P:RSD1789,31|S:97|RO:123456
 *
 * @param data - Raw QR code data string
 * @returns Parsed NBS IPS QR data or null if invalid
 */
export const parseNBSIpsQR = (data: string): NBSIpsQRData | null => {
  if (!data || !data.includes("|")) {
    return null;
  }

  try {
    const pairs = data.split("|");
    const parsed: Record<string, string> = {};

    // Parse key:value pairs
    for (const pair of pairs) {
      if (pair.includes(":")) {
        const [key, ...valueParts] = pair.split(":");
        const value = valueParts.join(":"); // Handle values with colons
        parsed[key.trim()] = value.trim();
      }
    }

    // Extract required fields
    const recipientAccount = parsed["R"];
    const amountStr = parsed["I"];

    // Validate required fields
    if (!recipientAccount || !amountStr) {
      return null;
    }

    // Parse amount - handle format like "RSD1789,31"
    const amount = parseAmount(amountStr);

    if (amount === null || amount < 0) {
      return null;
    }

    // Extract currency from amount string or use separate field
    let currency = parsed["C"] || "RSD";
    if (amountStr && !amountStr.includes(",") && !amountStr.includes(".")) {
      // If amount doesn't have decimal, currency might be prefixed
      const currencyMatch = amountStr.match(/^([A-Z]{3})/);
      if (currencyMatch) {
        currency = currencyMatch[1];
      }
    }

    return {
      currency,
      recipientAccount,
      recipientName: parsed["N"] || "",
      amount,
      paymentCode: parsed["SF"] || undefined,
      model: extractModel(parsed["RO"] || ""),
      callNumber: removeModelFromCallNumber(parsed["RO"] || ""),
      purpose: parsed["S"] || undefined,
    };
  } catch (error) {
    console.error("Error parsing NBS IPS QR code:", error);
    return null;
  }
};

/**
 * Parse amount from string, handling formats like "1789,31" or "RSD1789,31"
 *
 * @param amountStr - Amount string with possible currency prefix and comma decimal
 * @returns Parsed numeric amount or null if invalid
 */
const parseAmount = (amountStr: string): number | null => {
  if (!amountStr) {
    return null;
  }

  try {
    // Remove currency prefix if present (e.g., "RSD" from "RSD1789,31")
    let cleaned = amountStr.replace(/^[A-Z]{3}/, "");

    // Replace comma with dot for decimal separator
    cleaned = cleaned.replace(",", ".");

    // Remove any whitespace
    cleaned = cleaned.trim();

    const amount = parseFloat(cleaned);
    if (Number.isNaN(amount)) {
      return null;
    }

    return amount;
  } catch (error) {
    console.error("Error parsing amount:", error);
    return null;
  }
};

/**
 * Extract model (first 2 digits) from call number
 *
 * @param callNumber - Call number string (e.g., "97234...")
 * @returns First 2 digits as model, or undefined if not available
 */
const extractModel = (callNumber: string): string | undefined => {
  if (!callNumber || callNumber.length < 2) {
    return undefined;
  }
  const model = callNumber.substring(0, 2);
  // Validate it's numeric
  if (/^\d{2}$/.test(model)) {
    return model;
  }
  return undefined;
};

/**
 * Remove model (first 2 digits) from call number
 *
 * @param callNumber - Call number string (e.g., "97234...")
 * @returns Call number without the first 2 digits, or undefined if empty
 */
const removeModelFromCallNumber = (callNumber: string): string | undefined => {
  if (!callNumber || callNumber.length < 2) {
    return undefined;
  }
  const model = callNumber.substring(0, 2);
  // Only remove if first 2 chars are numeric (valid model)
  if (/^\d{2}$/.test(model)) {
    const remainder = callNumber.substring(2);
    return remainder || undefined;
  }
  return callNumber || undefined;
};
