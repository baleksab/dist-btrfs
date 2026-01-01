declare namespace Intl {
  interface DurationFormatOptions {
    style?: "long" | "short" | "narrow";
    format?: Array<"years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds">;
  }

  class DurationFormat {
    constructor(locales?: string | string[], options?: DurationFormatOptions);
    format(duration: Record<string, number>): string;
  }
}
