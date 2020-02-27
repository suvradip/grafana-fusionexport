import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
import { Editor } from './Editor';
import { FusionExport } from './FusionExport';

export const plugin = new PanelPlugin<SimpleOptions>(FusionExport).setDefaults(defaults).setEditor(Editor);
