# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Release Build (Android APK)

To assist with generating a signed Release APK without a local development environment, this repository includes a GitHub Actions workflow.

### 1. Generate Keystore & Secrets

Since Java is not installed locally, use the provided GitHub Action:

1. Go to the **Actions** tab in this repository.
2. Select **Generate Keystore** from the left sidebar.
3. Click **Run workflow** (and confirm).
4. Wait for the workflow to finish, then click on the run.
5. Expand the **Convert to Base64 and Output** step.
6. Copy the values displayed (Base64 string, passwords, alias) to your repository secrets:
   - Go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
   - Create secrets for: `ANDROID_KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.

### 2. Build Release APK

Once secrets are set:

1. Go to **Actions** > **Build Android APK**.
2. Run the workflow (or push a commit to `main`).
3. Download the signed `app-release.apk` from the **Artifacts** section of the successful run.
