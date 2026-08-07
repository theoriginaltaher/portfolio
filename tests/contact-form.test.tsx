import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fc from "fast-check";
import { ContactForm } from "@/components/contact/ContactForm";

describe("ContactForm properties", () => {
  // Property 16: The form renders every required field.
  it("renders all required controls", () => { render(<ContactForm />); ["name", "email", "subject", "message"].forEach((name) => expect(screen.getByLabelText(new RegExp(name, "i"))).toBeInTheDocument()); });

  // Property 17: Any empty required field blocks the API call.
  it("blocks submission when required fields are empty", async () => { const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}")); const user = userEvent.setup(); render(<ContactForm />); await user.click(screen.getByRole("button", { name: "Send message" })); expect(screen.getAllByText("This field is required.")).toHaveLength(4); expect(fetchMock).not.toHaveBeenCalled(); fetchMock.mockRestore(); });

  // Property 18: Invalid email strings fail format validation and block the API call.
  it("rejects invalid email formats", async () => { const invalidEmails = fc.sample(fc.string().filter((value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)), 12); for (const email of invalidEmails) { const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}")); const user = userEvent.setup(); const { unmount } = render(<ContactForm />); fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test Person" } }); fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } }); fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Test subject" } }); fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message" } }); await user.click(screen.getByRole("button", { name: "Send message" })); expect(fetchMock).not.toHaveBeenCalled(); unmount(); fetchMock.mockRestore(); } });
});
