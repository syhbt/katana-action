<h1 align="center">
    <img src="https://user-images.githubusercontent.com/8293321/196779266-421c79d4-643a-4f73-9b54-3da379bbac09.png" alt="katana" width="200px">
  <br>
</h1>

This Katana Action makes it easy to orchestrate [Katana](https://github.com/projectdiscovery/katana) with [GitHub Action](https://github.com/features/actions).
Integrate all of your [Katana Templates](https://github.com/projectdiscovery/katana-templates) into powerful continuous security workflows and make it part of your secure software development life cycle.

Example Usage
-----

**Workflow** - `.github/workflows/katana.yml`

```yaml
name: Katana - Crawl and spidering framework

on:
    schedule:
      - cron: '0 0 * * *'
    workflow_dispatch:

jobs:
  katana-crawl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Katana - Crawl and spidering framework
        uses: syhnt/katana-action@main
        with:
          target: https://example.com

      - name: GitHub Workflow artifacts
        uses: actions/upload-artifact@v2
        with:
          name: katana.log
          path: katana.log
```

**GitHub Action running Katana on single URL**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhnt/katana-action@main
        with:
          target: https://example.com
```

**GitHub Action running Katana with custom field scope**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          target: https://example.com
          filed-scope: d,rdn,fqdn or '(company-staging.io|company.com)'
```

<ins>As default field scope perform `rdn` value.</ins>
**GitHub Action running Katana with Maximum duration of crawling**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          target: https://example.com
          duration: 6h
```

**GitHub Action running Katana on multiple URLs**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          urls: urls.txt
```

**GitHub Action running Katana with CLI flags**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          urls: urls.txt
          flags: "-severity critical,high,medium,low -stats"
```

**GitHub Action running Katana on Authenticated Crawling**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          target: https://example.com
          header: "Cookie: usrsess=AmljNrESo"
```

**GitHub Action running Katana with Config files**

```yaml
      - name: Katana - Crawl and spidering framework
        uses: syhbt/katana-action@main
        with:
          target: https://example.com
	  config: katana-config.yaml
```

**GitHub Example Action running Katana with GitHub Issue reporting**

Setting permissions for `GITHUB_TOKEN`, according to the [github actions docs](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token).
```yaml
permissions:
  issues: write
```

```yaml
      - name: Katana - Vulnerability Scan
        uses: projectdiscovery/katana-action@main
        with:
          target: https://example.com
          github-report: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

**GitHub Example Action running Katana with GitHub Security Dashboard reporting**

```yaml
      - name: Katana - Vulnerability Scan
        uses: projectdiscovery/katana-action@main
        with:
          target: https://example.com

      - name: GitHub Security Dashboard Alerts
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: katana.sarif
```

Available Inputs
------

| Key                | Description                                                      | Required |
| ------------------ | ---------------------------------------------------------------- | -------- |
| `target`           | Target URL to run katana scan                                    | true     |
| `urls`             | List of urls to run katana scan                                  | false    |
| `duration`         | Custom templates directory/file to run katana scan               | false    |
| `field-scope`      | Custom workflows file/files to check across hosts                | false    |
| `out-scope`        | File to save output result (default - katana.log)                | false    |
| `no-scope`         | Write results in JSON format                                     | false    |
| `extension-filter` | Include request/response in results [DEPRECATED use `-omit-raw`] | true     |
| `depth`            | Exclude request/response in results                              | false    |
| `delay`            | Set custom katana config file to use                             | false    |
| `headless`         | Set custom user-agent header                                     | false    |
| `config`   	     | Issue reporting configuration file                               | false    |
| `header`  	     | Set `true` to generate Github issue with the report              | false    |
| `github-token`     | Set the Github Token                                             | false    |
| `flags`    	     | File to export result (default - sarif.katana)                   | false    |
| `output`	     | Directory to export markdown results                             | false    |
| `json`             | More Katana CLI flags to use                                     | false    |


## Contributing

This action uses Javascript [github actions toolkit](https://github.com/actions/toolkit). Code using the `src` directory, and before submitting your PR, check and run a `npm run build`, otherwise your changes will not be applied to the final action which resides in the `dist` directory.

We use this way to avoid jobs having to install npm modules and create a final version without dependencies on our code.
