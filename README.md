# Terraform Templates

This repository will be used as base to start a new terraform project or even used as action to be invoked by a GitHub Action from any other repo

## Repo Folder Structure

```bash
📂.github
  └──📂actions
      └──📂azure-backend
          └──📜action.yaml
      └──📂terraform-apply
          └──📜action.yaml
      └──📂terraform-plan
          └──📜action.yaml
  └──📂workflows
      ├──📜audit.yml
      ├──📜terraform-apply.yml
      └──📜terraform-deploy.yml
      └──📜terraform-plan.yml
📂terraform-main
  ├──📜main.tf
  ├──📜outputs.tf
  └──📜variables.tf
📂terraform-modules
  └──📂module1
      ├──📜main.tf
      ├──📜outputs.tf
      └──📜variables.tf
```

## [Workflows](workflows)

Set or GitHub Actions Workflows to be used when handling with Terraform deployment

### [Audit](.github/workflows/audit.yml)

### Documentation

- https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=typescript%2Clinux%2Cazure-cli&pivots=nodejs-model-v4
- https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-trigger?tabs=python-v2%2Cin-process%2Cextensionv5&pivots=programming-language-javascript
