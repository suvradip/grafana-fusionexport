import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaults } from './types';
// import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';

import { FusionExport } from './FusionExport';

// export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setDefaults(defaults).setEditor(SimpleEditor);


export const plugin = new PanelPlugin<SimpleOptions>(FusionExport).setDefaults(defaults).setEditor(SimpleEditor)