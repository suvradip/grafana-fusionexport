import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { SimpleOptions } from './types';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onHostChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, host: target.value });
  };

  onPortChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, port: target.value });
  };

  oneFileNameChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, fileName: target.value });
  };

  onFormatChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, format: target.value });
  };

  onDashboardUrlChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, dashboardUrl: target.value });
  };

  oneTokenChange = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, token: target.value });
  };

  render() {
    const { options } = this.props;
 

    return (
      <div className="section-wrapper">
        <div className="section">
          <div className="group">
            <h5 className="section-heading">FusionExport Host</h5>
            <FormField label="String" labelWidth={5} inputWidth={100} type="text" onChange={this.onHostChanged} value={options.host || ''} />
          </div>
          <div className="group">
            <h5 className="section-heading">FusionExport </h5>
            <FormField label="Number" labelWidth={5} inputWidth={100} type="number" onChange={this.onPortChanged} value={options.port || ''} />
          </div>
          <div className="group">
            <h5 className="section-heading">Grafan Token (view access only)</h5>
            <FormField label="String" inputWidth={100} type="password" onChange={this.oneTokenChange} value={options.token || ''} />
          </div>
        </div>

        <div className="section gf-form-group">
          {/* <div className="group">
            <h5 className="section-heading">Dahboard url</h5>
            <FormField label="Url" inputWidth={100} type="text" onChange={this.onDashboardUrlChange} value={options.dashboardUrl || ''} />
          </div> */}
          <div className="group">
            <h5 className="section-heading">File name</h5>
            <FormField label="String" inputWidth={100} type="text" onChange={this.oneFileNameChange} value={options.fileName || ''} />
          </div>
          <div className="group">
            <h5 className="section-heading">Format</h5>
            <FormField label="String" inputWidth={100} type="text" onChange={this.onFormatChange} value={options.format || ''} />
          </div>
        </div>
      </div>
    );
  }
}
