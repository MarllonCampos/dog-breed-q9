import { describe, test, expect } from "vitest";
import { Storage } from "../services/storage";

describe("Storage", () => {
  test("should save and get a token from session storage", () => {
    const token = "my-token";
    Storage.saveToken(token);
    expect(Storage.getToken()).toEqual(token);
  });
});
