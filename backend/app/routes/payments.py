from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4

router = APIRouter(prefix="/api/payments", tags=["payments"])


class CheckoutRequest(BaseModel):
    product_code: str = Field(..., description="Internal product or service identifier")
    customer_reference: str = Field(..., description="User, account, or lead identifier")
    amount_usd: float = Field(..., gt=0)
    currency: str = Field(default="USD")
    mode: str = Field(default="one_time", description="one_time, subscription, or usage")
    wallet_address: Optional[str] = None
    metadata: dict = Field(default_factory=dict)


class CheckoutResponse(BaseModel):
    checkout_id: str
    status: str
    payment_url: Optional[str] = None
    service_receipt_id: Optional[str] = None


class ServiceReceiptResponse(BaseModel):
    receipt_id: str
    status: str
    product_code: str
    customer_reference: str
    delivery_state: str


@router.post("/checkout", response_model=CheckoutResponse)
def create_checkout(request: CheckoutRequest) -> CheckoutResponse:
    checkout_id = f"chk_{uuid4().hex}"
    receipt_id = f"srv_{uuid4().hex}"

    return CheckoutResponse(
        checkout_id=checkout_id,
        status="created",
        payment_url=f"https://payments.example/checkout/{checkout_id}",
        service_receipt_id=receipt_id,
    )


@router.get("/service-receipts/{receipt_id}", response_model=ServiceReceiptResponse)
def get_service_receipt(receipt_id: str) -> ServiceReceiptResponse:
    if not receipt_id.startswith("srv_"):
        raise HTTPException(status_code=404, detail="Service receipt not found")

    return ServiceReceiptResponse(
        receipt_id=receipt_id,
        status="active",
        product_code="unknown",
        customer_reference="unknown",
        delivery_state="pending",
    )
