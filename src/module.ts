import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
import { SimpleEditor } from './Editor';
import { FusionExport } from './FusionExport';

export const plugin = new PanelPlugin<SimpleOptions>(FusionExport).setDefaults(defaults).setEditor(SimpleEditor)
