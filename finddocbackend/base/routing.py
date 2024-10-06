from django.urls import path
from . import consumers  # Import your WebSocket consumer

websocket_urlpatterns = [
    path('ws/signaling/', consumers.SignalingConsumer.as_asgi()),
]
