from backend.app.routes.service_events import publish_service_event, ServiceEventRequest


def test_publish_service_event_returns_accepted_status():
    request = ServiceEventRequest(
        event_type='service.completed',
        product_code='svc_basic',
        customer_reference='cust_1',
        service_receipt_id='srv_1',
    )
    response = publish_service_event(request)
    assert response.status == 'accepted'
    assert response.service_receipt_id == 'srv_1'
