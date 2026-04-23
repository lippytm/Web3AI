from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Dict, Optional
from uuid import uuid4

router = APIRouter(prefix="/api/service-events", tags=["service-events"])


class ServiceEventRequest(BaseModel):
    event_type: str = Field(..., description="billing.event, service.activated, service.completed, etc.")
    product_code: str
    customer_reference: str
    service_receipt_id: Optional[str] = None
    metadata: Dict = Field(default_factory=dict)


class ServiceEventResponse(BaseModel):
    event_id: str
    status: str
    service_receipt_id: Optional[str] = None


@router.post("/publish", response_model=ServiceEventResponse)
def publish_service_event(request: ServiceEventRequest) -> ServiceEventResponse:
    event_id = f"evt_{uuid4().hex}"
    return ServiceEventResponse(
        event_id=event_id,
        status="accepted",
        service_receipt_id=request.service_receipt_id,
    )
