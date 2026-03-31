"use server";
import { createSession } from "@/lib/session";

export async function verifyPin(pin: string) {
  const correctPin = process.env.SECRET_PIN;

  if (!correctPin) {
    console.warn("SECRET_PIN is not set in environment variables.");
    return false;
  }

  // Trim both to ensure no accidental whitespace causes failure
  const input = pin.trim();
  const secret = correctPin.trim();

  const isMatch = input === secret;

  console.log(
    `[VerifyPin] Input: "${input}" | Secret: "${secret}" | Match: ${isMatch}`
  );

  if (isMatch) {
    await createSession();
  }

  return isMatch;
}
