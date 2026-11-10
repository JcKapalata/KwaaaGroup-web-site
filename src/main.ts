import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/** En production : coupe les logs navigateur (comme UCCND). */
function silenceConsoleInProduction(): void {
  if (isDevMode()) return;

  const noop = (): void => undefined;
  const methods: (keyof Console)[] = [
    'log',
    'debug',
    'info',
    'warn',
    'error',
    'trace',
    'table',
    'dir',
    'dirxml',
    'group',
    'groupCollapsed',
    'groupEnd',
    'time',
    'timeEnd',
    'timeLog',
    'count',
    'countReset',
    'assert',
    'clear'
  ];

  for (const method of methods) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (console as any)[method] = noop;
    } catch {
      /* ignore */
    }
  }
}

silenceConsoleInProduction();

bootstrapApplication(App, appConfig).catch(() => {
  /* silencieux en prod */
});
