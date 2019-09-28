# Copyright Notice

This dataset belongs to M_Service JSC. No sharing or redistribution of this dataset is allowed without official
permissions from M_Service JSC. By using this dataset for the Facebook Developer Challenge, you agree to keep
this data for the purpose of the competition only.

# Data Explanation
There are 2 tables in csv format.

## momo_merchants.csv: Some samples of MoMo merchants' info.
* SERVICE_ID: A unique identifier for the service. Each merchant can have multiple service IDs for its sub-companies and stores.
* STORE_ID: A unique identifier for a store. One merchant can have multiple stores at different locations.
* MERCHANT_NAME: The name of the merchant. Note that one merchant may have multiple names but they are all registered under the same SERVICE_ID
* MERCHANT_ADDRESS: The address of the merchant, usually its headquarter.
* STORE_NAME: The name of the store.
* STORE_ADDRESS: The address of the store.

## momo_transactions.csv: Some samples of MoMo transactions.
* TRANSACTION_ID: A unique ID for the transaction.
* USER_ID: A unique ID for the user.
* SERVICE_ID: The service that the user paid for the transaction.
* STORE_ID: The ID of the store of the transaction.
* TRANSACTION_AMOUNT: The amount of the transaction.
* USER_BANK: The ID of the bank of the user at the time the user committed the transaction.

# Additional data that will be provided
* Merchant location in latitude and longitude.
* More transactions at a longer period of time. Expecting more than 1 million.
* Transaction timestamp.
