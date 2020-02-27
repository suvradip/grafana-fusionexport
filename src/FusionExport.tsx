import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import axios from 'axios';
import download from 'downloadjs';
import ReactLoading from 'react-loading';
import './main.css';

import { SimpleOptions } from 'types';

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
    const { options } = this.props;
    try {
      this.setState({ isBtnLoading: true });
      const endPoint = `${options.host}:${options.port}/api/v2.0/export`;
      const { origin, pathname } = new URL(options.dashboardUrl);
      const { status, data } = await axios.post(
        endPoint,
        {
          templateURL: origin + pathname + '?orgId=1&kiosk',
          asyncCapture: true,
          token: options.token,
          source: 'grafana',
          templateFormat: options.format,
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

    const style = {
      color: '#000',
      display: 'inline-block',
    };

    const btnStyle = {
      minWidth: 100,
      width: '100%',
      transition: 'all 0.5s',
    };

    return (
      <div style={style} className="fusionexport-dashboard-dl-btn">
        <button
          type="button"
          style={btnStyle}
          disabled={this.state.isBtnLoading}
          className="btn btn-primary btn-sm"
          onClick={this.exportDashboardAction}
        >
          {this.state.isBtnLoading ? <ReactLoading type="bars" color="#fff" height={'25%'} width={'30%'} /> : options.text}
        </button>
      </div>
    );
  }
}
