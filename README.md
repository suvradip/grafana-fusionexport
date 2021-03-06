# FusionExport plugin for Grafana

> This is a basic plugin to integrate FusionExport with Grafana and which helps you to export Grafana dashboard with FusionExport service.

First, install dependencies:

```BASH
yarn install
```

To build the plugin run:

```BASH
yarn build
```

To work with this plugin run:

```BASH
yarn dev
```

or

```BASH
yarn watch
```

This will run linting tools and apply prettier fix.

## How to use this plugin in your Grafana ?

- Set up Grafana
- Clone this repository into `/var/lib/grafana/plugins` or `data/plugins` (relative to grafana git repo if you’re running development version from source dir)
- Run `yarn build` in repository directory
- Restart your grafana server
- In grafana you need to do few things 
    - Generate API token (only view access) and set it under plugin's visulization tab.
    - set `allow_embedding = true` in configuration file. Please follow this [link](https://grafana.com/docs/grafana/latest/installation/configuration/) to find grafana configuration file.


### Installation of FusionExport

To install FusionExport you can follow our detailed instruction [here](https://www.fusioncharts.com/dev/exporting-charts/using-fusionexport/installation/install-fusionexport-server)

> Note: We are providing custom FusionExport build. Please contact support@fusioncharts.com.