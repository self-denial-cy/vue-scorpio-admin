import type { App } from 'vue';
import setupClipboardDirective from './clipboard';

export default function setupDirectives(app: App) {
  setupClipboardDirective(app);
}
