# Workflow and Repository Interconnection Guide

This document explains how Web3AI integrates with other repositories in the Time Machines ecosystem through automated workflows.

## Overview

Web3AI uses GitHub Actions to maintain automated workflows that:
- Run continuous integration on every push and pull request
- Keep dependencies up to date
- Create releases automatically
- Communicate with related repositories
- Synchronize configurations across the ecosystem

## Workflow Files

### ci.yml - Continuous Integration

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via workflow_dispatch

**Jobs:**
1. **code-quality** - Runs Trivy security scanner and uploads results
2. **dependency-review** - Reviews dependencies for security issues (PR only)
3. **build-test** - Builds Agda files and runs tests
4. **documentation** - Validates markdown files
5. **notify-success** - Triggers workflows in related repositories on success

**Repository Notifications:**
When CI succeeds on the `main` branch, it automatically notifies:
- `lippytm/AI-Time-Machines` with event type `web3ai-updated`
- `lippytm/Time-Machines-Builders-` with event type `web3ai-updated`

### dependency-updates.yml - Automated Dependency Updates

**Triggers:**
- Weekly schedule (Mondays at midnight UTC)
- Manual trigger via workflow_dispatch

**Jobs:**
- Detects package manager (npm, cargo, or none)
- Updates dependencies automatically
- Creates a pull request with changes

### release.yml - Release Management

**Triggers:**
- Push of version tags (e.g., `v1.0.0`)
- Manual trigger via workflow_dispatch

**Jobs:**
- Builds the project
- Generates changelog from commits
- Creates GitHub release
- Notifies related repositories

### repository-dispatch.yml - Receive Updates from Other Repos

**Triggers:**
- Repository dispatch events from:
  - `ai-time-machines-updated`
  - `time-machines-builders-updated`
  - `gatsby-blog-updated`
  - `transparency-logic-updated`

**Jobs:**
- Logs the dispatch event
- Handles each event type differently
- Runs integration tests if needed
- Creates issue on failure

### cross-repo-sync.yml - Cross-Repository Synchronization

**Triggers:**
- Manual trigger via workflow_dispatch

**Inputs:**
- `target_repository` - Which repository to sync with
- `sync_type` - Type of sync (workflow-config, documentation, github-config, all)

**Jobs:**
- Compares configurations between repositories
- Identifies differences
- Creates sync summary artifact

## Setting Up Interconnection

### For This Repository (Web3AI)

1. **Add Repository Access Token** (required for cross-repo notifications):
   - Go to Settings → Secrets and variables → Actions
   - Add secret `REPO_ACCESS_TOKEN` with a Personal Access Token that has `repo` scope

2. **Enable Workflows**:
   - Go to Actions tab
   - Enable workflows if they're not already enabled

### For Related Repositories

To receive notifications from Web3AI, add this workflow to other repositories:

```yaml
name: Handle Web3AI Updates

on:
  repository_dispatch:
    types: [web3ai-updated]

jobs:
  handle-update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Handle Web3AI update
        run: |
          echo "Web3AI was updated"
          echo "Ref: ${{ github.event.client_payload.ref }}"
          echo "SHA: ${{ github.event.client_payload.sha }}"
          # Add custom logic here
```

To send notifications to Web3AI, add this to other repository workflows:

```yaml
- name: Notify Web3AI
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.REPO_ACCESS_TOKEN }}
    repository: lippytm/Web3AI
    event-type: your-repo-name-updated
    client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}", "repository": "${{ github.repository }}"}'
```

## Workflow Communication Diagram

```
┌─────────────────────┐
│     Web3AI          │
│  (This Repository)  │
└──────────┬──────────┘
           │
           │ on push to main
           │ (via repository_dispatch)
           ├─────────────────────────────────────┐
           │                                     │
           ▼                                     ▼
┌─────────────────────┐              ┌─────────────────────────┐
│  AI-Time-Machines   │              │ Time-Machines-Builders- │
│                     │              │                         │
│  Receives:          │              │  Receives:              │
│  web3ai-updated     │              │  web3ai-updated         │
└─────────────────────┘              └─────────────────────────┘
           │                                     │
           │ can send back                       │ can send back
           │ ai-time-machines-updated           │ time-machines-builders-updated
           │                                     │
           └─────────────────┬───────────────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │      Web3AI         │
                   │ repository-dispatch │
                   │   workflow handles  │
                   │   incoming events   │
                   └─────────────────────┘
```

## Event Types

### Outgoing Events (Web3AI sends)

| Event Type | Target Repository | Trigger |
|-----------|------------------|---------|
| `web3ai-updated` | AI-Time-Machines | CI success on main |
| `web3ai-updated` | Time-Machines-Builders- | CI success on main |

### Incoming Events (Web3AI receives)

| Event Type | Source Repository | Handler |
|-----------|------------------|---------|
| `ai-time-machines-updated` | AI-Time-Machines | repository-dispatch.yml |
| `time-machines-builders-updated` | Time-Machines-Builders- | repository-dispatch.yml |
| `gatsby-blog-updated` | gatsby-starter-blog | repository-dispatch.yml |
| `transparency-logic-updated` | Transparency-Logic-Time-Machine-Bots- | repository-dispatch.yml |

## Manual Workflow Triggers

All workflows support manual triggering via the GitHub Actions UI:

1. Go to Actions tab
2. Select the workflow
3. Click "Run workflow"
4. Fill in any required inputs
5. Click "Run workflow"

## Best Practices

1. **Use `continue-on-error: true`** for non-critical cross-repo notifications
2. **Always include payload** with ref, sha, and repository information
3. **Test workflows** in a fork first when making changes
4. **Monitor Actions tab** for workflow runs and failures
5. **Keep secrets secure** - never log secret values
6. **Document changes** to workflows in pull requests
7. **Version workflow actions** explicitly (e.g., `@v4` not `@latest`)

## Troubleshooting

### Workflow not triggering

- Check that the workflow file is in `.github/workflows/`
- Verify YAML syntax is correct
- Ensure required secrets are configured
- Check workflow permissions

### Repository dispatch not working

- Verify `REPO_ACCESS_TOKEN` is set and has `repo` scope
- Check event type matches exactly (case-sensitive)
- Ensure target repository has handler workflow
- Review Actions tab for error messages

### CI failing

- Check build logs in Actions tab
- Ensure all dependencies are available
- Verify Agda installation if building Agda files
- Check for syntax errors in workflow files

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Dispatch Action](https://github.com/peter-evans/repository-dispatch)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Agda Documentation](https://agda.readthedocs.io/)

## Contributing

If you improve or add workflows, please:
1. Test thoroughly in a fork
2. Document changes in pull request
3. Update this guide if needed
4. Consider impact on related repositories

For more information, see [CONTRIBUTING.md](CONTRIBUTING.md).
