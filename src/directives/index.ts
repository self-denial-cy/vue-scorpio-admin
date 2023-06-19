import type { App } from 'vue';
import setupClipboardDirective from './clipboard';
import setupPermissionDirective from './permission';

export default function setupDirectives(app: App) {
  setupClipboardDirective(app);
  setupPermissionDirective(app);
}
