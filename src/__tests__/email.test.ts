
import "@testing-library/jest-dom";
import { describe, test, expect, } from "vitest";
import Email from '../services/email';

describe('Email', () => {
  test('should validate a valid email', () => {
    const validEmail = 'test@example.com';
    expect(Email.validateEmail(validEmail)).toBe(true);
  });

  test('should not validate an invalid email', () => {
    const invalidEmail = 'invalid-email';
    expect(Email.validateEmail(invalidEmail)).toBe(false);
  });
});
