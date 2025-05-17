# SignerData Web

Data-driven growth for web3 applications. Onchain profiles for logged in users. Dashboards for admins to track and analyze all the data filtering by profile metrics.

## Get Started

Before running this application, rename the `.env.example` to `.env` and set the variables accordingly.

### Installation

Execute the following command in the root folder of the repository to install the project:

```bash
pnpm install
```

### Build

Execute the following command in the root folder of the monorepo to build the project:

```bash
pnpm build
```

Alternatively, execute the following command to undo the build and remove all the generated files:

```bash
pnpm unbuild
```

### Run locally

Execute the following command to run the project locally:

```bash
pnpm dev
```

The front-end will be available at `http://localhost:5173`.

### Deploy in production

Execute the following command to deploy the repository:

```bash
pnpm prod:deploy
```

It will be available at `http://<INSERT_PUBLIC_IP_HERE>:80`.

Execute the following command to stop the deployment:

```bash
pnpm prod:undeploy
```
