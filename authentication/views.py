from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if email and password:
            return JsonResponse({
                "status": "success",
                "message": "Login button clicked successfully",
                "email": email
            })

        return JsonResponse({
            "status": "error",
            "message": "Email or password missing"
        }, status=400)

    return JsonResponse({
        "message": "Login API is ready"
    })
