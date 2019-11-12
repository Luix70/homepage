import * as Sentry from "@sentry/browser";

export default function initLogger() {
  Sentry.init({
    dsn: "https://41619563761d49c7b78c61af5dfc8bbb@sentry.io/1800383"
  });
}
