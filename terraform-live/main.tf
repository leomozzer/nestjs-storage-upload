resource "azurerm_resource_group" "example" {
  name     = "resourceGroupName"
  location = "West Europe"
}

resource "azurerm_storage_account" "example" {
  name                = "imagineafancynamehere"
  resource_group_name = azurerm_resource_group.example.name

  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
}

resource "azurerm_storage_container" "example" {
  name                  = "reports"
  storage_account_name  = azurerm_storage_account.example.name
  container_access_type = "private"
}

resource "azurerm_storage_management_policy" "example" {
  storage_account_id = azurerm_storage_account.example.id

  rule {
    name    = "standard-rule"
    enabled = true
    filters {
      blob_types   = ["blockBlob"]
    }
    actions {
      base_blob {
        tier_to_cool_after_days_since_modification_greater_than    = 1
        tier_to_archive_after_days_since_modification_greater_than = 2
        delete_after_days_since_modification_greater_than          = 3
      }
      snapshot {
        delete_after_days_since_creation_greater_than = 5
      }
    }
  }
}