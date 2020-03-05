import React, { PureComponent } from 'react';
import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { SimpleOptions } from './types';


interface State {
  isLightTheme: boolean;
  chartLayout: number;
}
export class Editor extends PureComponent<PanelEditorProps<SimpleOptions>, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      chartLayout: this.props.options.chartLayout,
      isLightTheme: this.props.options.theme === 'light',
    };
  }

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

  onExportTypeChange = ({ target }: any) => {
    const value = Number(target.value);
    this.setState({ chartLayout: value });
    this.props.onOptionsChange({ ...this.props.options, chartLayout: value });
  };

  onPDFBackgroundChange = ({ target }: any) => {
    if(target.checked){
      this.setState({
        isLightTheme: false,
      });
      this.props.onOptionsChange({ ...this.props.options, theme: 'dark' });
    } else {
      this.setState({
        isLightTheme: true,
      });
      this.props.onOptionsChange({ ...this.props.options, theme: 'light' });
    }
  };

  render() {
    const { options } = this.props;
    const columns = [{ text: 'Entire Dashboard', value: 0 }, { text: 'One column per row', value: 1 }, { text: 'Two columns per row', value: 2 }];
    return (
      <div className="section-wrapper">
        <div className="normal-wrapper">
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
            <div className="group">
              <h5 className="section-heading">Dahboard url</h5>
              <FormField label="Url" inputWidth={100} type="text" onChange={this.onDashboardUrlChange} value={options.dashboardUrl || ''} />
            </div>
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

        <div className="normal-wrapper">
          <div className="section">
            <div className="section gf-form-group">
              <div className="group">
                <h5 className="section-heading">Export Template</h5>
                <select onChange={this.onExportTypeChange} value={this.state.chartLayout}>
                  {columns.map(item => (
                    <option value={item.value}>{item.text}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {this.state.chartLayout >= 1 && (
            <div className="section">
              <div className="section gf-form-group">
                <div className="group">
                  <h5 className="section-heading">Template Background</h5>
                  <div className="switch-group">
                    <span className="switch-label">Light</span>

                    <label htmlFor="theme" className="toggle-switch">
                      <input type="checkbox" onChange={this.onPDFBackgroundChange} checked={!this.state.isLightTheme} id="theme" />
                      <span className="slider"></span>
                    </label>

                    <span className="switch-label">Dark</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
