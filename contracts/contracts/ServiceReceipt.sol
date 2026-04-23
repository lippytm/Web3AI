// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

contract ServiceReceipt {
    struct Receipt {
        uint256 id;
        address customer;
        string productCode;
        string deliveryState;
        string metadataUri;
        uint256 createdAt;
        bool active;
    }

    address public owner;
    uint256 public nextReceiptId = 1;
    mapping(uint256 => Receipt) public receipts;

    event ReceiptCreated(uint256 indexed id, address indexed customer, string productCode);
    event DeliveryStateUpdated(uint256 indexed id, string deliveryState);
    event ReceiptDeactivated(uint256 indexed id);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createReceipt(
        address customer,
        string memory productCode,
        string memory deliveryState,
        string memory metadataUri
    ) external onlyOwner returns (uint256) {
        uint256 receiptId = nextReceiptId;
        receipts[receiptId] = Receipt({
            id: receiptId,
            customer: customer,
            productCode: productCode,
            deliveryState: deliveryState,
            metadataUri: metadataUri,
            createdAt: block.timestamp,
            active: true
        });

        nextReceiptId += 1;
        emit ReceiptCreated(receiptId, customer, productCode);
        return receiptId;
    }

    function updateDeliveryState(uint256 receiptId, string memory deliveryState) external onlyOwner {
        require(receipts[receiptId].active, "Receipt is not active");
        receipts[receiptId].deliveryState = deliveryState;
        emit DeliveryStateUpdated(receiptId, deliveryState);
    }

    function deactivateReceipt(uint256 receiptId) external onlyOwner {
        require(receipts[receiptId].active, "Receipt already inactive");
        receipts[receiptId].active = false;
        emit ReceiptDeactivated(receiptId);
    }
}
