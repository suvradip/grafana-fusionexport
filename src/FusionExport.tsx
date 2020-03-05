import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import axios from 'axios';
import download from 'downloadjs';
import ReactLoading from 'react-loading';
import './main.css';

import { SimpleOptions } from 'types';
import { string, number } from 'prop-types';

interface Props extends PanelProps<SimpleOptions> {}

interface State {
  isBtnLoading: boolean;
}
export class FusionExport extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBtnLoading: false,
    };
  }

  exportDashboardAction = async () => {
    const { options, id } = this.props;
    try {
      this.setState({ isBtnLoading: true });
      const endPoint = `${options.host}:${options.port}/api/v2.0/export`;
      const { origin, pathname } = new URL(options.dashboardUrl);

      const panels = document.querySelectorAll('.react-grid-item');
      const panelIds: object[] = [{ id: string, width: number, height: number }];

      panels.forEach(ele => {
        const elementId = ele.id;
        if (elementId !== `panel-${id}`) {
          const ele = document.getElementById(elementId) as any;
         
          const panel = {
            id: ele.id.replace('panel-', ''),
            width: ele ? ele.offsetWidth : 550,
            height: ele ? ele.offsetHeight : 400,
          };
       
          panelIds.push(panel);
        }
      });

      const { status, data } = await axios.post(
        endPoint,
        {
          templateURL: origin + pathname + '?orgId=1&kiosk',
          asyncCapture: true,
          token: options.token,
          source: 'grafana',
          templateFormat: options.format,
          panelIds,
          chartLayout: options.chartLayout,
          theme: options.theme
        },
        {
          responseType: 'blob',
        }
      );

      if (status === 200) {
        await download(data, options.fileName, 'application/pdf');
      } else {
        console.error(data.error);
      }

      this.setState({ isBtnLoading: false });
    } catch (error) {
      this.setState({ isBtnLoading: false });
      console.error(error.message);
      console.log('Something went wrong here, please contact support@fusioncharts.com with this screent shots.');
    }
  };

  render() {
    const { options } = this.props;

    return (
      <div className="fusionexport-dashboard-dl-btn">
        <button type="button" disabled={this.state.isBtnLoading} className="btn btn-primary btn-sm" onClick={this.exportDashboardAction}>
          {this.state.isBtnLoading ? <ReactLoading type="bars" color="#fff" height={'25%'} width={'30%'} /> : options.text}
        </button>
      </div>
    );
  }
}
