# ComfyUI-inspire-pack
class AnyType(str):
    def __ne__(self, __value: object) -> bool:
        return False

ANY_TYPE = AnyType("*")

class DynamicRoutes:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "": (ANY_TYPE,),
            },
        }
    
    CATEGORY = "utils"
    RETURN_TYPES = (ANY_TYPE,)
    RETURN_NAMES = ("output0",)
