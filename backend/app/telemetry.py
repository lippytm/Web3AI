"""OpenTelemetry integration stub.

Optional telemetry hooks for observability. Enable with TELEMETRY_ENABLED=true.
No vendor lock-in - uses OpenTelemetry standards.

Environment variables:
- TELEMETRY_ENABLED: Enable telemetry (default: false)
- TELEMETRY_ENDPOINT: OTLP endpoint (default: "")
- TELEMETRY_SERVICE_NAME: Service name (default: "web3ai-backend")
"""

import logging

logger = logging.getLogger(__name__)


# Lazy imports for optional dependencies
def _get_tracer():
    """Get OpenTelemetry tracer if available."""
    try:
        from opentelemetry import trace
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter

        return trace, TracerProvider, BatchSpanProcessor, ConsoleSpanExporter, FastAPIInstrumentor
    except ImportError:
        logger.warning(
            "OpenTelemetry not installed. Install with: pip install -r requirements-extras.txt"
        )
        return None, None, None, None, None



class TelemetryStub:
    """Telemetry stub for optional OpenTelemetry integration."""

    def __init__(
        self,
        enabled: bool = False,
        endpoint: str = "",
        service_name: str = "web3ai-backend",
    ):
        """Initialize telemetry stub.

        Args:
            enabled: Whether telemetry is enabled
            endpoint: OTLP endpoint URL
            service_name: Service name for traces
        """
        self.enabled = enabled
        self.endpoint = endpoint
        self.service_name = service_name
        self._tracer = None
        self._initialized = False

        if self.enabled:
            self._setup_telemetry()

    def _setup_telemetry(self):
        """Setup OpenTelemetry if enabled and available."""
        components = _get_tracer()
        if not all(components):
            logger.warning("Telemetry enabled but OpenTelemetry not available")
            self.enabled = False
            return

        trace, tracer_provider, batch_processor, console_exporter, _ = components

        try:
            # Setup tracer provider
            provider = tracer_provider()

            # Use console exporter for now (can be extended to OTLP)
            processor = batch_processor(console_exporter())
            provider.add_span_processor(processor)

            trace.set_tracer_provider(provider)
            self._tracer = trace.get_tracer(self.service_name)
            self._initialized = True

            logger.info(f"Telemetry initialized for service: {self.service_name}")
        except Exception as e:
            logger.error(f"Failed to setup telemetry: {e}")
            self.enabled = False

    def instrument_app(self, app):
        """Instrument FastAPI application.

        Args:
            app: FastAPI application instance
        """
        if not self.enabled or not self._initialized:
            return

        try:
            components = _get_tracer()
            if components and components[4]:
                instrumentor = components[4]
                instrumentor.instrument_app(app)
                logger.info("FastAPI instrumented with OpenTelemetry")
        except Exception as e:
            logger.error(f"Failed to instrument FastAPI: {e}")

    def get_tracer(self):
        """Get tracer instance if available.

        Returns:
            Tracer instance or None
        """
        return self._tracer if self.enabled and self._initialized else None


def create_telemetry(
    enabled: bool = False,
    endpoint: str = "",
    service_name: str = "web3ai-backend",
) -> TelemetryStub:
    """Create telemetry stub instance.

    Args:
        enabled: Whether telemetry is enabled
        endpoint: OTLP endpoint URL
        service_name: Service name

    Returns:
        TelemetryStub instance
    """
    return TelemetryStub(enabled=enabled, endpoint=endpoint, service_name=service_name)
