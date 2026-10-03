// Minimal typning för npm-paketet "hyphen" (saknar egna typer). Vi
// använder bara den synkrona avstavaren med svenska mönster.
declare module "hyphen/sv" {
  export function hyphenateSync(
    text: string,
    options?: { hyphenChar?: string; minWordLength?: number; debug?: boolean },
  ): string;
}
