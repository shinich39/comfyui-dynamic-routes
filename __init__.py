"""
@author: shinich39
@title: comfyui-dynamic-routes
@nickname: comfyui-dynamic-routes
@version: 1.0.0
@description: Shuffle nodes after queue execution.
"""

from .nodes.node import DynamicRoutes

NODE_CLASS_MAPPINGS = {
  "DynamicRoutes": DynamicRoutes,
}

NODE_DISPLAY_NAME_MAPPINGS = {
  "DynamicRoutes": "Dynamic Routes",
}

WEB_DIRECTORY = "./web/js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]