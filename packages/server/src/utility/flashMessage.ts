/**
 * Utilities to enable flash messaging, or a notification message set by one page which
 * is shown on a subsequent page after navigation. For instance, when approving a draft
 * resource the draft page will set a success flash message, then when the user is redirected
 * to the main resources page that page will read and display that message.
 */
import { get } from "svelte/store";

type TFlashMessageType = "success" | "error";

interface TFlashMessage {
  type: TFlashMessageType;
  message: string;
}

/**
 * Add a flash message to the session
 * @param session The svelte writeable store corresponding to the user session
 * @param type TFlashMessageType
 * @param message
 */
export function addFlashMessage(
  session /* svelte writeable store */,
  type: TFlashMessageType,
  message: string
): void {
  session.update(s => {
    const newMessage = { type, message };
    const newMessages = Array.isArray(s.flashMessages)
      ? [...s.flashMessages, newMessage]
      : [newMessage];
    return {
      ...s,
      flashMessages: newMessages,
    };
  });
}

/**
 * Read the set flash messages and then clear them from the session.
 * @param session The svelte writeable store corresponding to the user session
 */
export function readFlashMessages(session): TFlashMessage[] {
  const s = get(session);
  const flashMessages = s.flashMessages;
  session.update(s => ({ ...s, flashMessages: [] }));
  return flashMessages || [];
}
