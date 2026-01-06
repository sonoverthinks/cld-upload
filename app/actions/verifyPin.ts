"use server";

export async function verifyPin(pin: string) {
  const correctPin = process.env.SECRET_PIN;

  if (!correctPin) {
    console.warn("SECRET_PIN is not set in environment variables.");
    return false;
  }

  // Trim both to ensure no accidental whitespace causes failure
  const input = pin.trim();
  const secret = correctPin.trim();

  console.log(
    `[VerifyPin] Input: "${input}" | Secret: "${secret}" | Match: ${
      input === secret
    }`
  );

  return input === secret;
}
