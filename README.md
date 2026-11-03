# Wei Guo's personal website

Jekyll site based on [Minimal Light](https://github.com/yaoyao-liu/minimal-light), with local layouts and styles. Thanks to Prof. Yaoyao Liu for the original theme.

## Local setup (macOS)

Install the project Ruby once. This does not replace Apple's system Ruby or require editing your shell configuration:

```sh
brew install rbenv ruby-build
cd /Users/wei/GitHub/personal-page
rbenv install -s "$(cat .ruby-version)"
rbenv exec gem install bundler -v 2.5.23 --no-document
rbenv exec bundle config set --local path vendor/bundle
rbenv exec bundle install
```

## Preview

```sh
./bin/preview
```

Open <http://127.0.0.1:4000>. Keep the terminal running. Content and stylesheet changes rebuild automatically and refresh the browser. Restart after changing `_config.yml`. Stop with Ctrl+C.

For the final check before publishing, stop the development preview and run:

```sh
./bin/preview --production
```

This runs the same production build as CI, then serves `_site` without modifying its HTML or injecting LiveReload. Changes require restarting this preview. An optional alternate port is supported: `./bin/preview --production 4001`.

Build without starting a server:

```sh
./bin/build
./bin/check
```

Both scripts select the project Ruby via rbenv when available. Run only one preview/build against `_site` at a time.

## Editing the design

The active stylesheet is `assets/css/site.css`: shared color, type, radius and shadow variables are defined at the top, followed by responsive and accessibility rules. The page shell lives in `_layouts/homepage.html`; the navigation and selected publications live in `_includes`. Original theme styles are retained but are not loaded by this layout. No external font or icon service is required for the new interface.

`index.md`, `academics.md`, `miscellaneous.md`, and `_data/publications.yml` remain the content sources. Dark mode follows the operating system when `auto_dark_mode: true`; `false` keeps the site light. Reduced motion, reduced transparency, keyboard navigation and mobile zoom are supported.

## Publishing later

Local preview never commits, pushes, or deploys anything.

The prepared `.github/workflows/pages.yml` builds pull requests and builds/deploys pushes to `main`. It uses `.ruby-version`, Bundler 2.5.23, `Gemfile.lock`, the pinned remote-theme commit in `_config.yml`, and `./bin/build`. To activate it later, select **Settings → Pages → Build and deployment → Source → GitHub Actions** in the repository, then push the reviewed changes. The repository's remote Pages settings have not been changed as part of local setup.

Commit `Gemfile.lock` and `.ruby-version`; do not commit `_site`, `vendor`, `.bundle`, or `tmp`. Keep both macOS and Linux platforms in the lockfile. Update dependencies and the theme deliberately, verifying the production preview before publishing.

Local and hosted pages should be compared in the same browser, viewport, zoom, and color scheme. System fonts vary by operating system. The initial build needs internet access to download the pinned remote theme; page typography and core UI assets are local.
